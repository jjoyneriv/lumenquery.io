# Project Context

## Current Status
- Working on: SEO & Performance Optimization
- Last session: 2026-02-12
- Last validated: 2026-02-12
- Soroban Pro: Implementation complete, deployed
- Compliance & AML: Implementation complete, deployed
- SEO Optimization: Complete, ready for Google indexing
- Performance: Gzip compression enabled, Core Web Vitals optimized

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
| Compliance Components | `/opt/lumenquery-portal/portal/components/compliance/` | ViolationTable, RuleCard, StatusCard |
| Compliance Pages | `/opt/lumenquery-portal/portal/app/compliance/` | Compliance dashboard |
| Compliance API | `/opt/lumenquery-portal/portal/app/api/compliance/` | Rules, violations, reports API |
| Compliance Lib | `/opt/lumenquery-portal/portal/lib/compliance/` | Rules engine, evaluators, audit |
| Intelligence Components | `/opt/lumenquery-portal/portal/components/intelligence/` | WatchlistTable, AlertTable, TrustlineMonitor |
| Intelligence Pages | `/opt/lumenquery-portal/portal/app/intelligence/` | Intelligence dashboard |
| Intelligence API | `/opt/lumenquery-portal/portal/app/api/intelligence/` | Watchlists, alerts, stream API |
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
15. Add Soroban Pro - Smart Contract Explorer
16. Add Stellar Compliance & AML Alerting Service
17. Update CLAUDE.md with Compliance & AML service documentation
18. Fix SEO issues for Google indexing
19. Enable gzip compression in Traefik for performance

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
- [x] Soroban Pro - Smart Contract Explorer
- [x] Compliance & AML Alerting Service
- [x] SEO optimization (sitemap, canonical URLs, meta tags, JSON-LD)
- [x] Performance optimization (gzip compression, 83% size reduction)

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

## SEO & Performance Optimization

### Sitemap Configuration
All public pages included in `/sitemap.xml`:
- Static pages: /, /docs, /blog, /pricing, /contracts
- Analytics pages: /analytics, /analytics/network, /analytics/tokens, /analytics/contracts
- Blog posts: All 8 articles with individual lastmod dates

Pages excluded (require auth or noindex):
- /auth/* (blocked by robots.txt)
- /dashboard/* (noindex)
- /compliance/* (noindex, requires auth)
- /intelligence/* (noindex, requires auth)

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

### Google Search Console Next Steps
1. Submit sitemap: https://lumenquery.io/sitemap.xml
2. Request indexing via URL Inspection tool
3. Monitor Core Web Vitals in GSC

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

### Future Phases
- Phase 2: Token analytics (velocity, whale movements >100K XLM, issuer risk)
- Phase 3: Soroban contract analytics (call frequency, gas usage, events)

## Notes
- Before ending a session, ask Claude to update this file with current progress
- Monitoring server (mon1) is ready for stack deployment
- GitHub secrets need to be configured for automated deployments
