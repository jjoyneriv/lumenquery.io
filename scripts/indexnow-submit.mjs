#!/usr/bin/env node

/**
 * IndexNow URL Submission Script for LumenQuery
 *
 * Usage:
 *   node scripts/indexnow-submit.mjs <url>                  # Submit single URL
 *   node scripts/indexnow-submit.mjs <url1> <url2> ...      # Submit multiple URLs
 *   node scripts/indexnow-submit.mjs --sitemap              # Submit all sitemap URLs
 *   node scripts/indexnow-submit.mjs --all                  # Same as --sitemap
 *   node scripts/indexnow-submit.mjs /path1 /path2          # Submit paths (auto-prefixed)
 *
 * Environment:
 *   INDEXNOW_KEY  - API key (optional, defaults to hardcoded key)
 */

const INDEXNOW_KEY = process.env.INDEXNOW_KEY || '7c58d033af2c499c9059d0f7a9f85eec';
const HOST = 'lumenquery.io';
const BASE_URL = `https://${HOST}`;
const KEY_LOCATION = `${BASE_URL}/${INDEXNOW_KEY}.txt`;
const BATCH_SIZE = 10000;

const INDEXNOW_ENDPOINTS = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow',
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function normalizeUrl(input) {
  if (input.startsWith('/')) {
    return `${BASE_URL}${input}`;
  }
  if (input.startsWith('http://') || input.startsWith('https://')) {
    return input;
  }
  // Treat bare paths without leading slash
  return `${BASE_URL}/${input}`;
}

function validateUrl(url) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname !== HOST && parsed.hostname !== `www.${HOST}`) {
      return { valid: false, reason: `URL does not belong to ${HOST}: ${url}` };
    }
    return { valid: true };
  } catch {
    return { valid: false, reason: `Invalid URL: ${url}` };
  }
}

function dedup(urls) {
  return [...new Set(urls)];
}

// ---------------------------------------------------------------------------
// Sitemap parser
// ---------------------------------------------------------------------------

async function fetchSitemapUrls() {
  const sitemapUrl = `${BASE_URL}/sitemap.xml`;
  console.log(`Fetching sitemap from ${sitemapUrl} ...`);

  const res = await fetch(sitemapUrl);
  if (!res.ok) {
    throw new Error(`Failed to fetch sitemap: HTTP ${res.status}`);
  }

  const xml = await res.text();
  const urls = [];
  const locRegex = /<loc>\s*(.*?)\s*<\/loc>/g;
  let match;
  while ((match = locRegex.exec(xml)) !== null) {
    urls.push(match[1]);
  }

  console.log(`Found ${urls.length} URLs in sitemap.`);
  return urls;
}

// ---------------------------------------------------------------------------
// IndexNow submission
// ---------------------------------------------------------------------------

async function submitBatch(endpoint, urls) {
  if (urls.length === 1) {
    // Single URL: use GET-style query parameters
    const params = new URLSearchParams({
      url: urls[0],
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
    });
    const reqUrl = `${endpoint}?${params.toString()}`;
    const res = await fetch(reqUrl);
    return { status: res.status, statusText: res.statusText };
  }

  // Multiple URLs: use POST with JSON body
  const body = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  return { status: res.status, statusText: res.statusText };
}

async function submitToEndpoint(endpoint, urls) {
  const endpointName = new URL(endpoint).hostname;
  const batches = [];
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    batches.push(urls.slice(i, i + BATCH_SIZE));
  }

  let allOk = true;
  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    const batchLabel = batches.length > 1 ? ` (batch ${i + 1}/${batches.length})` : '';
    try {
      const { status, statusText } = await submitBatch(endpoint, batch);
      if (status >= 200 && status < 300) {
        console.log(`  [${endpointName}]${batchLabel} ${status} ${statusText} - ${batch.length} URL(s) accepted`);
      } else {
        console.error(`  [${endpointName}]${batchLabel} ${status} ${statusText} - submission failed`);
        allOk = false;
      }
    } catch (err) {
      console.error(`  [${endpointName}]${batchLabel} Error: ${err.message}`);
      allOk = false;
    }
  }
  return allOk;
}

async function submitUrls(urls) {
  console.log(`\nSubmitting ${urls.length} URL(s) to IndexNow ...\n`);

  if (urls.length <= 5) {
    urls.forEach((u) => console.log(`  ${u}`));
    console.log();
  } else {
    urls.slice(0, 3).forEach((u) => console.log(`  ${u}`));
    console.log(`  ... and ${urls.length - 3} more\n`);
  }

  let allOk = true;
  for (const endpoint of INDEXNOW_ENDPOINTS) {
    const ok = await submitToEndpoint(endpoint, urls);
    if (!ok) allOk = false;
  }

  console.log();
  if (allOk) {
    console.log('All submissions completed successfully.');
  } else {
    console.log('Some submissions failed. See errors above.');
    process.exitCode = 1;
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('IndexNow URL Submission Script for LumenQuery');
    console.log('');
    console.log('Usage:');
    console.log('  node scripts/indexnow-submit.mjs <url>             Submit a single URL');
    console.log('  node scripts/indexnow-submit.mjs <url1> <url2>     Submit multiple URLs');
    console.log('  node scripts/indexnow-submit.mjs --sitemap          Submit all sitemap URLs');
    console.log('  node scripts/indexnow-submit.mjs --all              Same as --sitemap');
    console.log('  node scripts/indexnow-submit.mjs /path /path2       Submit paths (auto-prefixed)');
    console.log('');
    console.log(`Key: ${INDEXNOW_KEY}`);
    console.log(`Host: ${HOST}`);
    process.exit(0);
  }

  let urls;

  if (args.includes('--sitemap') || args.includes('--all')) {
    urls = await fetchSitemapUrls();
  } else {
    urls = args.map(normalizeUrl);
  }

  // Validate
  const invalid = [];
  const valid = [];
  for (const url of urls) {
    const check = validateUrl(url);
    if (check.valid) {
      valid.push(url);
    } else {
      invalid.push(check.reason);
    }
  }

  if (invalid.length > 0) {
    console.error('Invalid URLs skipped:');
    invalid.forEach((msg) => console.error(`  ${msg}`));
    console.log();
  }

  if (valid.length === 0) {
    console.error('No valid URLs to submit.');
    process.exit(1);
  }

  const dedupedUrls = dedup(valid);
  if (dedupedUrls.length < valid.length) {
    console.log(`De-duplicated: ${valid.length} -> ${dedupedUrls.length} URLs`);
  }

  await submitUrls(dedupedUrls);
}

main().catch((err) => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
