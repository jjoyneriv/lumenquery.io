#!/usr/bin/env node

/**
 * Google Search Console Management Script for lumenquery.io
 *
 * Usage:
 *   node scripts/google-search-console.mjs status       # Check index status of all sitemap URLs
 *   node scripts/google-search-console.mjs inspect <url> # Inspect a specific URL
 *   node scripts/google-search-console.mjs submit-sitemap # Submit sitemap to Google
 *   node scripts/google-search-console.mjs index <url>   # Request indexing via Indexing API
 *   node scripts/google-search-console.mjs index-all     # Request indexing for all sitemap URLs
 *   node scripts/google-search-console.mjs analytics     # Show search analytics (last 28 days)
 */

import { google } from 'googleapis';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const KEY_FILE = resolve(__dirname, '../lumenquery-1c93b55e284f.json');
const SITE_URL = 'sc-domain:lumenquery.io'; // Domain property
const SITE_URL_PREFIX = 'https://lumenquery.io/'; // URL prefix property (fallback)
const BASE_URL = 'https://lumenquery.io';

// All public URLs from sitemap
const SITEMAP_URLS = [
  // Core
  '/',
  '/query',
  '/pricing',
  // Docs
  '/docs',
  '/docs/analytics',
  '/docs/intelligence',
  '/docs/contracts',
  '/docs/portfolio',
  // Analytics
  '/analytics',
  '/analytics/network',
  '/analytics/tokens',
  // Contracts
  '/contracts',
  // Guides
  '/guides/stellar-rpc-guide',
  '/guides/stellar-api-tutorial',
  '/guides/horizon-vs-rpc-vs-indexers',
  '/guides/lumenquery-tutorial',
  // Blog
  '/blog',
  '/blog/horizon-api-vs-stellar-rpc-which-to-use',
  '/blog/build-stellar-app-without-running-node',
  '/blog/soroban-smart-contract-monitoring-production',
  '/blog/stellar-transaction-monitoring-exchanges-compliance',
  '/blog/query-stellar-accounts-ledgers-javascript',
  '/blog/why-rwa-tokenization-growing-stellar',
  '/blog/stellar-api-rate-limits-choose-plan',
  '/blog/monitor-stellar-network-health-tps-latency',
  '/blog/bermuda-onchain-economy-stellar',
  '/blog/stellar-rwa-2-billion-q1-2026',
  '/blog/figure-ylds-stellar-tokenized-yield',
  '/blog/xlm-price-016-may-2026-outlook',
  '/blog/franklin-templeton-benji-stellar-5-years',
  '/blog/xlm-price-may-2026-market-cap-ranking',
  '/blog/stellar-payments-defi-rwa-positioning-2026',
  '/blog/xlm-technical-analysis-breakout-levels-may-2026',
  '/blog/moneygram-stellar-partnership-stablecoin-utility',
  '/blog/stellar-regulatory-clarity-bullish-xlm',
  '/blog/xlm-price-prediction-whale-accumulation',
  '/blog/stellar-236-billion-economy-redefining-value',
  '/blog/stellar-record-14-million-transactions',
  '/blog/stellar-protocol-26-yardstick-upgrade',
  '/blog/stellar-institutional-rwa-adoption-2026',
  '/blog/micar-eurau-stablecoin-stellar',
  '/blog/lobstr-xrp-ledger-cross-chain',
  '/blog/xlm-market-performance-outpacing-crypto',
  '/blog/stellar-foundation-real-world-assets',
  '/blog/stellar-foundation-roadmap-2026',
  '/blog/using-stellar-rpc-access-blockchain-data',
  '/blog/stellar-expanding-developer-ecosystem',
  '/blog/soroban-to-stellar-rpc-rebrand',
  '/blog/horizon-api-vs-stellar-rpc',
  '/blog/stellar-5000-tps-roadmap-api-impact',
  '/blog/horizon-rpc-use-cases-financial-apps-2026',
  '/blog/build-stellar-blockchain-explorer-horizon-api',
  '/blog/soroban-json-rpc-explained',
  '/blog/best-stellar-api-providers-2026',
  '/blog/monitor-stellar-validator-horizon-node',
  '/blog/using-claude-code-with-json-rpc-api',
  '/blog/getting-started-with-claude-code',
  '/blog/stellar-lumen-future-decentralized-applications',
  '/blog/building-web3-with-rpc-nodes',
  '/blog/future-of-stellar-blockchain-2026',
  '/blog/xlm-retail-market-potential',
  '/blog/stellar-api-use-cases-for-fintech',
  '/blog/getting-started-with-lumenquery',
];

// --- Auth ---

async function getSearchConsoleAuth() {
  const keyData = JSON.parse(readFileSync(KEY_FILE, 'utf8'));
  const auth = new google.auth.GoogleAuth({
    credentials: keyData,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly', 'https://www.googleapis.com/auth/webmasters'],
  });
  return auth;
}

async function getIndexingAuth() {
  const keyData = JSON.parse(readFileSync(KEY_FILE, 'utf8'));
  const auth = new google.auth.GoogleAuth({
    credentials: keyData,
    scopes: ['https://www.googleapis.com/auth/indexing'],
  });
  return auth;
}

// --- Determine site property ---

async function getSiteUrl(searchconsole) {
  try {
    const res = await searchconsole.sites.list();
    const sites = res.data.siteEntry || [];
    // Prefer domain property
    const domain = sites.find(s => s.siteUrl === SITE_URL);
    if (domain) return SITE_URL;
    // Fall back to URL prefix
    const prefix = sites.find(s => s.siteUrl === SITE_URL_PREFIX);
    if (prefix) return SITE_URL_PREFIX;
    // Show what's available
    console.log('Available properties:', sites.map(s => s.siteUrl));
    throw new Error('lumenquery.io not found in Search Console. Add the service account as Owner.');
  } catch (err) {
    if (err.code === 403) {
      throw new Error('Access denied. Make sure the service account is added as Owner in Search Console.');
    }
    throw err;
  }
}

// --- Commands ---

async function checkStatus() {
  const auth = await getSearchConsoleAuth();
  const searchconsole = google.searchconsole({ version: 'v1', auth });
  const siteUrl = await getSiteUrl(searchconsole);

  console.log(`\nChecking index status for ${siteUrl}...\n`);
  console.log('URL'.padEnd(65) + 'Status'.padEnd(25) + 'Last Crawl');
  console.log('-'.repeat(120));

  let indexed = 0;
  let notIndexed = 0;
  let errors = 0;

  for (const path of SITEMAP_URLS) {
    const url = `${BASE_URL}${path}`;
    try {
      const res = await searchconsole.urlInspection.index.inspect({
        requestBody: {
          inspectionUrl: url,
          siteUrl: siteUrl,
        },
      });

      const result = res.data.inspectionResult;
      const indexStatus = result?.indexStatusResult;
      const verdict = indexStatus?.verdict || 'UNKNOWN';
      const coverageState = indexStatus?.coverageState || 'N/A';
      const lastCrawl = indexStatus?.lastCrawlTime || 'Never';
      const crawlDate = lastCrawl !== 'Never' ? new Date(lastCrawl).toISOString().split('T')[0] : 'Never';

      const statusStr = verdict === 'PASS' ? '✅ Indexed' : `❌ ${coverageState}`;

      if (verdict === 'PASS') indexed++;
      else notIndexed++;

      console.log(`${path.padEnd(65)}${statusStr.padEnd(25)}${crawlDate}`);

      // Rate limit: 600/min but be conservative
      await sleep(200);
    } catch (err) {
      errors++;
      const msg = err.message?.slice(0, 40) || 'Unknown error';
      console.log(`${path.padEnd(65)}⚠️  Error: ${msg}`);
      await sleep(500);
    }
  }

  console.log('\n' + '='.repeat(120));
  console.log(`Total: ${SITEMAP_URLS.length} URLs | ✅ Indexed: ${indexed} | ❌ Not indexed: ${notIndexed} | ⚠️  Errors: ${errors}`);
}

async function inspectUrl(url) {
  if (!url.startsWith('http')) url = `${BASE_URL}${url}`;

  const auth = await getSearchConsoleAuth();
  const searchconsole = google.searchconsole({ version: 'v1', auth });
  const siteUrl = await getSiteUrl(searchconsole);

  console.log(`\nInspecting: ${url}\n`);

  const res = await searchconsole.urlInspection.index.inspect({
    requestBody: {
      inspectionUrl: url,
      siteUrl: siteUrl,
    },
  });

  const result = res.data.inspectionResult;
  const index = result?.indexStatusResult;
  const mobile = result?.mobileUsabilityResult;
  const richResults = result?.richResultsResult;

  console.log('Index Status:');
  console.log(`  Verdict:        ${index?.verdict || 'N/A'}`);
  console.log(`  Coverage:       ${index?.coverageState || 'N/A'}`);
  console.log(`  Robots:         ${index?.robotsTxtState || 'N/A'}`);
  console.log(`  Indexing:       ${index?.indexingState || 'N/A'}`);
  console.log(`  Page fetch:     ${index?.pageFetchState || 'N/A'}`);
  console.log(`  Last crawl:     ${index?.lastCrawlTime || 'Never'}`);
  console.log(`  Crawled as:     ${index?.crawledAs || 'N/A'}`);
  console.log(`  Canonical:      ${index?.googleCanonical || 'N/A'}`);
  console.log(`  User canonical: ${index?.userCanonical || 'N/A'}`);

  if (index?.referringUrls?.length) {
    console.log(`  Referring URLs:`);
    index.referringUrls.forEach(u => console.log(`    - ${u}`));
  }

  if (mobile) {
    console.log(`\nMobile Usability:`);
    console.log(`  Verdict:        ${mobile.verdict || 'N/A'}`);
    if (mobile.issues?.length) {
      mobile.issues.forEach(i => console.log(`  Issue:          ${i.issueType} (${i.severity})`));
    }
  }

  if (richResults) {
    console.log(`\nRich Results:`);
    console.log(`  Verdict:        ${richResults.verdict || 'N/A'}`);
    if (richResults.detectedItems?.length) {
      richResults.detectedItems.forEach(item => {
        console.log(`  Type:           ${item.richResultType}`);
        item.items?.forEach(i => console.log(`    Name:         ${i.name}`));
      });
    }
  }
}

async function submitSitemap() {
  const auth = await getSearchConsoleAuth();
  const webmasters = google.webmasters({ version: 'v3', auth });

  // Try both property formats
  for (const siteUrl of [SITE_URL, SITE_URL_PREFIX]) {
    try {
      const sitemapUrl = `${BASE_URL}/sitemap.xml`;
      console.log(`Submitting sitemap to ${siteUrl}...`);
      await webmasters.sitemaps.submit({
        siteUrl: siteUrl,
        feedpath: sitemapUrl,
      });
      console.log(`✅ Sitemap submitted: ${sitemapUrl}`);

      // Check sitemap status
      const res = await webmasters.sitemaps.get({
        siteUrl: siteUrl,
        feedpath: sitemapUrl,
      });
      console.log(`\nSitemap status:`);
      console.log(`  Last submitted: ${res.data.lastSubmitted || 'N/A'}`);
      console.log(`  Last downloaded: ${res.data.lastDownloaded || 'N/A'}`);
      console.log(`  URLs discovered: ${res.data.contents?.[0]?.submitted || 'N/A'}`);
      console.log(`  URLs indexed:    ${res.data.contents?.[0]?.indexed || 'N/A'}`);
      return;
    } catch (err) {
      if (err.code === 403 || err.code === 404) continue;
      throw err;
    }
  }
  console.error('Error: Could not submit sitemap. Verify property ownership.');
}

async function requestIndexing(url) {
  if (!url.startsWith('http')) url = `${BASE_URL}${url}`;

  const auth = await getIndexingAuth();
  const indexing = google.indexing({ version: 'v3', auth });

  try {
    const res = await indexing.urlNotifications.publish({
      requestBody: {
        url: url,
        type: 'URL_UPDATED',
      },
    });
    console.log(`✅ Indexing requested: ${url}`);
    console.log(`   Notify time: ${res.data.urlNotificationMetadata?.latestUpdate?.notifyTime || 'N/A'}`);
  } catch (err) {
    if (err.code === 403) {
      console.error(`❌ ${url}: Access denied. Service account needs Owner permission.`);
    } else if (err.code === 429) {
      console.error(`❌ ${url}: Rate limit exceeded. Try again later.`);
    } else {
      console.error(`❌ ${url}: ${err.message}`);
    }
  }
}

async function indexAll() {
  console.log(`\nRequesting indexing for ${SITEMAP_URLS.length} URLs...\n`);
  console.log('Note: Indexing API has a 200/day quota. This will use all of them.\n');

  let success = 0;
  let failed = 0;

  for (const path of SITEMAP_URLS) {
    const url = `${BASE_URL}${path}`;
    try {
      const auth = await getIndexingAuth();
      const indexing = google.indexing({ version: 'v3', auth });

      await indexing.urlNotifications.publish({
        requestBody: {
          url: url,
          type: 'URL_UPDATED',
        },
      });
      success++;
      console.log(`✅ ${path}`);
      await sleep(300); // Rate limit
    } catch (err) {
      failed++;
      const msg = err.code === 429 ? 'Rate limit' : (err.message?.slice(0, 50) || 'Error');
      console.log(`❌ ${path}: ${msg}`);
      if (err.code === 429) {
        console.log('\nRate limit hit. Stopping. Try again tomorrow.');
        break;
      }
      await sleep(300);
    }
  }

  console.log(`\nDone: ✅ ${success} submitted | ❌ ${failed} failed`);
}

async function showAnalytics() {
  const auth = await getSearchConsoleAuth();
  const webmasters = google.webmasters({ version: 'v3', auth });

  // Try both property formats
  for (const siteUrl of [SITE_URL, SITE_URL_PREFIX]) {
    try {
      const endDate = new Date().toISOString().split('T')[0];
      const startDate = new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      console.log(`\nSearch Analytics for ${siteUrl} (${startDate} to ${endDate})\n`);

      // Overall stats
      const overallRes = await webmasters.searchanalytics.query({
        siteUrl,
        requestBody: {
          startDate,
          endDate,
          dimensions: [],
        },
      });

      const overall = overallRes.data.rows?.[0];
      if (overall) {
        console.log('Overall:');
        console.log(`  Clicks:      ${overall.clicks}`);
        console.log(`  Impressions: ${overall.impressions}`);
        console.log(`  CTR:         ${(overall.ctr * 100).toFixed(2)}%`);
        console.log(`  Avg Position: ${overall.position?.toFixed(1)}`);
      } else {
        console.log('No search data available yet.\n');
      }

      // Top queries
      const queryRes = await webmasters.searchanalytics.query({
        siteUrl,
        requestBody: {
          startDate,
          endDate,
          dimensions: ['query'],
          rowLimit: 20,
        },
      });

      const queries = queryRes.data.rows || [];
      if (queries.length) {
        console.log('\nTop Queries:');
        console.log('  Query'.padEnd(50) + 'Clicks'.padEnd(10) + 'Impressions'.padEnd(14) + 'CTR'.padEnd(10) + 'Position');
        console.log('  ' + '-'.repeat(100));
        queries.forEach(row => {
          console.log(
            `  ${row.keys[0].padEnd(48)}${String(row.clicks).padEnd(10)}${String(row.impressions).padEnd(14)}${(row.ctr * 100).toFixed(1).padStart(5)}%    ${row.position?.toFixed(1)}`
          );
        });
      }

      // Top pages
      const pageRes = await webmasters.searchanalytics.query({
        siteUrl,
        requestBody: {
          startDate,
          endDate,
          dimensions: ['page'],
          rowLimit: 20,
        },
      });

      const pages = pageRes.data.rows || [];
      if (pages.length) {
        console.log('\nTop Pages:');
        console.log('  Page'.padEnd(65) + 'Clicks'.padEnd(10) + 'Impressions'.padEnd(14) + 'CTR'.padEnd(10) + 'Position');
        console.log('  ' + '-'.repeat(110));
        pages.forEach(row => {
          const page = row.keys[0].replace(BASE_URL, '') || '/';
          console.log(
            `  ${page.padEnd(63)}${String(row.clicks).padEnd(10)}${String(row.impressions).padEnd(14)}${(row.ctr * 100).toFixed(1).padStart(5)}%    ${row.position?.toFixed(1)}`
          );
        });
      }

      return;
    } catch (err) {
      if (err.code === 403 || err.code === 404) continue;
      throw err;
    }
  }
  console.error('Error: Could not access analytics. Verify property ownership.');
}

// --- Helpers ---

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// --- Main ---

const command = process.argv[2];
const arg = process.argv[3];

try {
  switch (command) {
    case 'status':
      await checkStatus();
      break;
    case 'inspect':
      if (!arg) { console.error('Usage: node google-search-console.mjs inspect <url>'); process.exit(1); }
      await inspectUrl(arg);
      break;
    case 'submit-sitemap':
      await submitSitemap();
      break;
    case 'index':
      if (!arg) { console.error('Usage: node google-search-console.mjs index <url>'); process.exit(1); }
      await requestIndexing(arg);
      break;
    case 'index-all':
      await indexAll();
      break;
    case 'analytics':
      await showAnalytics();
      break;
    default:
      console.log(`
Google Search Console Manager for lumenquery.io

Commands:
  status          Check index status of all sitemap URLs
  inspect <url>   Inspect a specific URL (path or full URL)
  submit-sitemap  Submit sitemap.xml to Google
  index <url>     Request indexing for a URL via Indexing API
  index-all       Request indexing for all sitemap URLs
  analytics       Show search analytics (last 28 days)

Examples:
  node scripts/google-search-console.mjs status
  node scripts/google-search-console.mjs inspect /blog/bermuda-onchain-economy-stellar
  node scripts/google-search-console.mjs submit-sitemap
  node scripts/google-search-console.mjs index /
  node scripts/google-search-console.mjs index-all
  node scripts/google-search-console.mjs analytics
      `);
  }
} catch (err) {
  console.error(`\nError: ${err.message}`);
  if (err.code === 403) {
    console.error('\nMake sure the service account email is added as Owner in Google Search Console:');
    console.error('  Email: lumenquery-search-console@lumenquery.iam.gserviceaccount.com');
    console.error('  URL:   https://search.google.com/search-console/users');
  }
  process.exit(1);
}
