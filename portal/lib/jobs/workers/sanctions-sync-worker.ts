import { prisma } from '@/lib/prisma';
import type { Job, JobWorker } from '../types';

// OFAC SDN download URL (Treasury.gov)
const OFAC_SDN_URL = 'https://www.treasury.gov/ofac/downloads/sdn.xml';

export const sanctionsSyncWorker: JobWorker<'SANCTIONS_SYNC'> = {
  type: 'SANCTIONS_SYNC',

  async process(job: Job<'SANCTIONS_SYNC'>): Promise<{
    added: number;
    updated: number;
    removed: number;
    sources: string[];
  }> {
    const { sources = ['OFAC', 'COMMUNITY'], fullSync = false } = job.payload;

    let added = 0;
    let updated = 0;
    let removed = 0;
    const processedSources: string[] = [];

    for (const source of sources) {
      try {
        switch (source) {
          case 'OFAC':
          case 'SDN': {
            const result = await syncOFAC();
            added += result.added;
            updated += result.updated;
            processedSources.push('OFAC');
            break;
          }
          case 'COMMUNITY': {
            const result = await syncCommunityList();
            added += result.added;
            updated += result.updated;
            processedSources.push('COMMUNITY');
            break;
          }
          default:
            console.warn(`Unknown sanctions source: ${source}`);
        }
      } catch (error) {
        console.error(`Error syncing ${source}:`, error);
      }
    }

    // Clean up old entries if full sync
    if (fullSync) {
      const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // 30 days
      const deleted = await prisma.sanctionedAccount.deleteMany({
        where: {
          lastVerified: { lt: cutoff },
        },
      });
      removed = deleted.count;
    }

    return { added, updated, removed, sources: processedSources };
  },

  async onComplete(job, result) {
    const r = result as { added: number; updated: number; removed: number; sources: string[] };
    console.log(
      `Sanctions sync completed: ${r.added} added, ${r.updated} updated, ${r.removed} removed`
    );
  },
};

async function syncOFAC(): Promise<{ added: number; updated: number }> {
  // In production, this would fetch and parse the OFAC SDN XML
  // For now, we'll implement a placeholder that shows the structure

  // Note: Actual implementation would:
  // 1. Fetch XML from OFAC_SDN_URL
  // 2. Parse XML to extract entities
  // 3. Match entities to Stellar addresses (if available)
  // 4. Upsert to database

  console.log('OFAC sync would fetch from:', OFAC_SDN_URL);

  // Placeholder: In production, parse actual OFAC data
  const knownSanctionedAddresses: string[] = [
    // These are example addresses - NOT real sanctioned addresses
    // In production, this would come from OFAC data parsing
  ];

  let added = 0;
  let updated = 0;

  for (const address of knownSanctionedAddresses) {
    const existing = await prisma.sanctionedAccount.findUnique({
      where: { accountId: address },
    });

    if (existing) {
      await prisma.sanctionedAccount.update({
        where: { accountId: address },
        data: { lastVerified: new Date() },
      });
      updated++;
    } else {
      await prisma.sanctionedAccount.create({
        data: {
          accountId: address,
          source: 'OFAC',
          listType: 'SDN',
          addedAt: new Date(),
          lastVerified: new Date(),
        },
      });
      added++;
    }
  }

  return { added, updated };
}

async function syncCommunityList(): Promise<{ added: number; updated: number }> {
  // Community-maintained list of known bad actors on Stellar
  // In production, this would fetch from a curated source

  // Known scam/phishing addresses (examples)
  const communityFlaggedAddresses: Array<{
    accountId: string;
    name?: string;
    reason: string;
  }> = [
    // These would be populated from community reports
    // Not including real addresses here for safety
  ];

  let added = 0;
  let updated = 0;

  for (const entry of communityFlaggedAddresses) {
    const existing = await prisma.sanctionedAccount.findUnique({
      where: { accountId: entry.accountId },
    });

    if (existing) {
      await prisma.sanctionedAccount.update({
        where: { accountId: entry.accountId },
        data: {
          lastVerified: new Date(),
          metadata: { reason: entry.reason },
        },
      });
      updated++;
    } else {
      await prisma.sanctionedAccount.create({
        data: {
          accountId: entry.accountId,
          source: 'COMMUNITY',
          listType: 'FLAGGED',
          name: entry.name,
          addedAt: new Date(),
          lastVerified: new Date(),
          metadata: { reason: entry.reason },
        },
      });
      added++;
    }
  }

  return { added, updated };
}

export default sanctionsSyncWorker;
