# LumenQuery Scripts

Utility scripts for SEO, indexing, and site management.

## IndexNow URL Submission

[IndexNow](https://www.indexnow.org/) is a protocol that lets website owners instantly notify search engines (Bing, Yandex, Seznam, Naver) when content is created, updated, or deleted. This avoids waiting for crawlers to discover changes organically.

### Setup

#### 1. Key file

The IndexNow key file is already deployed at:

```
https://lumenquery.io/7c58d033af2c499c9059d0f7a9f85eec.txt
```

The file lives at `portal/public/7c58d033af2c499c9059d0f7a9f85eec.txt` and contains the key itself.

To verify it is accessible:

```bash
curl -s https://lumenquery.io/7c58d033af2c499c9059d0f7a9f85eec.txt
# Should output: 7c58d033af2c499c9059d0f7a9f85eec
```

#### 2. Environment variable (optional)

The key is hardcoded in the script as a fallback. To override it, set:

```bash
export INDEXNOW_KEY="your-new-key-here"
```

### Generating a new key

If you need to rotate the key:

1. Generate a new hex key (32 characters recommended):
   ```bash
   openssl rand -hex 16
   ```
2. Create a key file in `portal/public/{new-key}.txt` containing the key as plain text.
3. Update the `INDEXNOW_KEY` fallback in `scripts/indexnow-submit.mjs`.
4. Rebuild and deploy the portal so the new key file is served.
5. Verify: `curl https://lumenquery.io/{new-key}.txt`

### Usage

#### Submit a single URL

```bash
node scripts/indexnow-submit.mjs https://lumenquery.io/stellar-horizon-api
```

#### Submit multiple URLs

```bash
node scripts/indexnow-submit.mjs https://lumenquery.io/blog/post-1 https://lumenquery.io/blog/post-2
```

#### Submit paths (auto-prefixed with https://lumenquery.io)

```bash
node scripts/indexnow-submit.mjs /stellar-horizon-api /soroban-rpc-api /pricing
```

#### Submit all sitemap URLs

```bash
node scripts/indexnow-submit.mjs --sitemap
# or
node scripts/indexnow-submit.mjs --all
```

#### Using npm scripts (from the portal/ directory)

```bash
cd portal
npm run indexnow:submit -- https://lumenquery.io/new-page
npm run indexnow:sitemap
```

### How it works

The script submits URLs to two IndexNow endpoints:

- `https://api.indexnow.org/indexnow` (shared endpoint, distributes to all participating engines)
- `https://www.bing.com/indexnow` (Bing directly)

For a single URL it uses a GET request with query parameters. For multiple URLs it uses a POST request with a JSON body. URLs are batched at 10,000 per request (the IndexNow protocol maximum).

### Response codes

| Code | Meaning |
|------|---------|
| 200  | URL(s) submitted successfully |
| 202  | Accepted, key will be verified later |
| 400  | Invalid request (bad URL format) |
| 403  | Key not valid or key file not found |
| 422  | URL does not belong to the host |
| 429  | Too many requests, try again later |

### Confirming submissions in Bing Webmaster Tools

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters/).
2. Add and verify `lumenquery.io` if not already done.
3. Navigate to **URL Submission** > **IndexNow** to see submission history and status.

### Testing structured data

After submitting URLs, verify structured data (JSON-LD) is correct:

- [Google Rich Results Test](https://search.google.com/test/rich-results) - paste any page URL
- [Schema.org Validator](https://validator.schema.org/) - validate JSON-LD markup

## Google Search Console Script

See `google-search-console.mjs` for Google-specific indexing management (index status, analytics, sitemap submission).

```bash
node scripts/google-search-console.mjs status         # Check index status
node scripts/google-search-console.mjs analytics       # Search analytics (28d)
node scripts/google-search-console.mjs submit-sitemap  # Submit sitemap
node scripts/google-search-console.mjs index-all       # Request indexing for all URLs
```
