# Project Context

## Current Status
- Working on: Production deployment
- Last session: 2026-02-08
- Last validated: 2026-02-08
- SEO optimization: Completed

## Service Status (api1.lumenquery.io)

### Application Services
| Service | Status | Ports |
|---------|--------|-------|
| soroban-rpc | ✅ Running | Internal |
| stellar-horizon | ✅ Healthy | 127.0.0.1:8000, 127.0.0.1:6060 |
| lumenquery-portal | ✅ Running | 0.0.0.0:3000 |
| lumenquery-postgres | ✅ Healthy | 0.0.0.0:5432 |
| lumenquery-redis | ✅ Healthy | 0.0.0.0:6379 |
| lumenquery-api-gateway | ✅ Running | Internal |
| lumenquery-rpc-gateway | ✅ Running | Internal |
| lumenquery-traefik | ✅ Running | 0.0.0.0:80, 443, 8081 |

### Monitoring Exporters (api1)
| Exporter | Status | Port |
|----------|--------|------|
| node-exporter | ✅ Running | 9100 |
| cAdvisor | ✅ Healthy | 9080 |
| redis-exporter | ✅ Running | 9121 |
| postgres-exporter | ✅ Running | 9187 |

## Database Status

| Database | Type | Location | Status |
|----------|------|----------|--------|
| Captive Core | SQLite | `/opt/stellar/captive-core/captive-core/stellar.db` | ✅ 375 MB |
| LumenQuery | PostgreSQL | lumenquery-postgres:5432 | ✅ Healthy |
| LumenQuery Cache | Redis | lumenquery-redis:6379 | ✅ Healthy |
| Horizon (remote) | PostgreSQL | 184.105.230.246:5432 | ✅ Connected |

## Firewall Configuration (api1)

**Status**: UFW Active

| Port | Access | Service |
|------|--------|---------|
| 22 | Anywhere | SSH |
| 80 | Anywhere | HTTP |
| 443 | Anywhere | HTTPS |
| 3000 | Anywhere | Portal |
| 8080 | Docker + mon1 | API Gateway |
| 8081 | mon1 only | Traefik metrics |
| 8082 | Docker + mon1 | RPC Gateway |
| 9080 | mon1 only | cAdvisor |
| 9100 | mon1 only | node-exporter |
| 9121 | mon1 only | redis-exporter |
| 9187 | mon1 only | postgres-exporter |

**mon1 IP**: 184.105.230.245
**Docker networks**: 172.16.0.0/12

## Project Structure

```
/opt/
├── CLAUDE.md                    # This file
├── lumenquery-portal/           # Main web application
│   ├── docker-compose.yml       # Multi-service orchestration
│   ├── .env                     # Environment variables (secrets)
│   ├── .env.example             # Environment template
│   ├── .github/workflows/       # CI/CD pipelines
│   ├── portal/                  # Next.js frontend
│   ├── api-gateway/             # API service
│   ├── rpc-gateway/             # RPC proxy service
│   ├── traefik/                 # Reverse proxy config
│   └── monitoring/              # Prometheus + Grafana stack
├── soroban-rpc/                 # Soroban RPC service
│   ├── docker-compose.yml
│   └── config/
├── stellar/                     # Stellar infrastructure
│   ├── captive-core/
│   └── horizon/
└── .claude/                     # Claude configuration
```

## Technology Stack

### Frontend (Portal)
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Auth**: NextAuth.js
- **ORM**: Prisma

### Backend Services
- **RPC Gateway**: Fastify + Node.js
- **Database**: PostgreSQL (via Prisma)
- **Cache**: Redis
- **Logging**: Pino

### Infrastructure
- **Reverse Proxy**: Traefik
- **Containers**: Docker & Docker Compose
- **Blockchain**: Stellar Captive Core, Soroban RPC
- **Monitoring**: Prometheus + Grafana

## Source Code Locations

| Component | Path | Description |
|-----------|------|-------------|
| Portal App | `/opt/lumenquery-portal/portal/app/` | Next.js pages and API routes |
| Portal Components | `/opt/lumenquery-portal/portal/components/` | React components (Header, Footer) |
| Analytics Components | `/opt/lumenquery-portal/portal/components/analytics/` | MetricCard, AreaChart, TimeRangeSelector |
| Analytics Pages | `/opt/lumenquery-portal/portal/app/analytics/` | Public analytics dashboard |
| Analytics API | `/opt/lumenquery-portal/portal/app/api/analytics/` | Network metrics API endpoint |
| Portal Lib | `/opt/lumenquery-portal/portal/lib/` | Auth, Prisma, rate-limit utilities |
| Portal Middleware | `/opt/lumenquery-portal/portal/middleware.ts` | Rate limiting middleware |
| RPC Gateway | `/opt/lumenquery-portal/rpc-gateway/src/` | Fastify RPC proxy |
| API Gateway | `/opt/lumenquery-portal/api-gateway/src/` | API service |
| Traefik Config | `/opt/lumenquery-portal/traefik/` | Routing configuration |
| Monitoring | `/opt/lumenquery-portal/monitoring/` | Prometheus + Grafana |

## Blog Posts

| Slug | Title | Date |
|------|-------|------|
| using-claude-code-with-json-rpc-api | Using Claude Code to Interface with JSON-RPC APIs | 2026-02-07 |
| getting-started-with-claude-code | Getting Started with Claude Code | 2026-02-07 |
| stellar-lumen-future-decentralized-applications | Stellar Lumen and the Future of Decentralized Applications | 2026-02-03 |
| building-web3-with-rpc-nodes | Building in Web3: The Essential Role of RPC Nodes | 2026-02-02 |
| future-of-stellar-blockchain-2026 | The Future of Stellar: What's Next for the Lumen Blockchain | 2026-01-29 |
| xlm-retail-market-potential | XLM and the Retail Revolution | 2026-01-28 |
| stellar-api-use-cases-for-fintech | 5 Powerful Use Cases for the Stellar Horizon API | 2026-01-27 |
| getting-started-with-lumenquery | Getting Started with LumenQuery | 2026-01-25 |

**Blog files:**
- Listing: `/opt/lumenquery-portal/portal/app/blog/page.tsx`
- Content: `/opt/lumenquery-portal/portal/app/blog/[slug]/page.tsx`

## Repository Status

- **Git initialized**: `/opt/lumenquery-portal/`
- **Remote**: git@github.com:jjoyneriv/lumenquery.io.git
- **Branch**: main
- **GitHub URL**: https://github.com/jjoyneriv/lumenquery.io

### Recent Commits
1. Initial commit: LumenQuery Portal
2. Add CI/CD pipelines and health endpoint
3. Add security hardening
4. Add monitoring stack (Prometheus + Grafana)
5. Configure monitoring for separate server (mon1.lumenquery.io)
6. Fix exporters configuration
7. Add mobile-friendly responsive design to portal
8. Add blog articles about Claude Code
9. Add CLAUDE.md project documentation
10. Add Traefik route for rpc.lumenquery.io
11. Update CLAUDE.md with session progress
12. Fix BigInt serialization error in usage API
13. Update CLAUDE.md with BigInt fix documentation
14. Add Advanced Stellar Analytics Dashboard

## CI/CD Pipelines

### CI Workflow (`.github/workflows/ci.yml`)
Triggered on: push/PR to main
- Lint & type check (portal, rpc-gateway)
- Build Next.js portal
- Build Docker images
- Run tests

### Deploy Workflow (`.github/workflows/deploy.yml`)
Triggered on: push to main, manual dispatch
- Build & push images to GitHub Container Registry
- SSH deploy to server
- Health check verification

### Required GitHub Secrets
```
DEPLOY_HOST      - Server IP/hostname (api1.lumenquery.io)
DEPLOY_USER      - SSH username
DEPLOY_SSH_KEY   - Private SSH key for deployment
```

## Security Hardening

### Headers (Next.js + Traefik)
- HSTS (1 year, includeSubDomains, preload)
- X-Frame-Options: SAMEORIGIN
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Content-Security-Policy (strict)
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy (camera, mic, geo disabled)

### Rate Limiting
| Endpoint | Limit |
|----------|-------|
| Portal (general) | 100/min (Traefik) |
| API Gateway | 200/min (Traefik) |
| RPC Gateway | 200/min (Traefik) |
| /api/auth/signup | 5/hour |
| /api/auth/signin | 10/min |
| /api/* | 60/min |

### Authentication
- JWT sessions: 7 days (reduced from 30)
- Secure cookies in production
- Password: 8+ chars, upper, lower, number required
- Email validation (RFC 5322)

### CORS
- RPC Gateway: lumenquery.io domains only
- Dev: localhost:3000, localhost:8080

## Monitoring Stack

### Architecture
```
mon1.lumenquery.io              api1.lumenquery.io
┌─────────────────┐             ┌─────────────────┐
│ Prometheus      │────────────▶│ node-exporter   │:9100
│ Grafana         │             │ cAdvisor        │:9080
│ Traefik (SSL)   │             │ postgres-export │:9187
└─────────────────┘             │ redis-exporter  │:9121
                                │ rpc-gateway     │:8082/metrics
                                │ portal          │/api/metrics
                                └─────────────────┘
```

### Exporters Status (api1) - DEPLOYED ✅
```bash
cd /opt/lumenquery-portal/monitoring
docker compose -f exporters-docker-compose.yml --env-file ../.env up -d
```

### Monitoring Stack (mon1) - PENDING
```bash
# Copy to mon1
scp -r /opt/lumenquery-portal/monitoring user@mon1.lumenquery.io:/opt/

# On mon1
cd /opt/monitoring
cat > .env << 'EOF'
GRAFANA_ADMIN_USER=admin
GRAFANA_ADMIN_PASSWORD=your-secure-password
ACME_EMAIL=admin@lumenquery.io
EOF
docker compose up -d
```

### Alerts Configured
- Service down (1 min)
- High error rate (>5%)
- High latency (p95 >2s)
- High memory (>90%)
- High CPU (>80%)
- Low disk (<10%)
- Redis/PostgreSQL down

### Access
- Grafana: https://monitoring.lumenquery.io
- Prometheus: http://localhost:9090 (mon1 internal)

## DNS Records

| Subdomain | Server | IP |
|-----------|--------|-----|
| lumenquery.io | api1 | (configured) |
| api.lumenquery.io | api1 | (configured) |
| rpc.lumenquery.io | api1 | (configured) |
| monitoring.lumenquery.io | mon1 | 184.105.230.245 |

## Key Configuration Files

| File | Purpose |
|------|---------|
| `/opt/lumenquery-portal/docker-compose.yml` | Main services |
| `/opt/lumenquery-portal/.env` | Environment secrets |
| `/opt/lumenquery-portal/traefik/dynamic.yml` | Routing + security |
| `/opt/lumenquery-portal/monitoring/docker-compose.yml` | Monitoring stack (mon1) |
| `/opt/lumenquery-portal/monitoring/exporters-docker-compose.yml` | Exporters (api1) |
| `/opt/soroban-rpc/docker-compose.yml` | Soroban RPC |
| `/opt/stellar/horizon/docker-compose.yml` | Stellar Horizon |

## Production Checklist

### Completed ✅
- [x] Version control (GitHub)
- [x] CI/CD pipelines (GitHub Actions)
- [x] Security headers (HSTS, CSP, etc.)
- [x] Rate limiting (Traefik + middleware)
- [x] Input validation (signup)
- [x] Authentication hardening
- [x] CORS restrictions
- [x] Monitoring exporters deployed (api1)
- [x] Firewall configured (UFW)
- [x] Blog posts (8 articles)
- [x] Health check endpoints
- [x] Mobile-friendly responsive design
- [x] RPC Gateway routing (rpc.lumenquery.io)
- [x] Advanced Stellar Analytics Dashboard (public, no auth)
- [x] SEO optimization (meta tags, semantic HTML, JSON-LD)

### Pending
- [ ] Configure GitHub Secrets for CI/CD deployment
- [ ] Deploy monitoring stack on mon1
- [ ] Set up alerting notifications (email/Slack)
- [ ] Database backups
- [ ] SSL certificate monitoring
- [ ] Load testing
- [ ] Documentation (deployment runbook)

## Session History

### 2026-02-03
1. Validated all services (8 containers running)
2. Added service/database status to CLAUDE.md
3. Created 2 new blog posts:
   - "Building in Web3: The Essential Role of RPC Nodes"
   - "Stellar Lumen and the Future of Decentralized Applications"
4. Rebuilt and deployed portal with new blog posts
5. Initialized git repository
6. Set up CI/CD pipelines (GitHub Actions)
7. Added security hardening:
   - Security headers (CSP, HSTS, etc.)
   - Rate limiting (3 layers)
   - Authentication improvements
   - Input validation
   - CORS restrictions
8. Set up monitoring stack:
   - Prometheus configuration
   - Grafana with dashboards
   - Alert rules
   - Metrics endpoints
9. Configured for separate monitoring server (mon1.lumenquery.io)
10. Deployed exporters on api1
11. Configured UFW firewall

### 2026-02-07
1. Made website mobile-friendly with responsive design:
   - Created reusable Header component with hamburger mobile menu
   - Created reusable Footer component (full/simple variants)
   - Added responsive breakpoints (sm/md/lg) to all pages
   - Updated home, docs, blog, dashboard, and auth pages
   - Mobile sidebar drawer for documentation
   - Touch-friendly buttons and form inputs
2. Rebuilt and deployed portal with mobile changes
3. Committed and pushed mobile-friendly changes to GitHub
4. Created 2 new blog articles:
   - "Using Claude Code to Interface with JSON-RPC APIs"
   - "Getting Started with Claude Code"
5. Rebuilt and deployed portal with new blog posts
6. Committed and pushed blog articles to GitHub
7. Validated dashboard functionality:
   - All services running and healthy
   - Database tables correct (User, ApiKey, UsageLog)
   - Signup endpoint working
   - Protected endpoints requiring authentication
8. Added Traefik route for rpc.lumenquery.io:
   - RPC router with TLS (Let's Encrypt)
   - Rate limiting: 200/min with burst of 100
   - Configured host.docker.internal for Traefik
   - Added extra_hosts to docker-compose.yml
9. Fixed UFW firewall for Docker network connectivity:
   - Added rule: 172.16.0.0/12 → port 8080 (API gateway)
   - Added rule: 172.16.0.0/12 → port 8082 (RPC gateway)
10. Committed and pushed Traefik routing changes to GitHub

### 2026-02-08
1. Fixed dashboard usage display not reporting:
   - Issue: BigInt fields from PostgreSQL (totalResponseTimeMs, totalDataTransferBytes) couldn't be serialized to JSON
   - Error: "TypeError: Do not know how to serialize a BigInt"
   - Fix: Convert BigInt values to Number before JSON response in /api/usage endpoint
2. Rebuilt and deployed portal with the fix
3. Committed and pushed fix to GitHub
4. Built Advanced Stellar Analytics Dashboard:
   - Target audience: Traders, validators, funds
   - Public access (no authentication required)
   - Real-time network metrics with 30s refresh
   - Pages: /analytics (overview), /analytics/network, /analytics/tokens, /analytics/contracts
   - Components: MetricCard, AreaChart, TimeRangeSelector
   - API endpoint: /api/analytics/network with Redis caching (30s TTL)
   - Metrics displayed: ledger sequence, TPS, success rate, fees, protocol version
   - Connected stellar-horizon to lumenquery-network for data access
   - Time range selector: 24h, 7d, 30d
5. Committed and pushed analytics dashboard to GitHub
6. Added SEO optimization and HTML5 semantic elements:
   - Page-specific metadata exports (title, description, keywords, openGraph)
   - robots meta tags (noindex for dashboard/auth pages)
   - HTML5 semantic elements: main, header, article, section, nav, aside, time
   - JSON-LD structured data for blog posts (Article schema)
   - ARIA attributes for accessibility (aria-labelledby, aria-label, aria-current)
   - Proper heading hierarchy (H1-H6) with sr-only headings where needed
7. Added canonical URLs to all pages:
   - Home, Blog, Docs, Analytics pages with static canonical URLs
   - Blog posts with dynamic canonical URLs based on slug
8. Fixed analytics dashboard not showing transaction data:
   - Issue: Horizon API returns `transaction_count` as null
   - Fix: Calculate total from `successful_transaction_count + failed_transaction_count`
   - Applied fix to both `calculateMetrics` and `aggregateHistory` functions

## SEO Optimization

### Metadata Implementation
| Page | Title | robots | canonical |
|------|-------|--------|-----------|
| Home | LumenQuery - Enterprise Stellar Horizon API & Soroban RPC Infrastructure | index, follow | https://lumenquery.io |
| Blog | Blog - LumenQuery \| Stellar Blockchain Insights & Tutorials | index, follow | https://lumenquery.io/blog |
| Blog Posts | [Post Title] - LumenQuery Blog + JSON-LD Article schema | index, follow | https://lumenquery.io/blog/{slug} |
| Docs | API Documentation - LumenQuery \| Stellar Horizon API & Soroban RPC | index, follow | https://lumenquery.io/docs |
| Analytics | Stellar Network Analytics - LumenQuery \| Real-Time Blockchain Metrics | index, follow | https://lumenquery.io/analytics |
| Dashboard | Dashboard - LumenQuery | noindex, nofollow | - |
| Auth Pages | Authentication - LumenQuery | noindex, nofollow | - |

### Required Meta Tags (All Pages)
- `<title>` - Page-specific title
- `<meta charset="utf-8">` - Character encoding (auto by Next.js)
- `<meta name="viewport">` - Responsive viewport (auto by Next.js)
- `<meta name="robots">` - Search engine directives
- `<meta name="description">` - Page description
- `<link rel="canonical">` - Canonical URL
- `<h1>` - Primary heading

### Semantic Elements Added
- `<main>` wrapper on all pages
- `<header>` for page hero sections
- `<section>` with aria-labelledby for content sections
- `<article>` for blog posts
- `<aside>` for sidebars (docs, analytics)
- `<nav>` for navigation elements
- `<time datetime="">` for dates in blog posts
- Screen reader only headings (sr-only) for form sections

### Files Modified
- portal/app/page.tsx (home)
- portal/app/blog/page.tsx (listing)
- portal/app/blog/[slug]/page.tsx (posts + JSON-LD)
- portal/app/docs/page.tsx + layout.tsx
- portal/app/analytics/layout.tsx (refactored)
- portal/app/analytics/network/layout.tsx
- portal/app/analytics/tokens/layout.tsx
- portal/app/analytics/contracts/layout.tsx
- portal/app/dashboard/page.tsx + layout.tsx
- portal/app/auth/signin/page.tsx
- portal/app/auth/signup/page.tsx
- portal/app/auth/layout.tsx
- portal/components/analytics/AnalyticsNav.tsx (new)

## Analytics Dashboard

### Overview
Public analytics dashboard for Stellar network insights. No authentication required.

### Pages
| Route | Description | Status |
|-------|-------------|--------|
| /analytics | Overview with key metrics and charts | ✅ Live |
| /analytics/network | Detailed ledger and transaction metrics | ✅ Live |
| /analytics/tokens | Token velocity, whale tracking (100K+ XLM) | Coming Soon |
| /analytics/contracts | Soroban contract analytics, gas usage | Coming Soon |

### Components
- `MetricCard` - Display single metric with icon, trend indicator
- `AreaChart` - Time series visualization using Recharts
- `TimeRangeSelector` - Toggle between 24h, 7d, 30d views

### API Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| /api/analytics/network | GET | Network overview metrics |

### Data Sources
- Stellar Horizon API (ledgers, fee_stats)
- Redis cache (30 second TTL)

### Metrics Validation (2026-02-08)
All analytics metrics validated against Horizon API:

| Metric | Source | Calculation | Status |
|--------|--------|-------------|--------|
| Current Ledger | `/ledgers?limit=1` | Latest ledger sequence | ✅ Validated |
| Avg Fee | `fee_stats.last_ledger_base_fee` | Direct from Horizon | ✅ Validated |
| P95 Fee | `fee_stats.fee_charged.p95` | Direct from Horizon | ✅ Validated |
| Success Rate | 100 ledgers sample | `successful_txs / total_txs × 100` | ✅ Validated |
| TPS | 10 ledgers sample | `total_txs / time_span_seconds` | ✅ Validated |
| Transactions (24h) | 100 ledgers sample | `total_txs × (86400 / sample_time_span)` | ✅ Validated |

**Notes:**
- TPS uses 10 ledgers (~1 min) for current rate display
- 24h estimate uses 100 ledgers (~10 min) for better daily average
- `transaction_count` field is null in Horizon; calculated from `successful + failed`

### Future Phases
- Phase 2: Token analytics (velocity, whale movements >100K XLM, issuer risk)
- Phase 3: Soroban contract analytics (call frequency, gas usage, events)

## Notes
- Before ending a session, ask Claude to update this file with current progress
- Monitoring server (mon1) is ready for stack deployment
- GitHub secrets need to be configured for automated deployments
