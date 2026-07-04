# Project Context

## Current Status
- Working on: Infrastructure cleanup, blog content, SEO
- Last session: 2026-07-03
- Last validated: 2026-07-03
- All services: 11 containers running (stellar-horizon removed)
- Stellar Horizon: Removed (not needed, all services use public Horizon API)
- Database: PostgreSQL 33 tables (10 orphaned compliance tables removed)
- Blog Posts: 63+ articles (4 new posts added 2026-07-03)
- Portfolio Intelligence: Implementation complete, deployed, documentation complete
- Soroban Pro: Implementation complete, deployed, documentation complete
- Compliance & AML: REMOVED (code, schema, and database tables all cleaned up)
- Transaction Intelligence: Documentation complete
- Stellar Network Analytics: Documentation complete
- SEO: 8 keyword landing pages + 6 trust/enterprise pages, sitemap 90 URLs, submitted to Google + Bing
- SEO Landing Pages: /stellar-horizon-api, /stellar-rpc-provider, /soroban-rpc-api, /stellar-blockchain-analytics-api, /stellar-transaction-monitoring, /xlm-whale-alerts, /stellar-api-rate-limits, /stellar-api-provider-comparison
- Trust Pages: /status, /sla, /security, /changelog, /contact, /enterprise
- Structured Data: Organization, WebSite, SearchAction (global), SoftwareApplication (landing pages), Article+BreadcrumbList (blog), FAQPage (landing+trust pages)
- IndexNow: Automated Bing submission script at scripts/indexnow-submit.mjs
- Google Index Status: 1 indexed, 16 crawled-not-indexed, 67 unknown (as of 2026-07-03)
- Performance: Gzip compression enabled, Core Web Vitals optimized
- Disk: Freed 115GB by removing /opt/stellar/ directory

## Service Status (api1.lumenquery.io)

### Application Services
| Service | Status | Ports |
|---------|--------|-------|
| soroban-rpc | ✅ Running | Internal |
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
| LumenQuery | PostgreSQL | lumenquery-postgres:5432 | ✅ Healthy (33 tables) |
| LumenQuery Cache | Redis | lumenquery-redis:6379 | ✅ Healthy |

**Note:** All Horizon API calls use the public Stellar Horizon API (https://horizon.stellar.org). Local Horizon instance was removed (2026-07-03).

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
├── stellar/                     # Stellar infrastructure (legacy configs)
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
- **Blockchain**: Soroban RPC, Public Stellar Horizon API
- **Monitoring**: Prometheus + Grafana

## Source Code Locations

| Component | Path | Description |
|-----------|------|-------------|
| Portal App | `/opt/lumenquery-portal/portal/app/` | Next.js pages and API routes |
| Portal Components | `/opt/lumenquery-portal/portal/components/` | React components (Header, Footer) |
| Analytics Components | `/opt/lumenquery-portal/portal/components/analytics/` | MetricCard, AreaChart, TimeRangeSelector |
| Analytics Pages | `/opt/lumenquery-portal/portal/app/analytics/` | Public analytics dashboard |
| Analytics API | `/opt/lumenquery-portal/portal/app/api/analytics/` | Network metrics API endpoint |
| Compliance Components | `/opt/lumenquery-portal/portal/components/compliance/` | ViolationTable, RuleCard, StatusCard |
| Compliance Pages | `/opt/lumenquery-portal/portal/app/compliance/` | Compliance dashboard |
| Compliance API | `/opt/lumenquery-portal/portal/app/api/compliance/` | Rules, violations, reports API |
| Compliance Lib | `/opt/lumenquery-portal/portal/lib/compliance/` | Rules engine, evaluators, audit |
| Intelligence Components | `/opt/lumenquery-portal/portal/components/intelligence/` | WatchlistTable, AlertTable, TrustlineMonitor |
| Intelligence Pages | `/opt/lumenquery-portal/portal/app/intelligence/` | Intelligence dashboard |
| Intelligence API | `/opt/lumenquery-portal/portal/app/api/intelligence/` | Watchlists, alerts, stream API |
| Intelligence Docs | `/opt/lumenquery-portal/portal/app/docs/intelligence/` | Transaction Intelligence documentation |
| Analytics Docs | `/opt/lumenquery-portal/portal/app/docs/analytics/` | Stellar Network Analytics documentation |
| Compliance Docs | `/opt/lumenquery-portal/portal/app/docs/compliance/` | Compliance & AML documentation |
| Contracts Docs | `/opt/lumenquery-portal/portal/app/docs/contracts/` | Soroban Smart Contracts Explorer documentation |
| Portfolio Docs | `/opt/lumenquery-portal/portal/app/docs/portfolio/` | Portfolio Intelligence documentation |
| Portfolio Components | `/opt/lumenquery-portal/portal/components/portfolio/` | PortfolioNav, PortfolioSummary, AssetTable |
| Portfolio Pages | `/opt/lumenquery-portal/portal/app/portfolio/` | Portfolio dashboard and management pages |
| Portfolio API | `/opt/lumenquery-portal/portal/app/api/portfolio/` | Portfolio CRUD, accounts, sync endpoints |
| Portfolio Lib | `/opt/lumenquery-portal/portal/lib/portfolio/` | Types, gates, calculator, risk-assessor, Horizon client |
| Admin Components | `/opt/lumenquery-portal/portal/components/admin/` | AdminNav, UserTable, AuditLogTable |
| Admin Pages | `/opt/lumenquery-portal/portal/app/admin/` | Admin dashboard and management pages |
| Admin API | `/opt/lumenquery-portal/portal/app/api/admin/` | Users, usage, audit log endpoints |
| Admin Lib | `/opt/lumenquery-portal/portal/lib/admin/` | Admin guards, audit logging utilities |
| Jobs System | `/opt/lumenquery-portal/portal/lib/jobs/` | Background job queue and workers |
| Notifications | `/opt/lumenquery-portal/portal/lib/notifications/` | Email, Slack, webhook channels |
| Portal Lib | `/opt/lumenquery-portal/portal/lib/` | Auth, Prisma, rate-limit, Redis utilities |
| Portal Middleware | `/opt/lumenquery-portal/portal/middleware.ts` | Rate limiting middleware |
| RPC Gateway | `/opt/lumenquery-portal/rpc-gateway/src/` | Fastify RPC proxy |
| API Gateway | `/opt/lumenquery-portal/api-gateway/src/` | API service |
| Traefik Config | `/opt/lumenquery-portal/traefik/` | Routing configuration |
| Monitoring | `/opt/lumenquery-portal/monitoring/` | Prometheus + Grafana |

## Blog Posts

| Slug | Title | Date |
|------|-------|------|
| stellar-quantum-preparedness-post-quantum-soroban | Stellar's Quantum Preparedness Plan: How Developers Should Audit Signatures Before Post-Quantum Soroban | 2026-07-03 |
| open-usd-consortium-visa-blackrock-stellar-stablecoin | Inside the Open USD Consortium: What Visa and BlackRock's Stellar Stablecoin Means for Payment Developers | 2026-07-03 |
| erc-3643-compliant-security-tokens-stellar | Building Compliant Security Tokens on Stellar with ERC-3643 | 2026-07-03 |
| stellar-2b-rwa-tokenized-asset-analytics-dashboard | Tracking Stellar's $2B RWA Milestone On-Chain: Build a Tokenized-Asset Analytics Dashboard | 2026-07-03 |
| (59 earlier posts) | See blog listing page for full list | 2026-01-25 to 2026-06-09 |
| build-stellar-blockchain-explorer-horizon-api | How to Build a Stellar Blockchain Explorer Using Horizon API | 2026-02-13 |
| soroban-json-rpc-explained | Soroban JSON RPC Explained: How to Query Smart Contracts on Stellar | 2026-02-13 |
| best-stellar-api-providers-2026 | Best Stellar API Providers in 2026 (Comparison Guide) | 2026-02-13 |
| monitor-stellar-validator-horizon-node | How to Monitor a Stellar Validator or Horizon Node in Production | 2026-02-13 |
| using-claude-code-with-json-rpc-api | Using Claude Code to Interface with JSON-RPC APIs | 2026-02-07 |
| getting-started-with-claude-code | Getting Started with Claude Code | 2026-02-07 |
| stellar-lumen-future-decentralized-applications | Stellar Lumen and the Future of Decentralized Applications | 2026-02-03 |
| building-web3-with-rpc-nodes | Building in Web3: The Essential Role of RPC Nodes | 2026-02-02 |
| future-of-stellar-blockchain-2026 | The Future of Stellar: What's Next for the Lumen Blockchain | 2026-01-29 |
| xlm-retail-market-potential | XLM and the Retail Revolution | 2026-01-28 |
| stellar-api-use-cases-for-fintech | 5 Powerful Use Cases for the Stellar Horizon API | 2026-01-27 |
| getting-started-with-lumenquery | Getting Started with LumenQuery | 2026-01-25 |

**Blog files:**
- Listing: `/opt/lumenquery-portal/portal/app/(cuba)/blog/page.tsx`
- Content: `/opt/lumenquery-portal/portal/app/(cuba)/blog/[slug]/page.tsx`

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
15. Add Soroban Pro - Smart Contract Explorer
16. Add Stellar Compliance & AML Alerting Service
17. Update CLAUDE.md with Compliance & AML service documentation
18. Fix SEO issues for Google indexing
19. Enable gzip compression in Traefik for performance
20. Add forgot password / account recovery feature
21. Add verification key file and update CLAUDE.md
22. Fix analytics charts for 7d and 30d time ranges
23. Update CLAUDE.md with analytics fix documentation
24. Add Transaction Intelligence documentation
25. Update CLAUDE.md with Transaction Intelligence documentation
26. Add Stellar Network Analytics documentation
27. Add Compliance & AML documentation
28. Update CLAUDE.md with Compliance documentation
29. Add Soroban Smart Contracts Explorer documentation
30. Update CLAUDE.md with Contracts documentation
31. Add Stellar Portfolio + Yield Intelligence Platform
32. Add Portfolio Intelligence documentation
33. Add 4 new SEO-optimized blog posts
34. Update sitemap with comprehensive URL structure
35. Add Administrative Console
36. Update CLAUDE.md with Administrative Console documentation
37. Add product navigation links to dashboard and admin console
38. Add live transaction viewer dashboard
39. Fix SSE streaming route static generation timeout

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
| /api/auth/forgot-password | 3/hour per email |
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
| `/opt/soroban-rpc/docker-compose.yml` | Soroban RPC (self-contained with embedded Captive Core) |

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
- [x] Soroban Pro - Smart Contract Explorer
- [x] Compliance & AML Alerting Service
- [x] SEO optimization (sitemap, canonical URLs, meta tags, JSON-LD)
- [x] Performance optimization (gzip compression, 83% size reduction)
- [x] Forgot password / account recovery

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

### 2026-02-09
1. Built Soroban Pro - Smart Contract Explorer:
   - Target customers: Web3 developers, startups, auditors
   - Premium Soroban-focused explorer with decoded contract data
2. Database Schema Updates:
   - Added 6 new Prisma models: Contract, ContractCall, ContractStorage, ContractEvent, StorageSnapshot, AIExplanationCache
   - Renamed subscription tiers: STARTER→DEVELOPER ($25/mo), PROFESSIONAL→TEAM ($99/mo)
   - Added Soroban Pro limits to Organization model
3. Created Soroban utility library (`/lib/soroban/`):
   - types.ts - TypeScript interfaces for Soroban data
   - decoder.ts - XDR decoding utilities
   - formatter.ts - Human-readable formatting
   - gates.ts - Feature gating by tier
   - rpc-client.ts - Soroban RPC client
4. Built Contract API endpoints:
   - GET /api/contracts/search - Search contracts
   - GET /api/contracts/[contractId] - Contract details
   - GET /api/contracts/[contractId]/calls - Call history
   - GET /api/contracts/[contractId]/storage - Storage state
   - GET /api/contracts/[contractId]/events - Events list
   - GET /api/contracts/[contractId]/analytics - Gas/error stats
   - POST /api/contracts/[contractId]/calls/[callId]/explain - AI explanation
   - GET /api/contracts/[contractId]/events/stream - SSE real-time events
   - GET /api/contracts/[contractId]/export - CSV/JSON export
5. Created UI components (`/components/contracts/`):
   - ContractSearch - Search with autocomplete
   - ContractCard - Contract summary card
   - ContractNav - Navigation sidebar
   - CallHistoryTable - Paginated call list
   - StorageTable - Storage key-value display
   - EventStream - Event display
   - AIExplanation - AI explanation component
   - ExportButton - Export dropdown
6. Built contract explorer pages:
   - /contracts - Explorer home with search
   - /contracts/[contractId] - Contract overview
   - /contracts/[contractId]/calls - Call history
   - /contracts/[contractId]/storage - Storage viewer
   - /contracts/[contractId]/events - Events
   - /contracts/[contractId]/analytics - Analytics
7. Integrated AI explanations with Anthropic Claude:
   - Uses claude-3-haiku for fast explanations
   - 7-day cache for explanations
   - Tier-based limits (50/mo Developer, 500/mo Team)
8. Created pricing page with tier comparison
9. Updated Header navigation (added Contracts, Pricing links)
10. Successfully built portal with all new features

### 2026-02-12
1. Built Stellar Compliance & AML Alerting Service:
   - Target customers: Exchanges, custodians, financial institutions
   - Comprehensive compliance monitoring for Stellar network
2. Database Schema Updates:
   - Added 10+ new Prisma models: MonitoredAccount, ComplianceRule, ComplianceViolation, ComplianceReport, AuditLogEntry, SanctionedAccount, PaymentGraphEdge, PaymentCycle, AccountProfile, BackgroundJob
   - Added compliance tier to Organization model
3. Created Rules Engine (`/lib/compliance/`):
   - rules-engine.ts - Core evaluation engine
   - 10 evaluator types: SANCTIONS_SCREENING, VELOCITY_LIMIT, VOLUME_LIMIT, CIRCULAR_PAYMENT, MIXER_DETECTION, UNUSUAL_PATTERN, COUNTERPARTY_RISK, CONTRACT_ABUSE, STRUCTURING, DORMANT_ACTIVATION
   - audit.ts - Immutable audit log with hash chain verification
   - gates.ts - Feature gating by tier
   - tiers.ts - Tier configuration (Basic, Standard, Enterprise)
4. Built Compliance API endpoints:
   - GET/POST /api/compliance/accounts - Monitored accounts management
   - GET/PUT/DELETE /api/compliance/accounts/[accountId] - Account operations
   - GET/POST /api/compliance/rules - Rule management
   - GET/PUT/DELETE /api/compliance/rules/[ruleId] - Rule operations
   - GET /api/compliance/violations - List violations with filters
   - GET/PUT /api/compliance/violations/[violationId] - Violation detail/review
   - GET/POST /api/compliance/reports - Generate compliance reports
   - GET/DELETE /api/compliance/reports/[reportId] - Report operations
   - GET /api/compliance/reports/[reportId]/export - CSV/JSON export
   - GET /api/compliance/audit - Audit log viewer
   - GET /api/compliance/status - Compliance status overview
5. Created UI components (`/components/compliance/`):
   - ComplianceNav - Navigation sidebar
   - ViolationTable - Violation display with expandable details
   - AccountTable - Sortable monitored accounts table
   - RuleCard - Rule display with enable/disable toggle
   - RuleForm - Dynamic form for rule creation/editing
   - AuditLogTable - Expandable audit log display
   - StatusCard - Compliance status overview cards
6. Built compliance pages:
   - /compliance - Overview dashboard with status cards
   - /compliance/accounts - Account management
   - /compliance/violations - Violations list with filters
   - /compliance/violations/[violationId] - Violation detail/review
   - /compliance/rules - Rules management
   - /compliance/reports - Report generation
   - /compliance/audit - Audit log viewer
7. Created Background Jobs System (`/lib/jobs/`):
   - queue.ts - Redis-based job queue with priority and retry
   - workers/account-scan-worker.ts - Account scanning
   - workers/risk-assessment-worker.ts - Risk scoring
   - workers/sanctions-sync-worker.ts - OFAC/community list sync
   - scheduler.ts - Cron-based job scheduling
8. Created Notification System (`/lib/notifications/`):
   - channels/email.ts - Email notifications via Nodemailer
   - channels/slack.ts - Slack webhook integration
   - channels/webhook.ts - Custom webhook delivery
   - templates/violation-alert.ts - Alert templates
9. Updated pricing page with Compliance & AML tiers
10. Updated Header navigation with Compliance link
11. Created centralized Redis module (`/lib/redis.ts`)
12. Successfully built and deployed portal
13. Committed and pushed to GitHub
14. Fixed SEO issues for Google indexing:
    - Updated sitemap.xml with all 8 blog posts (was missing 4)
    - Added all public pages to sitemap (analytics, pricing, contracts)
    - Removed auth pages from sitemap (blocked by robots.txt)
    - Removed compliance/intelligence pages (require auth, noindex)
    - Added canonical URLs to pricing and contracts layouts
    - Added explicit robots: index, follow to all public pages
15. Enabled gzip compression in Traefik:
    - Added compress middleware to all routes (portal, api, rpc)
    - HTML transfer size reduced by 83% (40KB → 6.7KB)
    - Excludes already-compressed image formats
16. Ran Core Web Vitals audit:
    - TTFB: 225ms (excellent)
    - Total load time: 226ms (excellent)
    - All SEO tags verified present
    - Estimated Lighthouse scores: 90-95 across all categories
17. Verified all Google indexing requirements met:
    - Pages return HTTP 200
    - Not blocked by robots.txt
    - Have robots: index, follow meta tag
    - Self-referencing canonical URLs
    - Mobile-friendly responsive design
    - Valid XML sitemap with lastmod dates
    - BlogPosting JSON-LD structured data
18. Committed and pushed SEO/performance changes to GitHub

### 2026-02-13
1. Added Forgot Password / Account Recovery feature:
   - Created PasswordResetToken Prisma model with email, token, expires, used fields
   - Created POST /api/auth/forgot-password endpoint:
     - Rate limiting: 3 requests per email per hour
     - Email enumeration protection (always returns success)
     - Generates secure 32-byte random token
     - 1-hour token expiry
     - Sends reset email via Resend API
   - Created GET/POST /api/auth/reset-password endpoint:
     - GET: Validates token validity (not expired, not used)
     - POST: Resets password with validation (8+ chars, uppercase, lowercase, number)
     - Marks token as used in database transaction
     - Invalidates all user sessions after password change
   - Created /auth/forgot-password page:
     - Email input form with validation
     - Success state showing "Check your email" message
     - Link to retry or return to sign in
   - Created /auth/reset-password page:
     - Token validation on page load
     - New password and confirm password inputs
     - Error states for invalid/expired tokens
     - Success state with link to sign in
   - Updated /auth/signin page:
     - Added "Forgot password?" link next to password label
2. Security features implemented:
   - Secure token generation (crypto.randomBytes)
   - Token expiration (1 hour)
   - Single-use tokens (marked as used after reset)
   - Password strength validation
   - Session invalidation on password change
   - Rate limiting to prevent abuse
   - No email enumeration (same response for valid/invalid emails)
3. Rebuilt and deployed portal with forgot password feature
4. Added domain verification key file:
   - Copied verification key to portal/public/ directory
   - File accessible at https://lumenquery.io/4e2078aeeb0c498a82098dde8079383e.txt
5. Fixed forgot password database issue:
   - PasswordResetToken table was missing from database
   - Ran `prisma db push` to sync schema with database
   - Created PasswordResetToken table (29 total tables now)
   - Verified API endpoint working correctly
6. Committed and pushed changes to GitHub
7. Fixed Analytics charts not showing historical data for 7d and 30d:
   - Issue: Page limits were too low to fetch enough ledger history
   - Each Horizon page = 200 ledgers ≈ 17 minutes of data
   - Previous limits: 100/200/300 pages for 24h/7d/30d
   - Fixed limits: 100/700/1600 pages for 24h/7d/30d
   - Results now show:
     - 24h: 25 hourly data points (full coverage)
     - 7d: 43 data points in 4-hour buckets (full 7 days)
     - 30d: 20 daily data points (full Horizon history ~19 days)
   - Data is cached (30s for 24h, 5min for 7d, 10min for 30d)
8. Committed and pushed analytics fix to GitHub
9. Created Transaction Intelligence documentation:
   - Created comprehensive docs page at /docs/intelligence
   - Overview section with introduction and dashboard explanation
   - Subscription tiers comparison (Solo, Teams, Enterprise)
   - Live Stream documentation with 7 filter types and controls
   - Accounts profiling with classification types and behavior metrics
   - Watchlists management with tier-based limits
   - Alerts system with 5 alert types and notification channels
   - Trustlines monitoring with change types and filters
   - Contracts tracking for Soroban smart contracts
   - Complete API reference for all intelligence endpoints
   - Added link to Intelligence docs in main docs sidebar
10. Committed and pushed documentation to GitHub
11. Created Stellar Network Analytics documentation:
    - Created comprehensive docs page at /docs/analytics
    - Overview section with introduction and dashboard explanation
    - Time range selector documentation (24h, 7d, 30d)
    - Network metrics: ledgers, TPS, success rate, fees with calculations
    - Token analytics: velocity, whale tracking, issuer risk analysis
    - Smart contracts (Soroban): invocations, gas usage, events
    - Understanding Stroops section:
      - 1 XLM = 10,000,000 stroops conversion
      - Why stroops exist (precision, integer math, low fees)
      - Conversion examples and formulas
      - Display format rules
    - Complete API reference for all analytics endpoints
    - Data sources and refresh rates
    - Added link to Analytics docs in main docs sidebar
12. Committed and pushed analytics documentation to GitHub
13. Created Compliance & AML documentation:
    - Created comprehensive docs page at /docs/compliance
    - Overview section with introduction and dashboard explanation
    - Subscription tiers comparison (Basic, Standard, Enterprise)
    - Accounts management with monitoring levels (BASIC, STANDARD, ENHANCED, RESTRICTED)
    - Rules management with 10 rule types documented
    - Violations workflow with status progression
    - Reports generation and compliance report types
    - Audit Log with hash chain verification and immutability
    - How-to guides: Add an Account, Create a Rule
    - Complete API reference for all compliance endpoints
    - Added link to Compliance docs in main docs sidebar
14. Committed and pushed Compliance documentation to GitHub
15. Created Soroban Smart Contracts Explorer documentation:
    - Created comprehensive docs page at /docs/contracts
    - Decoded Calls section: XDR decoding, call history table, filtering options
    - Storage Viewer section: Persistent/Temporary/Instance storage types
    - Event Stream section: Real-time SSE streaming, event types, common patterns
    - AI Explanations section with "Coming Soon" disclaimer
    - Reference sections: XDR decoding process, Soroban data types
    - Complete API reference for all contract endpoints
    - Added link to Contracts docs in main docs sidebar
16. Committed and pushed Contracts documentation to GitHub
17. Built Stellar Portfolio + Yield Intelligence Platform:
    - Target customers: Power users, DAOs, funds, DeFi participants
    - Pain solved: Stellar portfolios are fragmented and opaque
    - Features: Multi-account aggregation, asset-level P&L, trustline risk
    - Soroban contract positions, yield & reward tracking
    - Historical performance snapshots
18. Database Schema Updates:
    - Added Portfolio, PortfolioAccount, AssetPosition models
    - Added TradeRecord for P&L with FIFO cost basis
    - Added ContractPosition for Soroban DeFi positions
    - Added YieldSource, YieldReward for yield tracking
    - Added PerformanceSnapshot for historical data
    - Added TrustlineRisk for risk assessment
    - Added PortfolioTier enum (NONE, FREE, PRO, DAO)
19. Created Portfolio utility library (`/lib/portfolio/`):
    - types.ts - TypeScript interfaces for portfolio data
    - gates.ts - Feature gating by tier
    - horizon-client.ts - Horizon API client for account data
    - calculator.ts - P&L and value calculation utilities
    - risk-assessor.ts - Trustline risk assessment
20. Built Portfolio API endpoints:
    - GET/POST /api/portfolio - List/create portfolios
    - GET/PUT/DELETE /api/portfolio/[id] - Portfolio operations
    - GET/POST /api/portfolio/[id]/accounts - Account management
    - POST /api/portfolio/[id]/sync - Sync from Horizon
21. Created UI components (`/components/portfolio/`):
    - PortfolioNav - Navigation sidebar
    - PortfolioSummary - Overview cards with sync
    - AssetTable - Sortable asset positions table
22. Built portfolio pages:
    - /portfolio - Portfolio list with tier info
    - /portfolio/[id] - Portfolio dashboard
    - /portfolio/[id]/accounts - Account management
23. Updated Header navigation with Portfolio link
24. Successfully built and deployed portal
25. Synced database schema (39 tables now)
26. Committed and pushed Portfolio feature to GitHub
27. Created Portfolio Intelligence documentation:
    - Created comprehensive docs page at /docs/portfolio
    - Introduction with target users (power users, DAOs, funds, DeFi)
    - Dashboard section with key metrics and sections
    - Subscription tiers comparison (FREE, PRO, DAO)
    - Portfolios and Account Management
    - Asset Positions with cost basis tracking
    - P&L Tracking with FIFO explanation
    - Trustline Risk assessment and scoring
    - Contract Positions (Soroban DeFi)
    - Yield Tracking with source types
    - Performance Snapshots with retention periods
    - How-to guides: Create Portfolio, Add Account, Sync Data
    - Cost Basis (FIFO) calculation reference
    - Risk Scoring methodology
    - Complete API reference
    - Added Portfolio link to docs sidebar
28. Committed and pushed documentation to GitHub
29. Created 4 new SEO-optimized blog posts:
    - "How to Build a Stellar Blockchain Explorer Using Horizon API"
      - Step-by-step guide with React/Next.js code examples
      - Fetching transactions, querying accounts, parsing operations
      - Uses LumenQuery Horizon API endpoints throughout
    - "Soroban JSON RPC Explained: How to Query Smart Contracts"
      - JSON-RPC basics and core methods
      - Contract invocation, state queries, event monitoring
      - Horizon vs Soroban RPC comparison table
    - "Best Stellar API Providers in 2026 (Comparison Guide)"
      - Self-hosted vs public vs managed comparison
      - Performance benchmarks and pricing tables
      - Feature matrix and total cost of ownership analysis
    - "How to Monitor a Stellar Validator or Horizon Node"
      - Prometheus + Grafana setup with Docker Compose
      - Alert rules for Core, Horizon, and system metrics
      - Ledger lag detection and runbook examples
30. Updated sitemap.xml with new blog posts (priority 0.8)
31. Committed and pushed blog posts to GitHub
32. Updated sitemap.xml with comprehensive URL structure:
    - Reorganized into categories: Core, Documentation, Analytics, Services, Blog
    - Added all 6 documentation pages (/docs/*)
    - Added all 4 analytics pages (/analytics/*)
    - Added contracts explorer page
    - Total: 24 URLs indexed
33. Committed and pushed sitemap update to GitHub

### 2026-02-14
1. Built Administrative Console:
   - Target users: Platform administrators
   - Features: User management, usage analytics, audit log, password reset
2. Database Schema Updates:
   - Added UserRole enum (USER, ADMIN, SUPER_ADMIN)
   - Added session tracking fields to User (lastLoginAt, lastActiveAt, currentSessionStart)
   - Added AdminAuditLog model for audit trail
3. Created Admin API endpoints:
   - GET /api/admin/users - List users with pagination/filtering
   - GET/PUT /api/admin/users/[userId] - User detail and update
   - POST /api/admin/users/[userId]/password - Send password reset email
   - GET/DELETE /api/admin/users/[userId]/sessions - Session info / force logout
   - GET /api/admin/usage - Aggregated usage statistics
   - GET /api/admin/usage/[userId] - Per-user feature usage
   - GET /api/admin/audit - Admin audit log
4. Created Admin UI components:
   - AdminNav - Sidebar navigation
   - UserTable - Sortable, filterable user list
   - PasswordResetModal - Password reset dialog
   - AuditLogTable - Audit log with expandable details
5. Built admin pages:
   - /admin - Dashboard with overview stats
   - /admin/users - User list with search and filters
   - /admin/users/[userId] - User detail with usage stats
   - /admin/usage - Usage analytics dashboard
   - /admin/audit - Admin audit log
6. Security features:
   - Role-based access control (ADMIN, SUPER_ADMIN)
   - Super admin required for role modifications
   - Cannot remove the last super admin
   - All admin actions logged to AdminAuditLog
7. Updated Header component with Admin link for admin users
8. Successfully built and deployed portal
9. Synced database schema (40 tables now)
10. Committed and pushed to GitHub
11. Created first super admin user (admin@lumenquery.io)
12. Added product navigation links:
    - Dashboard: Added navigation bar with Contracts, Analytics, Intelligence, Compliance, Portfolio, Docs, Admin links
    - Admin Console: Added Products section in sidebar with all product links
13. Committed and pushed navigation updates to GitHub
14. Built Live Transaction Viewer Dashboard:
    - Real-time transaction streaming via SSE (Server-Sent Events)
    - Decoded XDR operations in plain English
    - Human-readable descriptions for 25+ operation types:
      - Payments, path payments, create account
      - Manage offers (buy/sell), passive offers
      - Change trust, allow trust, set options
      - Account merge, bump sequence, manage data
      - Soroban: invoke_host_function, extend_footprint_ttl, restore_footprint
      - Claimable balances, sponsorship, liquidity pools
    - Expandable transaction details with full JSON
    - Dark theme UI for comfortable monitoring
    - Pause/resume and clear controls
    - Accessible at /dashboard/transactions
15. Committed and pushed transaction viewer to GitHub
16. Fixed SSE route static generation timeout:
    - Issue: Build was timing out because Next.js tried to statically pre-render the SSE endpoint
    - Error: "Static page generation for /api/transactions/stream is still timing out after 3 attempts"
    - Fix: Added dynamic route exports to prevent static generation:
      ```typescript
      export const dynamic = 'force-dynamic';
      export const runtime = 'nodejs';
      ```
    - Rebuilt and redeployed portal
    - Verified page returns HTTP 200 and SSE stream is working
17. Committed and pushed SSE route fix to GitHub

### 2026-02-19
1. Fixed Analytics API "Failed to fetch metrics" error:
   - Root cause: Local Horizon instance's PostgreSQL database at 184.105.230.246:5432 is unreachable (connection refused)
   - All Horizon API calls were returning HTTP 500 errors
   - Local Horizon container was running but couldn't connect to its remote database
2. Implemented public Horizon API fallback:
   - Added `fetchWithFallback()` helper function to all analytics routes
   - Uses public Stellar Horizon API (https://horizon.stellar.org) as default/fallback
   - When local Horizon fails or is unreachable, automatically falls back to public API
   - Updated pagination in fetchLedgerHistory to use consistent base URL
3. Updated analytics routes:
   - /api/analytics/network - Network metrics, ledgers, fees
   - /api/analytics/tokens - Token velocity, whales, issuer risk
   - /api/analytics/contracts - Soroban activity, gas usage, events
4. Verified all analytics pages working:
   - /analytics (Overview) - ✅ Working
   - /analytics/network - ✅ Working
   - /analytics/tokens - ✅ Working
   - /analytics/contracts - ✅ Working
5. Current network metrics (live from public Horizon):
   - Ledger: 61,297,116
   - TPS: 73.45
   - Success Rate: 73.4%
6. Rebuilt and deployed portal
7. Committed and pushed fix to GitHub

### 2026-02-21
1. Fixed stellar-horizon container restart loop:
   - Issue: Container was in constant restart loop, unable to connect to PostgreSQL
   - Root cause: Database URL pointed to wrong IP (184.105.230.246 instead of 184.105.230.250)
   - Fix: Updated DATABASE_URL in `/opt/stellar/horizon/docker-compose.yml`
   - Restarted stellar-horizon container, now healthy
2. Verified all 12 Docker containers running:
   - stellar-horizon ✅ (fixed)
   - soroban-rpc ✅
   - lumenquery-portal ✅
   - lumenquery-api-gateway ✅
   - lumenquery-rpc-gateway ✅
   - lumenquery-traefik ✅
   - lumenquery-postgres ✅
   - lumenquery-redis ✅
   - cadvisor ✅
   - node-exporter ✅
   - postgres-exporter ✅
   - redis-exporter ✅
3. Fixed /dashboard/transactions "Error fetching transactions":
   - Issue: Portal couldn't reach stellar-horizon (different Docker networks)
   - Additional issue: Local Horizon had no data after restart
   - Fix: Added fallback to public Stellar Horizon API (horizon.stellar.org)
   - Updated `/portal/app/api/transactions/stream/route.ts`:
     - Added `fetchWithFallback()` helper function
     - Uses public Horizon when local fails or is unreachable
   - Rebuilt and deployed portal
4. Committed and pushed transaction stream fix to GitHub
5. Fixed Payment Activity chart on /analytics/tokens page:
   - Issue: Chart only showing 1 data point instead of area graph
   - Root cause: Only fetching 200 payments (~1-2 minutes of data), all in same time bucket
   - Additional issue: Only counting XLM payments (very few vs total payments)
   - Fix: Updated `/portal/app/api/analytics/tokens/route.ts`:
     - Fetch 5 pages of payments (1000 total) using HAL link pagination
     - Aggregate by 30-second intervals instead of hourly
     - Count ALL payment types for chart data (not just XLM)
   - Result: Chart now displays 5+ data points as proper area graph
   - Rebuilt and deployed portal
6. Committed and pushed token analytics fix to GitHub
7. Initialized git repo for /opt/stellar/ infrastructure configs:
   - Created .gitignore for captive-core data directories
   - Initial commit with horizon/docker-compose.yml
   - Pending: Create GitHub remote repository

### 2026-07-03
1. Infrastructure cleanup - Removed stellar-horizon service:
   - Confirmed no services use local Horizon (all use public https://horizon.stellar.org)
   - Stopped and removed stellar-horizon container (was failing to ingest due to core version mismatch)
   - Reduced from 12 to 11 running containers
   - Confirmed pg1.lumenquery.io database safe to delete (only used by removed Horizon)
2. Fixed broken portfolio Horizon client:
   - `portal/lib/portfolio/horizon-client.ts` was defaulting to `http://stellar-horizon:8000`
   - Changed to `https://horizon.stellar.org` (portfolio feature was broken without this)
3. Removed stale HORIZON_API_URL references:
   - Removed from `.env` (was `http://172.17.0.1:8000`)
   - Removed from `docker-compose.yml` portal service (was `http://stellar-horizon:8000`)
   - Removed from `docker-compose.yml` api-gateway service (was `http://127.0.0.1:8000`)
4. Cleaned up orphaned compliance database schema:
   - Removed 10 Prisma models: ComplianceRule, ComplianceViolation, MonitoredAccount, SanctionedAccount, AuditLogEntry, PaymentGraphEdge, PaymentCycle, ComplianceReport, NotificationDelivery, BackgroundJob
   - Removed 4 enums: ComplianceTier, ComplianceRuleType, ViolationStatus, MonitoringLevel
   - Removed 8 compliance fields from Organization model
   - Ran `prisma db push --accept-data-loss` to drop tables (40 → 33 tables)
5. Removed /opt/stellar/ directory:
   - Contained captive-core data (115GB) and horizon docker-compose.yml
   - No longer needed by any service (soroban-rpc has its own embedded captive core)
   - Freed 115GB of disk space
6. Updated CLAUDE.md with all infrastructure changes
7. Committed and pushed cleanup to GitHub
8. Created 4 new blog posts:
   - "Stellar's Quantum Preparedness Plan: How Developers Should Audit Signatures Before Post-Quantum Soroban" (Developer Guide, 14 min)
   - "Inside the Open USD Consortium: What Visa and BlackRock's Stellar Stablecoin Means for Payment Developers" (Industry Insights, 12 min)
   - "Building Compliant Security Tokens on Stellar with ERC-3643: A Developer's Guide to Permissioned Assets" (Developer Guide, 15 min)
   - "Tracking Stellar's $2B RWA Milestone On-Chain: Build a Tokenized-Asset Analytics Dashboard with LumenQuery APIs" (Developer Guide, 16 min)
9. Rebuilt and deployed portal with new blog posts
10. Committed and pushed blog posts to GitHub
11. Updated sitemap:
    - Added /stellar page and 4 new blog URLs
    - Updated base date to 2026-07-03
    - Total URLs: 80
12. Submitted sitemap to Google Search Console:
    - Sitemap submitted at 2026-07-03T18:45:55Z
    - Previous status: 75 URLs discovered, 0 indexed
13. Submitted URLs to Bing via IndexNow API:
    - Submitted 13 URLs via api.indexnow.org (HTTP 200)
    - Submitted 5 new URLs directly via www.bing.com/indexnow (HTTP 200)
14. Updated Google Search Console script with new URLs
15. Committed and pushed sitemap/script updates to GitHub
16. Checked Google Search Console analytics (last 28 days):
    - 1 click, 12 impressions, 8.33% CTR, avg position 7.3
    - Homepage ranking at position 1.9
    - Only query: "stellar rpc server" (position 61)
17. Checked Google index status for all 84 URLs:
    - 1 indexed (homepage)
    - 16 crawled but not indexed (older blog posts from Feb-Mar)
    - 67 unknown to Google (not yet crawled)
18. Requested Google indexing for all 84 URLs:
    - All 84 submitted successfully, 0 failures
19. Removed 404 pages from sitemap:
    - Removed /analytics/contracts (page removed previously)
    - Removed /guides listing (individual guide pages still work)
    - Sitemap reduced from 80 to 76 URLs, all returning HTTP 200
20. Created 8 SEO keyword landing pages:
    - /stellar-horizon-api — Horizon API for developers (use cases, code example, comparison table, FAQ)
    - /stellar-rpc-provider — Managed Stellar RPC infrastructure (user segments, comparison, onboarding)
    - /soroban-rpc-api — Soroban smart contract RPC (methods, monitoring, simulation, code examples)
    - /stellar-blockchain-analytics-api — Analytics API (tx volume, whale tracking, token velocity, NL query)
    - /stellar-transaction-monitoring — Transaction monitoring (alert types, SSE streaming, compliance)
    - /xlm-whale-alerts — Large XLM transaction tracking (threshold rules, exchange flows)
    - /stellar-api-rate-limits — Rate limit scaling guide (strategies, comparison table, backoff code)
    - /stellar-api-provider-comparison — Provider comparison (15-row feature matrix, decision guide)
    - All pages include: SEO metadata, H1, JSON-LD (WebPage, FAQPage, BreadcrumbList), FAQ sections, CTAs
21. Added internal links from 17 blog posts to new landing pages:
    - 51 contextual links added across rate limit, Horizon, Soroban, analytics, monitoring, and comparison posts
    - Each post got a "Related Resources" section with 3 relevant links
22. Updated footer with Solutions section:
    - Added new column with all 8 landing page links
    - Reorganized Resources and Support into single column
23. Updated sitemap with 8 new URLs (76 → 84 total)
24. Submitted all new pages to Google Search Console and Bing IndexNow
25. Fixed duplicate "| LumenQuery" in page titles (root layout template was appending it)
26. Added structured data (JSON-LD) improvements:
    - Organization schema added to root layout (site-wide)
    - SoftwareApplication schema added to all 8 SEO landing pages
    - BreadcrumbList JSON-LD added to blog post pages
    - IndexNow automation script created (scripts/indexnow-submit.mjs)
    - npm scripts added: indexnow:submit, indexnow:sitemap
    - Documentation at scripts/README.md
27. Created 6 trust/enterprise pages:
    - /status — Platform status with 7 service categories, all operational
    - /sla — Service level agreement with availability/support/rate-limit tiers
    - /security — Security overview (API keys, auth, data handling, infrastructure, disclosure)
    - /changelog — 19 real product entries from codebase history
    - /contact — Sales/support/security/partnership cards with mailto form
    - /enterprise — Enterprise landing with comparison table, use cases, onboarding flow
28. Updated footer with Company section (Status, Security, SLA, Changelog, Enterprise, Contact)
29. Updated sitemap (84 → 90 URLs)
30. Submitted 6 new pages to Google Search Console and Bing IndexNow
31. Added server-rendered SEO content to 4 thin product pages:
    - /analytics layout: H1, 8 analytics cards, 6 use cases, query examples, 6 FAQs, JSON-LD
    - /contracts layout: H1, 6 monitoring cards, 6 dev use cases, operations table, workflow, 6 FAQs
    - /dashboard/transactions: Created new layout with 8 monitoring items, 6 use cases, alert table, 6 FAQs
    - /query layout: Added FAQ section (6 questions) and related resources
    - All content server-rendered for crawlability; client-side dashboards preserved
32. Submitted 4 updated pages to Google and Bing IndexNow

## SEO Landing Pages

### Overview
8 keyword-focused landing pages targeting high-intent Stellar developer searches. Each page is a server component with full SEO metadata, JSON-LD structured data, FAQ sections, and CTAs.

### Pages
| Route | Target Keyword | Title |
|-------|---------------|-------|
| /stellar-horizon-api | Stellar Horizon API | Stellar Horizon API for Developers |
| /stellar-rpc-provider | Stellar RPC provider | Stellar RPC Provider for Production Apps |
| /soroban-rpc-api | Soroban RPC API | Soroban RPC API for Smart Contract Developers |
| /stellar-blockchain-analytics-api | Stellar blockchain analytics API | Stellar Blockchain Analytics API |
| /stellar-transaction-monitoring | Stellar transaction monitoring | Stellar Transaction Monitoring API |
| /xlm-whale-alerts | XLM whale alerts | XLM Whale Alerts and Large Transaction Monitoring |
| /stellar-api-rate-limits | Stellar API rate limits | Stellar API Rate Limits and Scaling Guide |
| /stellar-api-provider-comparison | Stellar API provider comparison | Stellar API Provider Comparison |

### Files
```
portal/app/(cuba)/stellar-horizon-api/page.tsx
portal/app/(cuba)/stellar-rpc-provider/page.tsx
portal/app/(cuba)/soroban-rpc-api/page.tsx
portal/app/(cuba)/stellar-blockchain-analytics-api/page.tsx
portal/app/(cuba)/stellar-transaction-monitoring/page.tsx
portal/app/(cuba)/xlm-whale-alerts/page.tsx
portal/app/(cuba)/stellar-api-rate-limits/page.tsx
portal/app/(cuba)/stellar-api-provider-comparison/page.tsx
```

### Internal Linking
17 blog posts updated with contextual "Related Resources" sections linking to relevant landing pages (51 links total).

## Trust & Enterprise Pages

### Overview
6 pages for trust, enterprise readiness, and conversion confidence. Each is a server component with SEO metadata and JSON-LD.

### Pages
| Route | Title | JSON-LD |
|-------|-------|---------|
| /status | LumenQuery Status | WebPage, BreadcrumbList |
| /sla | Service Level Agreement | WebPage, FAQPage, BreadcrumbList |
| /security | Security at LumenQuery | WebPage, FAQPage, BreadcrumbList |
| /changelog | Changelog | WebPage, BreadcrumbList |
| /contact | Contact LumenQuery | WebPage, ContactPoint, BreadcrumbList |
| /enterprise | Enterprise Stellar API Infrastructure | WebPage, FAQPage, SoftwareApplication, BreadcrumbList |

### Files
```
portal/app/(cuba)/status/page.tsx
portal/app/(cuba)/sla/page.tsx
portal/app/(cuba)/security/page.tsx
portal/app/(cuba)/changelog/page.tsx
portal/app/(cuba)/contact/page.tsx
portal/app/(cuba)/enterprise/page.tsx
```

### Structured Data (JSON-LD)
| Schema Type | Where Applied |
|-------------|--------------|
| Organization | Root layout (all pages) |
| WebSite + SearchAction | Root layout (all pages) |
| Article | Blog posts |
| BreadcrumbList | Blog posts, landing pages, trust pages |
| FAQPage | Landing pages (/sla, /security, /enterprise + 8 SEO pages) |
| SoftwareApplication | 8 SEO landing pages + /enterprise |
| WebPage | All landing and trust pages |
| ContactPoint | /contact page |

### IndexNow Automation
```bash
# Submit single URL
node scripts/indexnow-submit.mjs https://lumenquery.io/stellar-horizon-api

# Submit multiple URLs
node scripts/indexnow-submit.mjs /status /sla /security

# Submit all sitemap URLs
node scripts/indexnow-submit.mjs --sitemap
```

## SEO & Performance Optimization

### Sitemap Configuration
All public pages included in `/sitemap.xml` (90 URLs total):

**Core Pages (4):**
- / (home) - priority 1.0
- /stellar - priority 0.9
- /query - priority 0.9
- /pricing - priority 0.9

**Documentation (5):**
- /docs (main) - priority 0.9
- /docs/analytics, /docs/intelligence, /docs/contracts, /docs/portfolio - priority 0.8

**Analytics (3):**
- /analytics - priority 0.8
- /analytics/network, /analytics/tokens - priority 0.7

**Services (1):**
- /contracts - priority 0.8

**SEO Landing Pages (8):**
- /stellar-horizon-api, /stellar-rpc-provider, /soroban-rpc-api - priority 0.9
- /stellar-blockchain-analytics-api, /stellar-transaction-monitoring - priority 0.9
- /xlm-whale-alerts, /stellar-api-rate-limits, /stellar-api-provider-comparison - priority 0.9

**Company/Trust Pages (6):**
- /status, /sla, /security, /changelog - priority 0.7
- /contact - priority 0.8
- /enterprise - priority 0.9

**Blog (64):**
- /blog (listing) - priority 0.8
- 63 individual blog posts with lastmod dates

Pages excluded (require auth or noindex):
- /auth/* (blocked by robots.txt)
- /dashboard/* (noindex)
- /compliance/* (noindex, requires auth)
- /intelligence/* (noindex, requires auth)
- /portfolio/* (noindex, requires auth)

### SEO Meta Tags (All Public Pages)
| Tag | Status |
|-----|--------|
| `<title>` | ✅ Present |
| `<meta name="description">` | ✅ Present |
| `<meta name="robots">` | ✅ index, follow |
| `<link rel="canonical">` | ✅ Self-referencing |
| `<meta property="og:*">` | ✅ OpenGraph tags |
| `<meta name="viewport">` | ✅ Mobile viewport |

### Blog Post Structured Data
All blog posts include JSON-LD Article schema:
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Post Title",
  "datePublished": "2026-02-07",
  "author": { "@type": "Organization", "name": "LumenQuery" },
  "publisher": { "@type": "Organization", "name": "LumenQuery" }
}
```

### Performance Metrics
| Metric | Value | Rating |
|--------|-------|--------|
| Time to First Byte | 225ms | ✅ Excellent |
| Total Load Time | 226ms | ✅ Excellent |
| HTML Size (gzipped) | 6.7KB | ✅ Excellent |
| Compression Ratio | 83% | ✅ Excellent |

### Performance Optimizations Applied
- ✅ Gzip compression (Traefik middleware)
- ✅ Static asset caching (1 year, immutable)
- ✅ HTTP/2 enabled
- ✅ Server-side rendering (Next.js)
- ✅ Code splitting (per-route JS chunks)
- ✅ Font preloading
- ✅ Async script loading

### Traefik Compression Config
```yaml
middlewares:
  compress:
    compress:
      excludedContentTypes:
        - image/png
        - image/jpeg
        - image/gif
        - image/webp
```

### Google Search Console Status (2026-07-03)
- **Sitemap submitted**: 2026-07-03T18:45:55Z (80 URLs)
- **Indexing requested**: All 84 URLs submitted via Indexing API (84/84 success)
- **Index status**: 1 indexed, 16 crawled-not-indexed, 67 unknown
- **Analytics (28d)**: 1 click, 12 impressions, 8.33% CTR, avg position 7.3
- **Bing**: URLs submitted via IndexNow API

### Google Search Console Management Script
```bash
cd /opt/lumenquery-portal
node scripts/google-search-console.mjs status        # Check index status
node scripts/google-search-console.mjs analytics      # Search analytics (28d)
node scripts/google-search-console.mjs submit-sitemap # Submit sitemap
node scripts/google-search-console.mjs index-all      # Request indexing for all URLs
node scripts/google-search-console.mjs inspect <url>  # Inspect specific URL
```

## Forgot Password / Account Recovery

### Overview
Secure password reset flow for account recovery. Users can request a password reset link via email and set a new password.

### Pages
| Route | Description | Status |
|-------|-------------|--------|
| /auth/forgot-password | Request password reset email | ✅ Deployed |
| /auth/reset-password | Set new password with token | ✅ Deployed |

### API Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| /api/auth/forgot-password | POST | Send password reset email |
| /api/auth/reset-password | GET | Validate reset token |
| /api/auth/reset-password | POST | Reset password with token |

### Database Model
```prisma
model PasswordResetToken {
  id        String   @id @default(cuid())
  email     String
  token     String   @unique
  expires   DateTime
  createdAt DateTime @default(now())
  used      Boolean  @default(false)
  @@index([email])
  @@index([token])
}
```

### Security Features
| Feature | Implementation |
|---------|----------------|
| Token Generation | crypto.randomBytes(32).toString('hex') |
| Token Expiration | 1 hour |
| Single Use | Token marked as used after password reset |
| Rate Limiting | 3 requests per email per hour |
| Email Enumeration | Same response for valid/invalid emails |
| Password Validation | 8+ chars, uppercase, lowercase, number |
| Session Invalidation | All sessions deleted after password change |

### Password Requirements
- Minimum 8 characters
- At least one uppercase letter (A-Z)
- At least one lowercase letter (a-z)
- At least one number (0-9)

### Files Created
```
portal/prisma/schema.prisma          # Added PasswordResetToken model
portal/app/api/auth/forgot-password/route.ts
portal/app/api/auth/reset-password/route.ts
portal/app/auth/forgot-password/page.tsx
portal/app/auth/reset-password/page.tsx
portal/app/auth/signin/page.tsx      # Updated with forgot password link
```

### Email Template
The password reset email includes:
- LumenQuery branding
- Personalized greeting (if user name available)
- Reset button with secure URL
- 1-hour expiry notice
- Plain-text URL fallback
- Security reminder (ignore if not requested)

## Compliance & AML Alerting Service

### Overview
Enterprise compliance monitoring and AML alerting for Stellar network. Designed for exchanges, custodians, and financial institutions requiring regulatory compliance.

### Pages
| Route | Description | Status |
|-------|-------------|--------|
| /compliance | Overview dashboard | ✅ Deployed |
| /compliance/accounts | Monitored accounts management | ✅ Deployed |
| /compliance/violations | Violations list with filters | ✅ Deployed |
| /compliance/violations/[id] | Violation detail and review | ✅ Deployed |
| /compliance/rules | Rules management | ✅ Deployed |
| /compliance/reports | Report generation | ✅ Deployed |
| /compliance/audit | Audit log viewer | ✅ Deployed |

### API Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| /api/compliance/status | GET | Compliance status overview |
| /api/compliance/accounts | GET, POST | List/add monitored accounts |
| /api/compliance/accounts/[id] | GET, PUT, DELETE | Account operations |
| /api/compliance/rules | GET, POST | List/create rules |
| /api/compliance/rules/[id] | GET, PUT, DELETE | Rule operations |
| /api/compliance/violations | GET | List violations with filters |
| /api/compliance/violations/[id] | GET, PUT | View/update violation |
| /api/compliance/reports | GET, POST | List/generate reports |
| /api/compliance/reports/[id] | GET, DELETE | Report operations |
| /api/compliance/reports/[id]/export | GET | Export CSV/JSON |
| /api/compliance/audit | GET | Audit log entries |

### Rule Types
| Type | Description | Tier |
|------|-------------|------|
| SANCTIONS_SCREENING | OFAC/UN sanctions list matching | Basic |
| VELOCITY_LIMIT | Transaction frequency limits | Basic |
| VOLUME_LIMIT | Transaction volume limits | Basic |
| CIRCULAR_PAYMENT | Detect circular payment patterns | Standard |
| MIXER_DETECTION | Known mixer service detection | Standard |
| UNUSUAL_PATTERN | Anomaly detection | Standard |
| COUNTERPARTY_RISK | Counterparty risk assessment | Standard |
| CONTRACT_ABUSE | Soroban contract abuse detection | Enterprise |
| STRUCTURING | Transaction structuring detection | Enterprise |
| DORMANT_ACTIVATION | Dormant account activation alerts | Enterprise |

### Violation Status Workflow
```
PENDING → UNDER_REVIEW → CLEARED
                      → CONFIRMED → ESCALATED → REPORTED
```

### Tier Feature Matrix
| Feature | BASIC ($49) | STANDARD ($149) | ENTERPRISE (Custom) |
|---------|-------------|-----------------|---------------------|
| Monitored Accounts | 100 | 1,000 | Unlimited |
| Rule Types | 3 (basic) | 7 (+ advanced) | 10 (all) |
| Report Retention | 30 days | 90 days | Unlimited |
| Audit Log | 30 days | 1 year | Unlimited |
| Real-time Alerts | Email only | Email + Slack | All channels |
| API Access | Limited | Full | Full + Webhooks |
| Custom Rules | No | No | Yes |
| Dedicated Support | No | Email | 24/7 Phone |

### Files Created
```
portal/lib/compliance/
├── types.ts
├── tiers.ts
├── gates.ts
├── audit.ts
├── rules-engine.ts
├── index.ts
└── evaluators/
    ├── index.ts
    ├── sanctions-evaluator.ts
    ├── velocity-evaluator.ts
    ├── volume-evaluator.ts
    ├── circular-payment-evaluator.ts
    ├── mixer-evaluator.ts
    ├── pattern-evaluator.ts
    ├── counterparty-evaluator.ts
    ├── contract-abuse-evaluator.ts
    └── structuring-evaluator.ts

portal/lib/jobs/
├── types.ts
├── queue.ts
├── scheduler.ts
├── index.ts
└── workers/
    ├── index.ts
    ├── account-scan-worker.ts
    ├── risk-assessment-worker.ts
    └── sanctions-sync-worker.ts

portal/lib/notifications/
├── index.ts
├── manager.ts
├── channels/
│   ├── email.ts
│   ├── slack.ts
│   └── webhook.ts
└── templates/
    └── violation-alert.ts

portal/app/api/compliance/
├── status/route.ts
├── accounts/route.ts
├── accounts/[accountId]/route.ts
├── rules/route.ts
├── rules/[ruleId]/route.ts
├── violations/route.ts
├── violations/[violationId]/route.ts
├── reports/route.ts
├── reports/[reportId]/route.ts
├── reports/[reportId]/export/route.ts
└── audit/route.ts

portal/app/compliance/
├── layout.tsx
├── page.tsx
├── accounts/page.tsx
├── violations/page.tsx
├── violations/[violationId]/page.tsx
├── rules/page.tsx
├── reports/page.tsx
└── audit/page.tsx

portal/components/compliance/
├── index.ts
├── ComplianceNav.tsx
├── ViolationTable.tsx
├── AccountTable.tsx
├── RuleCard.tsx
├── RuleForm.tsx
├── AuditLogTable.tsx
└── StatusCard.tsx

portal/lib/redis.ts
```

### Environment Variables
```
SMTP_HOST=smtp.example.com          # Email notifications
SMTP_PORT=587
SMTP_USER=user
SMTP_PASSWORD=password
SMTP_FROM=compliance@lumenquery.io
SLACK_WEBHOOK_URL=https://hooks.slack.com/...  # Slack notifications
```

### Deployment
The service is deployed and running. Access at:
- Dashboard: https://lumenquery.io/compliance
- API: https://lumenquery.io/api/compliance/*

## Soroban Pro

### Overview
Premium Soroban smart contract explorer for Web3 developers, startups, and auditors.

### Pages
| Route | Description | Status |
|-------|-------------|--------|
| /contracts | Explorer home with search | ✅ Built |
| /contracts/[id] | Contract overview | ✅ Built |
| /contracts/[id]/calls | Call history with filters | ✅ Built |
| /contracts/[id]/storage | Storage viewer | ✅ Built |
| /contracts/[id]/events | Event stream | ✅ Built |
| /contracts/[id]/analytics | Gas/error analytics | ✅ Built |
| /pricing | Pricing tiers | ✅ Built |

### API Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| /api/contracts/search | GET | Search by ID/name |
| /api/contracts/[id] | GET | Contract details |
| /api/contracts/[id]/calls | GET | Paginated call history |
| /api/contracts/[id]/storage | GET | Storage entries |
| /api/contracts/[id]/events | GET | Events list |
| /api/contracts/[id]/analytics | GET | Gas/error stats |
| /api/contracts/[id]/calls/[callId]/explain | POST | AI explanation |
| /api/contracts/[id]/events/stream | GET | SSE stream |
| /api/contracts/[id]/export | GET | CSV/JSON export |

### Tier Feature Matrix
| Feature | FREE | DEVELOPER ($25) | TEAM ($99) | AUDITOR | ENTERPRISE |
|---------|------|-----------------|------------|---------|------------|
| Contracts/month | 10 | 50 | Unlimited | Unlimited | Unlimited |
| Call history | 7 days | 30 days | 90 days | Full | Full |
| AI explanations | 0 | 50/mo | 500/mo | Unlimited | Unlimited |
| Export (CSV/JSON) | No | Yes | Yes | Yes | Yes |
| Real-time streaming | No | No | Yes | Yes | Yes |
| Version comparison | No | Yes | Yes | Yes | Yes |
| API access | No | Yes | Yes | Yes | Yes |

### Files Created
```
portal/lib/soroban/
├── types.ts
├── decoder.ts
├── formatter.ts
├── gates.ts
├── rpc-client.ts
└── index.ts

portal/app/api/contracts/
├── search/route.ts
└── [contractId]/
    ├── route.ts
    ├── calls/route.ts
    ├── calls/[callId]/explain/route.ts
    ├── storage/route.ts
    ├── events/route.ts
    ├── events/stream/route.ts
    ├── analytics/route.ts
    └── export/route.ts

portal/app/contracts/
├── page.tsx
├── layout.tsx
└── [contractId]/
    ├── page.tsx
    ├── layout.tsx
    ├── calls/page.tsx
    ├── storage/page.tsx
    ├── events/page.tsx
    └── analytics/page.tsx

portal/components/contracts/
├── ContractSearch.tsx
├── ContractCard.tsx
├── ContractNav.tsx
├── CallHistoryTable.tsx
├── StorageTable.tsx
├── EventStream.tsx
├── AIExplanation.tsx
├── ExportButton.tsx
└── index.ts

portal/app/pricing/
├── page.tsx
└── layout.tsx
```

### Environment Variables Required
```
ANTHROPIC_API_KEY=sk-ant-...    # For AI explanations
SOROBAN_RPC_URL=http://127.0.0.1:8001  # Already configured
```

### Deployment Steps
```bash
# 1. Add Anthropic API key to .env
echo "ANTHROPIC_API_KEY=sk-ant-..." >> /opt/lumenquery-portal/.env

# 2. Run database migration
cd /opt/lumenquery-portal/portal
npx prisma migrate dev --name add_soroban_pro

# 3. Rebuild and deploy
cd /opt/lumenquery-portal
docker compose build portal
docker compose up -d portal
```

## Transaction Intelligence Documentation

### Overview
Comprehensive documentation for the Transaction Intelligence premium feature, available at `/docs/intelligence`.

### Documentation Sections
| Section | Description |
|---------|-------------|
| Introduction | Feature overview and key capabilities |
| Dashboard | Statistics, quick actions, getting started |
| Subscription Tiers | Solo, Teams, Enterprise comparison table |
| Live Stream | Real-time transaction monitoring with 7 filter types |
| Accounts | Account profiling, classification types, behavior metrics |
| Watchlists | Account organization with tier-based limits |
| Alerts | 5 alert types, severity levels, notification channels |
| Trustlines | Trustline change monitoring and filters |
| Contracts | Soroban smart contract tracking |
| API Reference | Complete endpoint documentation |

### Alert Types Documented
- WHALE_MOVEMENT - Large XLM transfers
- TRUSTLINE_CHANGE - Trustline creation/removal
- ACCOUNT_ACTIVITY - Watchlist account operations
- CONTRACT_CALL - Soroban contract invocations
- ANOMALY_DETECTED - AI-powered anomaly detection (Premium)

### API Endpoints Documented
- Stream API (SSE real-time transactions)
- Accounts API (profile and classification)
- Watchlists API (CRUD operations)
- Alerts API (inbox and configurations)
- Trustlines API (change monitoring)

### Files
```
portal/app/docs/intelligence/page.tsx  # Main documentation page
portal/app/docs/page.tsx               # Updated with Intelligence link
```

## Stellar Network Analytics Documentation

### Overview
Comprehensive documentation for the Stellar Network Analytics feature, available at `/docs/analytics`.

### Documentation Sections
| Section | Description |
|---------|-------------|
| Introduction | Feature overview with public access badge |
| Dashboard | Key metrics and historical charts |
| Time Ranges | 24h, 7d, 30d with data points and cache TTL |
| Network Metrics | Ledgers, TPS, success rate, fees |
| Token Analytics | Velocity, whales, issuer risk |
| Smart Contracts | Soroban invocations, gas usage, events |
| Understanding Stroops | Conversion, examples, display formats |
| API Reference | Complete endpoint documentation |
| Data Sources | Horizon API, Soroban RPC, Redis cache |

### Stroops Documentation
- 1 XLM = 10,000,000 stroops (10^7)
- Conversion table with common examples
- JavaScript conversion formulas
- Display format rules by context:
  - Network fees: Always in stroops
  - Token volumes: Always in XLM
  - Contract gas: Smart display (stroops or XLM based on magnitude)

### API Endpoints Documented
- `/api/analytics/network` - Ledgers, transactions, fees
- `/api/analytics/tokens` - Velocity, whales, risk
- `/api/analytics/contracts` - Soroban activity, gas, events

### Files
```
portal/app/docs/analytics/page.tsx  # Main documentation page
portal/app/docs/page.tsx            # Updated with Analytics link
```

## Compliance & AML Documentation

### Overview
Comprehensive documentation for the Compliance & AML Alerting Service, available at `/docs/compliance`.

### Documentation Sections
| Section | Description |
|---------|-------------|
| Introduction | Feature overview and compliance dashboard |
| Dashboard | Key statistics, active rules, pending violations |
| Subscription Tiers | Basic, Standard, Enterprise comparison table |
| Accounts | Monitored accounts with monitoring levels |
| Rules | 10 rule types with parameters and conditions |
| Violations | Status workflow, severity levels, review process |
| Reports | Compliance report generation and export |
| Audit Log | Immutable audit trail with hash chain verification |
| How-to: Add Account | Step-by-step account onboarding guide |
| How-to: Create Rule | Rule configuration walkthrough |
| API Reference | Complete endpoint documentation |

### Monitoring Levels Documented
- BASIC - Standard transaction monitoring
- STANDARD - Enhanced with pattern analysis
- ENHANCED - Full monitoring with real-time alerts
- RESTRICTED - Maximum scrutiny for high-risk accounts

### Rule Types Documented
| Type | Description | Tier |
|------|-------------|------|
| SANCTIONS_SCREENING | OFAC/UN sanctions list matching | Basic |
| VELOCITY_LIMIT | Transaction frequency limits | Basic |
| VOLUME_LIMIT | Transaction volume limits | Basic |
| CIRCULAR_PAYMENT | Detect circular payment patterns | Standard |
| MIXER_DETECTION | Known mixer service detection | Standard |
| UNUSUAL_PATTERN | Anomaly detection | Standard |
| COUNTERPARTY_RISK | Counterparty risk assessment | Standard |
| CONTRACT_ABUSE | Soroban contract abuse detection | Enterprise |
| STRUCTURING | Transaction structuring detection | Enterprise |
| DORMANT_ACTIVATION | Dormant account activation alerts | Enterprise |

### Violation Status Workflow
```
PENDING → UNDER_REVIEW → CLEARED
                       → CONFIRMED → ESCALATED → REPORTED
```

### API Endpoints Documented
- `/api/compliance/status` - Compliance overview statistics
- `/api/compliance/accounts` - Monitored accounts management
- `/api/compliance/rules` - Rule CRUD operations
- `/api/compliance/violations` - Violations list and review
- `/api/compliance/reports` - Report generation and export
- `/api/compliance/audit` - Audit log access

### Files
```
portal/app/docs/compliance/page.tsx  # Main documentation page
portal/app/docs/page.tsx             # Updated with Compliance link
```

## Soroban Pro Documentation

### Overview
Comprehensive documentation for the Soroban Smart Contracts Explorer (Soroban Pro), available at `/docs/contracts`.

### Documentation Sections
| Section | Description |
|---------|-------------|
| Introduction | Feature overview with Soroban Pro badge |
| Dashboard | Contract search, recent contracts, analytics |
| Subscription Tiers | Free, Developer, Team, Auditor, Enterprise comparison |
| Decoded Calls | XDR decoding, call history, filtering options |
| Storage Viewer | Persistent/Temporary/Instance storage types |
| Event Stream | Real-time SSE streaming, event types, filtering |
| AI Explanations | Coming soon disclaimer, usage limits, caching |
| XDR Decoding | Supported XDR types and decoding process |
| Soroban Data Types | Address, i128, Symbol, Vec, Map, etc. |
| API Reference | Complete endpoint documentation |

### Feature Highlights Documented
- **Decoded Calls**: Human-readable function names, parameters, return values
- **Storage Viewer**: Browse contract state with type badges and TTL info
- **Event Stream**: Real-time monitoring with SSE (Team+ only)
- **AI Explanations**: Plain-English contract call analysis (Coming Soon)

### Storage Types Documented
| Type | Description |
|------|-------------|
| PERSISTENT | Long-term storage, requires rent payments |
| TEMPORARY | Short-lived, expires after set ledgers |
| INSTANCE | Contract-level configuration |

### API Endpoints Documented
- `/api/contracts/search` - Search by ID, name, or deployer
- `/api/contracts/[id]` - Contract details and statistics
- `/api/contracts/[id]/calls` - Decoded call history
- `/api/contracts/[id]/storage` - Storage entries by type
- `/api/contracts/[id]/events` - Historical event list
- `/api/contracts/[id]/events/stream` - Real-time SSE stream
- `/api/contracts/[id]/calls/[callId]/explain` - AI explanation (Coming Soon)
- `/api/contracts/[id]/export` - CSV/JSON export
- `/api/contracts/[id]/analytics` - Gas usage and error rates

### AI Explanations Status
**Coming Soon** - AI Explanations feature is currently in development and not yet enabled.
When available, it will provide:
- Basic explanations: Concise summary of contract calls
- Detailed analysis: Parameter breakdown, gas analysis, implications
- Security review: Potential risks and unusual patterns
- Comparison: Analyze multiple calls for patterns

### Files
```
portal/app/docs/contracts/page.tsx  # Main documentation page
portal/app/docs/page.tsx            # Updated with Contracts link
```

## Portfolio + Yield Intelligence

### Overview
Full portfolio and yield tracking app for Stellar power users, DAOs, funds, and DeFi participants. Solves the problem of fragmented and opaque Stellar portfolios.

### Target Customers
- Power users with multiple accounts
- DAOs managing treasury
- Investment funds tracking positions
- DeFi participants monitoring yield

### Pages
| Route | Description | Status |
|-------|-------------|--------|
| /portfolio | Portfolio list with tier info | ✅ Deployed |
| /portfolio/[id] | Portfolio dashboard | ✅ Deployed |
| /portfolio/[id]/accounts | Account management | ✅ Deployed |
| /portfolio/[id]/assets | Asset positions | Coming Soon |
| /portfolio/[id]/pnl | P&L analysis | Coming Soon |
| /portfolio/[id]/trustlines | Trustline risk | Coming Soon |
| /portfolio/[id]/contracts | Contract positions | Coming Soon |
| /portfolio/[id]/yield | Yield tracking | Coming Soon |
| /portfolio/[id]/history | Performance history | Coming Soon |

### API Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| /api/portfolio | GET, POST | List/create portfolios |
| /api/portfolio/[id] | GET, PUT, DELETE | Portfolio operations |
| /api/portfolio/[id]/accounts | GET, POST | Account management |
| /api/portfolio/[id]/sync | POST | Sync from Horizon |

### Tier Feature Matrix
| Feature | FREE | PRO ($10) | DAO ($50) |
|---------|------|-----------|-----------|
| Accounts | 1 | 10 | Unlimited |
| Portfolios | 1 | 5 | 100 |
| P&L Tracking | No | Yes | Yes |
| Yield Tracking | No | Yes | Yes |
| Contract Positions | No | Yes | Yes |
| Snapshot Retention | 7 days | 90 days | 365 days |
| Team Access | No | No | Yes |

### Database Models
| Model | Description |
|-------|-------------|
| Portfolio | Multi-account aggregation |
| PortfolioAccount | Linked Stellar accounts |
| AssetPosition | Holdings with cost basis |
| TradeRecord | For P&L calculation (FIFO) |
| ContractPosition | Soroban DeFi positions |
| YieldSource | Yield source configuration |
| YieldReward | Individual rewards earned |
| PerformanceSnapshot | Historical portfolio snapshots |
| TrustlineRisk | Risk assessment per trustline |

### Files Created
```
portal/lib/portfolio/
├── types.ts
├── gates.ts
├── horizon-client.ts
├── calculator.ts
├── risk-assessor.ts
└── index.ts

portal/app/api/portfolio/
├── route.ts
└── [portfolioId]/
    ├── route.ts
    ├── accounts/route.ts
    └── sync/route.ts

portal/app/portfolio/
├── layout.tsx
├── page.tsx
└── [portfolioId]/
    ├── page.tsx
    └── accounts/page.tsx

portal/components/portfolio/
├── PortfolioNav.tsx
├── PortfolioSummary.tsx
├── AssetTable.tsx
└── index.ts
```

### Powered by LumenQuery
**Horizon API:**
- Account balances
- Trade history
- Asset information
- Offers

**Soroban RPC:**
- Contract-based yield
- Staked positions
- Reward distributions

### Differentiator
Stellar-native + Soroban-aware. Most portfolio apps stop at balances.

## Portfolio Intelligence Documentation

### Overview
Comprehensive documentation for the Portfolio Intelligence feature, available at `/docs/portfolio`.

### Documentation Sections
| Section | Description |
|---------|-------------|
| Introduction | Feature overview and target users |
| Dashboard | Key metrics and dashboard sections |
| Subscription Tiers | FREE, PRO ($10/mo), DAO ($50/mo) comparison |
| Portfolios | Portfolio properties and management |
| Account Management | Linking Stellar accounts with labels |
| Asset Positions | Holdings with cost basis tracking |
| P&L Tracking | Unrealized/realized profit and loss |
| Trustline Risk | Risk factors and scoring methodology |
| Contract Positions | Soroban DeFi position types |
| Yield Tracking | Yield sources and metrics |
| Performance Snapshots | Historical data with retention tiers |
| How-to Guides | Create portfolio, add account, sync data |
| Cost Basis (FIFO) | First-In-First-Out calculation example |
| Risk Scoring | Score levels (0-100) and interpretation |
| API Reference | Complete endpoint documentation |

### Risk Factors Documented
| Factor | Risk Level | Description |
|--------|------------|-------------|
| Authorization Required | HIGH | Issuer can freeze/revoke assets |
| Clawback Enabled | HIGH | Issuer can claw back assets |
| Authorization Revocable | MEDIUM | Issuer can revoke authorization |
| Immutable Issuer | LOW | Safest - issuer cannot change flags |

### Yield Sources Documented
- STAKING - Validator staking rewards
- AMM_FEES - Trading fees from liquidity provision
- LENDING - Interest from lending protocols
- AIRDROP - Token airdrops and distributions
- OTHER - Other yield sources

### API Endpoints Documented
- `GET/POST /api/portfolio` - List/create portfolios
- `GET/PUT/DELETE /api/portfolio/{id}` - Portfolio operations
- `GET/POST /api/portfolio/{id}/accounts` - Account management
- `POST /api/portfolio/{id}/sync` - Sync portfolio data

### Files
```
portal/app/docs/portfolio/page.tsx  # Main documentation page
portal/app/docs/page.tsx            # Updated with Portfolio link
```

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

### Time Range Coverage
| Range | Data Points | Bucket Size | Cache TTL | Page Limit |
|-------|-------------|-------------|-----------|------------|
| 24h | 25 | Hourly | 30s | 100 pages |
| 7d | 43 | 4-hour | 5 min | 700 pages |
| 30d | 20* | Daily | 10 min | 1600 pages |

*30d shows ~19 days of data (limited by Horizon ledger history starting Jan 25, 2026)

### Data Sources
- Stellar Horizon API (ledgers, fee_stats)
- Redis cache (TTL varies by time range)

### Future Phases
- Phase 2: Token analytics (velocity, whale movements >100K XLM, issuer risk)
- Phase 3: Soroban contract analytics (call frequency, gas usage, events)

## Live Transaction Viewer

### Overview
Real-time transaction monitoring dashboard with decoded XDR operations. Accessible at `/dashboard/transactions`.

### Features
- **Real-time Streaming**: Transactions stream via SSE, updates every 5 seconds
- **Decoded Operations**: XDR translated to plain English descriptions
- **Expandable Details**: Click to see full transaction details and raw JSON
- **Controls**: Pause/resume streaming, clear transaction list
- **Dark Theme**: Comfortable for extended monitoring

### Supported Operation Types
| Operation | Example Description |
|-----------|---------------------|
| payment | Payment of 100 XLM from GAXJ...ABC to GBCD...XYZ |
| create_account | Create account GXYZ...123 with 10 XLM |
| path_payment_* | Path payment: 50 USDC → 100 XLM to GABC... |
| manage_sell_offer | Sell 500 XLM for USDC @ 0.12 |
| manage_buy_offer | Buy 100 USDC for XLM @ 8.5 |
| change_trust | Add trustline for USDC:GBBD... |
| set_options | Set options: home domain: example.com |
| account_merge | Merge account into GABC... |
| invoke_host_function | Invoke Soroban contract |
| And 15+ more... | |

### Files
```
portal/app/api/transactions/stream/route.ts  # SSE endpoint
portal/app/dashboard/transactions/page.tsx   # Viewer UI
```

### API Endpoint
| Endpoint | Method | Description |
|----------|--------|-------------|
| /api/transactions/stream | GET (SSE) | Stream decoded transactions |

### Route Configuration
The SSE endpoint requires dynamic rendering to prevent Next.js from attempting static generation during build:
```typescript
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
```

## Administrative Console

### Overview
Internal admin console for managing users, monitoring feature usage, tracking login activity, and performing admin tasks. Access restricted to users with ADMIN or SUPER_ADMIN role.

### Pages
| Route | Description | Status |
|-------|-------------|--------|
| /admin | Dashboard with overview stats | ✅ Deployed |
| /admin/users | User list with filtering | ✅ Deployed |
| /admin/users/[userId] | User detail and management | ✅ Deployed |
| /admin/usage | Usage analytics | ✅ Deployed |
| /admin/audit | Admin audit log | ✅ Deployed |

### API Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| /api/admin/users | GET | List users with pagination/filtering |
| /api/admin/users/[userId] | GET, PUT | User detail and update |
| /api/admin/users/[userId]/password | POST | Send password reset email |
| /api/admin/users/[userId]/sessions | GET, DELETE | Session info / force logout |
| /api/admin/usage | GET | Aggregated usage statistics |
| /api/admin/usage/[userId] | GET | Per-user feature usage |
| /api/admin/audit | GET | Admin audit log |

### User Roles
| Role | Permissions |
|------|-------------|
| USER | Standard user (cannot access admin) |
| ADMIN | View/manage users, reset passwords, view usage |
| SUPER_ADMIN | All ADMIN permissions + manage admin roles |

### Database Schema Additions
```prisma
enum UserRole {
  USER
  ADMIN
  SUPER_ADMIN
}

// Added to User model:
role              UserRole  @default(USER)
lastLoginAt       DateTime?
lastActiveAt      DateTime?
currentSessionStart DateTime?

model AdminAuditLog {
  id           String   @id @default(cuid())
  adminId      String
  action       String   // PASSWORD_RESET, USER_UPDATED, FORCE_LOGOUT, etc.
  targetUserId String?
  details      Json?
  ipAddress    String?
  userAgent    String?
  createdAt    DateTime @default(now())
}
```

### Features
- **User Management**: View all users, filter by role/tier/status, search by email/name
- **User Detail**: View subscription info, API keys, usage stats, session info
- **Session Tracking**: Last login, session duration, online status (active within 30 min)
- **Password Reset**: Send reset email to user (uses existing forgot password flow)
- **Force Logout**: Invalidate all user sessions
- **Role Management**: Super admin can change user roles
- **Audit Log**: All admin actions logged with IP, user agent, details

### Security
- Role-based access control on all admin endpoints
- Super admin required to modify admin roles
- Cannot remove the last super admin
- All actions logged to AdminAuditLog
- Password reset sends email (never displays password)

### Files Created
```
portal/lib/admin/
└── index.ts              # Admin guards, audit logging utilities

portal/app/api/admin/
├── users/route.ts        # User listing
├── users/[userId]/route.ts    # User detail/update
├── users/[userId]/password/route.ts  # Password reset
├── users/[userId]/sessions/route.ts  # Session management
├── usage/route.ts        # Usage statistics
├── usage/[userId]/route.ts    # Per-user usage
└── audit/route.ts        # Audit log

portal/app/admin/
├── layout.tsx            # Admin layout with role check
├── page.tsx              # Dashboard
├── users/page.tsx        # User list
├── users/[userId]/page.tsx  # User detail
├── usage/page.tsx        # Usage analytics
└── audit/page.tsx        # Audit log

portal/components/admin/
├── AdminNav.tsx          # Sidebar navigation
├── UserTable.tsx         # User list table
├── PasswordResetModal.tsx  # Password reset dialog
├── AuditLogTable.tsx     # Audit log table
└── index.ts
```

### Creating Admin Users
To create the first admin user:
```sql
UPDATE "User" SET role = 'SUPER_ADMIN' WHERE email = 'admin@example.com';
```

## Notes
- Before ending a session, ask Claude to update this file with current progress
- Monitoring server (mon1) is ready for stack deployment
- GitHub secrets need to be configured for automated deployments
