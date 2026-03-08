# Project Context

## Current Status
- Working on: UI layout improvements
- Last session: 2026-03-08
- Last validated: 2026-03-08 (intelligence pages duplicate sidebar fixed)
- All services: 12 containers running healthy
- Stellar Horizon: Fixed database connection (184.105.230.250)
- Transaction Viewer: Fixed with public Horizon API fallback
- Analytics API: Fixed with public Horizon fallback
- Live Transaction Viewer: Implementation complete, SSE route fix deployed
- Admin Console: Implementation complete, deployed, SUPER_ADMIN only access
- Blog Posts: 12 articles (4 new SEO-optimized posts added)
- Portfolio Intelligence: Implementation complete, deployed, documentation complete
- Soroban Pro: Implementation complete, deployed, documentation complete
- Contract Deployment: Implementation complete, Freighter wallet integration, WASM upload
- Compliance & AML: **REMOVED** (feature completely removed from codebase)
- Transaction Intelligence: Documentation complete
- Stellar Network Analytics: Documentation complete
- SEO Optimization: Complete, ready for Google indexing
- Performance: Gzip compression enabled, Core Web Vitals optimized
- Forgot Password: Implementation complete, deployed
- Analytics Charts: Fixed (24h only, removed 7d/30d due to performance)
- Analytics Performance: Optimized (1.5s uncached, 47ms cached, page loads in 0.6s)
- Authentication: NextAuth v5 migration complete, login working

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
| LumenQuery | PostgreSQL | lumenquery-postgres:5432 | ✅ Healthy (40 tables) |
| LumenQuery Cache | Redis | lumenquery-redis:6379 | ✅ Healthy |
| Horizon (remote) | PostgreSQL | 184.105.230.246:5432 | ❌ Unreachable (connection refused) |

**Note:** Local Horizon instance cannot reach its remote PostgreSQL database. Analytics API has been configured to fallback to public Stellar Horizon API (https://horizon.stellar.org).

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
| Intelligence Components | `/opt/lumenquery-portal/portal/components/intelligence/` | WatchlistTable, AlertTable, TrustlineMonitor |
| Intelligence Pages | `/opt/lumenquery-portal/portal/app/intelligence/` | Intelligence dashboard |
| Intelligence API | `/opt/lumenquery-portal/portal/app/api/intelligence/` | Watchlists, alerts, stream API |
| Intelligence Docs | `/opt/lumenquery-portal/portal/app/docs/intelligence/` | Transaction Intelligence documentation |
| Analytics Docs | `/opt/lumenquery-portal/portal/app/docs/analytics/` | Stellar Network Analytics documentation |
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
8. Fixed /analytics overview page time range switching:
   - Issue: Charts didn't update when selecting 7d or 30d time ranges
   - Root cause: Stale closure bug - fetchMetrics captured old timeRange value
   - Fix: Moved fetchMetrics inside useEffect and pass timeRange as parameter
   - Also set loading state on time range change for better UX
9. Improved AreaChart x-axis formatting:
   - 24h: Shows hours only (e.g., "2:00 PM")
   - 7d: Shows date and hour (e.g., "Feb 14, 12 AM")
   - 30d: Shows date only (e.g., "Feb 14")
   - Automatically detects data span to choose appropriate format
10. Enhanced transaction viewer with Soroban highlighting:
    - Soroban operations (invoke_host_function, etc.) now have white badge
    - Transactions with Soroban operations have highlighted border
11. Fixed contracts API error handling:
    - getEvents now handles errors gracefully for contracts without events
12. Committed and pushed all fixes to GitHub
13. Fixed analytics charts not re-rendering on 30d time range:
    - Issue: Charts weren't visually updating when switching to 7d or 30d
    - Root cause: SVG gradient ID conflicts and React not re-rendering charts
    - Fix: Added unique gradient IDs per chart using chartId prop
    - Fix: Added React key prop to force chart re-creation on timeRange change
    - Verified API returns correct data for all ranges:
      - 24h: 25 hourly data points
      - 7d: 43 four-hour data points
      - 30d: 23 daily data points
14. Committed and pushed chart re-rendering fix to GitHub
15. Removed 7d and 30d time range options from all analytics pages:
    - Issue: 7d and 30d API calls were slow (fetching 700-1600 pages of data)
    - Fix: Removed TimeRangeSelector from all pages, hardcoded to 24h only
    - Updated pages:
      - /analytics (overview)
      - /analytics/network
      - /analytics/tokens
      - /analytics/contracts
    - Result: All analytics pages now load quickly with 24h data only
16. Committed and pushed time range removal to GitHub
17. Removed Compliance & AML feature:
    - Deleted all compliance pages (/compliance/*)
    - Deleted all compliance API routes (/api/compliance/*)
    - Deleted compliance components (/components/compliance/)
    - Deleted compliance library (/lib/compliance/)
    - Deleted compliance docs (/app/docs/compliance/)
    - Deleted jobs system (/lib/jobs/) - was compliance-specific
    - Deleted notifications system (/lib/notifications/) - was compliance-specific
    - Created standalone email module (/lib/email.ts) for forgot-password
    - Added nodemailer package for email sending
    - Removed compliance links from Header, AdminNav, docs pages
    - Removed complianceEnabled/complianceTier from admin APIs
    - Updated pricing page metadata
    - Rebuilt and deployed portal
    - Verified compliance routes return 404
18. Committed and pushed compliance removal to GitHub
19. Verified site is working:
    - All 6 containers running healthy
    - All public routes returning 200: /, /analytics, /pricing, /docs, /blog, /contracts, /dashboard
    - Compliance routes correctly returning 404
    - Public HTTPS URLs verified working
20. Optimized analytics API response time:
    - Issue: Analytics page took ~8-11 seconds to load
    - Root cause: `fetchWithFallback()` tried local Horizon first, but portal container
      couldn't reach stellar-horizon (different Docker networks), causing timeout
    - Fix: Use public Horizon API directly for analytics endpoint
    - Changed `/portal/app/api/analytics/network/route.ts`:
      - Removed fetchWithFallback() function
      - Use public Horizon API (`https://horizon.stellar.org`) directly
      - Single request for 200 ledgers instead of pagination
    - Performance results:
      - Uncached API: 11s → 1.5s (86% faster)
      - Cached API: 47ms
      - Page load: ~8s → 0.6s (92% faster)
    - Rebuilt and deployed portal
21. Committed and pushed analytics optimization to GitHub
22. Added Soroban smart contract deployment feature:
    - Freighter wallet integration for transaction signing
    - WASM file upload with drag-and-drop support
    - File validation (256KB limit, magic bytes check)
    - Multi-step deployment wizard UI
    - API endpoints for simulate, submit, and status polling
    - Uses public Soroban RPC with fallback
    - Dependencies: @stellar/freighter-api, @stellar/stellar-sdk
    - New files:
      - lib/wallet/ (Freighter integration)
      - lib/soroban/deploy.ts (transaction building)
      - hooks/useFreighter.ts, useContractDeploy.ts
      - components/contracts/WalletConnect, WasmUploader, DeploymentWizard, DeploymentStatus
      - app/contracts/deploy/ (deployment page)
      - app/api/contracts/deploy/ (simulate, submit, status endpoints)
    - Added "Deploy Contract" button to /contracts page
    - Rebuilt and deployed portal
23. Committed and pushed contract deployment feature to GitHub
24. Updated contracts page layout to match dashboard:
    - Replaced hero section with custom header matching dashboard layout
    - Added LumenQuery logo (LQ) with page title "Smart Contract Explorer"
    - Added subtitle "Soroban Pro"
    - Moved deploy button to header
    - Added product navigation bar with links to Live Transactions, Contracts, Analytics, Intelligence, Portfolio, Docs, Admin
    - Reorganized content into card-based sections (search, features, recent contracts)
    - Uses same styling as dashboard (white cards, rounded-xl corners, consistent colors)
    - Rebuilt and deployed portal
25. Committed and pushed contracts page layout update to GitHub
26. Updated analytics page layout to match dashboard:
    - Replaced Header component and sidebar AnalyticsNav with custom header
    - Added LumenQuery logo (LQ) with page title "Stellar Network Analytics"
    - Added subtitle "Real-time blockchain metrics" and live indicator
    - Added product navigation bar (Live Transactions, Contracts, Analytics, etc.)
    - Converted sidebar navigation to inline tabs (Overview, Network, Tokens, Contracts)
    - Created new layout-client.tsx for client-side navigation
    - Removed Footer for cleaner look matching dashboard
    - Verified all sub-pages working (/analytics, /network, /tokens, /contracts)
    - Rebuilt and deployed portal
27. Committed and pushed analytics page layout update to GitHub
28. Changed Payment Activity chart to bar chart on /analytics/tokens:
    - Created new BarChart component at portal/components/analytics/BarChart.tsx
    - Uses Recharts BarChart with rounded top corners and hover highlight
    - Same tooltip styling and x-axis formatting as AreaChart
    - Updated tokens page to import and use BarChart instead of AreaChart
    - Rebuilt and deployed portal
29. Committed and pushed bar chart changes to GitHub
30. Updated Payment Activity bar chart to show last 5 minutes:
    - Filter chart data to only include payments from last 5 minutes
    - Changed interval from 30-second to 15-second buckets (~20 data points)
    - Increased pages fetched from 5 to 25 (5000 payments) for better coverage
    - Reduced cache TTL from 60s to 30s for more frequent updates
    - Rebuilt and deployed portal
31. Committed and pushed 5-minute chart changes to GitHub
32. Updated intelligence page layout to match dashboard:
    - Replaced Header component and sidebar with custom header
    - Added LumenQuery logo (LQ) with page title "Transaction Intelligence"
    - Added subtitle "Real-time monitoring & alerts" and live indicator
    - Added product navigation bar (Live Transactions, Contracts, Analytics, etc.)
    - Converted sidebar IntelligenceNav to inline tabs (Overview, Live Stream, Accounts, Watchlists, Alerts, Trustlines, Contracts)
    - Created new layout-client.tsx for client-side navigation
    - Removed sidebar from page.tsx
    - Rebuilt and deployed portal
33. Committed and pushed intelligence page layout update to GitHub
34. Updated portfolio page layout to match dashboard:
    - Replaced Header/Footer components with custom header
    - Added LumenQuery logo (LQ) with page title "Portfolio Intelligence"
    - Added subtitle "P&L, yield tracking & risk analysis"
    - Added product navigation bar (Live Transactions, Contracts, Analytics, etc.)
    - Added conditional sub-navigation for portfolio detail pages (All Portfolios / Portfolio Details)
    - Created new layout-client.tsx for client-side navigation
    - Reorganized page.tsx with tier info card at top and features grid
    - Rebuilt and deployed portal
35. Committed and pushed portfolio page layout update to GitHub
36. Updated docs page layout to match dashboard:
    - Replaced Header/Footer with custom header matching dashboard style
    - Added LumenQuery logo (LQ) with page title "API Documentation"
    - Added subtitle "Horizon API & Soroban RPC"
    - Added product navigation bar (Live Transactions, Contracts, etc.)
    - Added docs sub-navigation tabs (API Reference, Analytics, Intelligence, Contracts, Portfolio)
    - Created new layout-client.tsx for client-side navigation
    - Reorganized page.tsx into card-based sections:
      - Hero card with API endpoints overview
      - Authentication and Quick Start side-by-side
      - Horizon API endpoints grid
      - Soroban RPC methods grid
      - Rate limits tables (side-by-side)
      - SDK integration examples
      - Feature documentation link cards
    - Verified all docs sub-pages working (/docs, /docs/analytics, /docs/intelligence, /docs/contracts)
    - Rebuilt and deployed portal
37. Committed and pushed docs page layout update to GitHub
38. Fixed transaction viewer rate limiting issues:
    - Issue: Page showed "Error fetching transactions" after ~14 transactions loaded
    - Root cause: Making too many requests to Horizon API (11 requests per poll cycle)
    - Fix: Reduced transactions per batch from 10 to 5
    - Fix: Added 100ms delay between operations requests
    - Fix: Made operations fetch non-blocking (continue if individual fetch fails)
    - Fix: Only show error to client after 3 consecutive failures
    - Fix: Added exponential backoff on errors (up to 30s poll interval)
    - Fix: Handle 429 rate limit responses silently with backoff
    - Rebuilt and deployed portal
39. Committed and pushed transaction stream fix to GitHub
40. Updated pricing page layout to match dashboard:
    - Replaced Header/Footer with custom header matching dashboard style
    - Added LumenQuery logo (LQ) with page title "Pricing"
    - Added subtitle "Simple, transparent plans"
    - Added product navigation bar (Live Transactions, Contracts, etc.)
    - Created new layout-client.tsx for client-side navigation
    - Reorganized page.tsx into card-based sections:
      - Hero card with gradient background
      - Soroban Pro section with icon header and 4-column tier grid
      - Transaction Intelligence section with icon header and 3-column tier grid
      - FAQ section in 2-column grid
      - CTA section with action buttons
    - Rebuilt and deployed portal
41. Committed and pushed pricing page layout update to GitHub

### 2026-02-22
1. Fixed authentication/login not working:
   - Issue: Users unable to login at /auth/signin
   - Root cause: NextAuth v4 webpack bundling issue where CredentialsProvider
     authorize function was being stubbed out (`authorize: () => null`)
   - Solution: Upgraded from NextAuth v4 to NextAuth v5 beta
2. NextAuth v5 Migration:
   - Created new `portal/auth.ts` as central NextAuth v5 configuration
   - Updated `portal/app/api/auth/[...nextauth]/route.ts` to use v5 handlers
   - Replaced `@next-auth/prisma-adapter` with `@auth/prisma-adapter`
   - Updated 18+ API routes to use `auth()` instead of `getServerSession(authOptions)`
   - Added `trustHost: true` for production environment
3. Database discovery:
   - Found portal was connecting to `lumenquery_portal` database (not `lumenquery`)
   - Container uses Docker network with `postgres:5432` hostname
   - Updated admin password in correct database
4. Files changed:
   - portal/auth.ts (new): Central NextAuth v5 configuration
   - portal/app/api/auth/[...nextauth]/route.ts: Simplified handler
   - portal/lib/auth.ts: Re-exports from auth.ts
   - portal/lib/admin/index.ts: Updated auth imports
   - portal/app/admin/layout.tsx: Updated auth imports
   - 18+ API routes: Updated to use auth() instead of getServerSession
   - portal/package.json: Updated next-auth to v5 beta
5. Admin credentials updated:
   - Email: admin@lumenquery.io
   - Password: abc123abc123
   - Role: SUPER_ADMIN
6. Verified login working in browser
7. Committed and pushed to GitHub

### 2026-03-07
1. Updated website logo with new LumenQuery branding:
   - Replaced blue "LQ" text box with new logo image
   - Logo features magnifying glass with blockchain cube elements
   - Copied logo to `/opt/lumenquery-portal/portal/public/logo.png`
2. Updated 16 files to use new logo:
   - portal/components/Header.tsx - Main site header
   - portal/components/Footer.tsx - Site footer (both full and simple variants)
   - portal/app/analytics/layout-client.tsx
   - portal/app/portfolio/layout-client.tsx
   - portal/app/blog/layout-client.tsx
   - portal/app/docs/layout-client.tsx
   - portal/app/pricing/layout-client.tsx
   - portal/app/intelligence/layout-client.tsx
   - portal/app/dashboard/page.tsx
   - portal/app/dashboard/transactions/page.tsx
   - portal/app/contracts/page.tsx
   - portal/app/auth/signin/page.tsx
   - portal/app/auth/signup/page.tsx
   - portal/app/auth/forgot-password/page.tsx
   - portal/app/auth/reset-password/page.tsx
3. Used Next.js Image component for optimized logo loading
4. Rebuilt and deployed portal with new logo
5. Validated Analytics and Smart Contract Analytics pages:
   - /analytics page: ✅ Working with live data
   - /analytics/contracts page: ✅ Working with Soroban metrics
   - Network API returning: Ledger 61,547,528, TPS 104.2, Success 65.3%
   - Contracts API returning: 536 invocations (24h), 100% success rate
6. Committed and pushed logo update to GitHub
7. Fixed docs page layout:
   - Issue: Two menus at top of page
   - Fix: Kept main product navigation at top, moved docs sub-navigation to left sidebar
   - Updated docs/layout-client.tsx with flexbox layout (sidebar + main content)
8. Fixed intelligence page layout:
   - Issue: Two menus at top of page
   - Fix: Kept main product navigation at top, moved intelligence sub-navigation to left sidebar
   - Updated intelligence/layout-client.tsx with same sidebar pattern as docs
9. Restricted Admin Console to SUPER_ADMIN role only:
   - Previously: Both ADMIN and SUPER_ADMIN could access Admin Console
   - Now: Only SUPER_ADMIN role can see and access Admin Console
   - Updated 10 files:
     - admin/layout.tsx - Server-side role check
     - Header.tsx - Desktop and mobile navigation
     - dashboard/page.tsx - Product navigation
     - contracts/page.tsx - Product navigation
     - analytics/layout-client.tsx - Product navigation
     - portfolio/layout-client.tsx - Product navigation
     - blog/layout-client.tsx - Product navigation
     - pricing/layout-client.tsx - Product navigation
     - docs/layout-client.tsx - Product navigation
     - intelligence/layout-client.tsx - Product navigation
10. Rebuilt and deployed portal with all changes
11. Committed and pushed all changes to GitHub

### 2026-03-08
1. Changed analytics page navigation from top tabs to left sidebar:
   - Converted inline tab navigation to left sidebar menu
   - Sidebar shows Overview, Network, Tokens, Contracts links
   - Uses same sticky sidebar pattern as docs/intelligence pages
   - Active link highlighted with blue background
   - Updated analytics/layout-client.tsx with flexbox layout
2. Rebuilt and deployed portal with analytics sidebar change
3. Verified analytics page returns HTTP 200
4. Committed and pushed changes to GitHub
5. Fixed duplicate sidebar menus on 5 intelligence pages:
   - Issue: Pages had their own IntelligenceNav sidebar, but layout-client.tsx already provides it
   - Fixed pages:
     - /intelligence/accounts
     - /intelligence/watchlists
     - /intelligence/alerts
     - /intelligence/trustlines
     - /intelligence/contracts
   - Removed duplicate sidebar wrappers, keeping only page content
   - Each page now renders cleanly within the layout's main content area
6. Rebuilt and deployed portal with intelligence page fixes
7. Verified all 5 pages return HTTP 200
8. Committed and pushed intelligence page fixes to GitHub

## SEO & Performance Optimization

### Sitemap Configuration
All public pages included in `/sitemap.xml` (24 URLs total):

**Core Pages (2):**
- / (home) - priority 1.0
- /pricing - priority 0.9

**Documentation (6):**
- /docs (main) - priority 0.9
- /docs/analytics - priority 0.8
- /docs/intelligence - priority 0.8
- /docs/compliance - priority 0.8
- /docs/contracts - priority 0.8
- /docs/portfolio - priority 0.8

**Analytics (4):**
- /analytics - priority 0.8
- /analytics/network - priority 0.7
- /analytics/tokens - priority 0.7
- /analytics/contracts - priority 0.7

**Services (1):**
- /contracts - priority 0.8

**Blog (13):**
- /blog (listing) - priority 0.8
- 12 individual blog posts with lastmod dates

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

### Google Search Console Next Steps
1. Submit sitemap: https://lumenquery.io/sitemap.xml
2. Request indexing via URL Inspection tool
3. Monitor Core Web Vitals in GSC

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

**STATUS: REMOVED**

This feature was removed from the codebase on 2026-02-21. The Compliance & AML alerting service, including all pages, API routes, components, and library code, has been deleted.

Removed items:
- `/app/compliance/*` - All compliance pages
- `/app/api/compliance/*` - All compliance API routes
- `/app/docs/compliance/` - Compliance documentation
- `/components/compliance/*` - All compliance components
- `/lib/compliance/*` - Rules engine, evaluators, audit
- `/lib/jobs/*` - Background job queue (was compliance-specific)
- `/lib/notifications/*` - Notification system (was compliance-specific)

Database schema still contains compliance-related models but they are not used.

## Soroban Pro

### Overview
Premium Soroban smart contract explorer for Web3 developers, startups, and auditors.

### Pages
| Route | Description | Status |
|-------|-------------|--------|
| /contracts | Explorer home with search | ✅ Built |
| /contracts/deploy | Contract deployment wizard | ✅ Built |
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
| /api/contracts/deploy/simulate | POST | Simulate deployment transaction |
| /api/contracts/deploy/submit | POST | Submit signed transaction |
| /api/contracts/deploy/status/[txHash] | GET | Poll transaction status |
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
├── deploy.ts              # Contract deployment service
└── index.ts

portal/lib/wallet/
├── types.ts               # Wallet state types
├── freighter.ts           # Freighter API integration
└── index.ts

portal/hooks/
├── useFreighter.ts        # Wallet state hook
├── useContractDeploy.ts   # Deployment workflow hook
└── index.ts

portal/app/api/contracts/
├── search/route.ts
├── deploy/
│   ├── simulate/route.ts  # Simulate deployment tx
│   ├── submit/route.ts    # Submit signed tx
│   └── status/[txHash]/route.ts  # Poll tx status
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
├── deploy/
│   ├── page.tsx           # Deployment wizard page
│   └── layout.tsx
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
├── WalletConnect.tsx      # Freighter wallet connection
├── WasmUploader.tsx       # WASM file upload
├── DeploymentWizard.tsx   # Multi-step deployment UI
├── DeploymentStatus.tsx   # Progress and result display
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

## Contract Deployment Feature

### Overview
Deploy Soroban smart contracts to the Stellar network directly from the browser using Freighter wallet for authentication and transaction signing.

### How It Works
1. **Connect Wallet**: User connects their Freighter browser wallet
2. **Upload WASM**: User uploads compiled .wasm contract file (max 256KB)
3. **Simulate**: Transaction is simulated to estimate fees
4. **Sign Upload**: User signs transaction in Freighter to upload WASM
5. **Sign Create**: User signs second transaction to create contract instance
6. **Complete**: Contract ID is returned, linked to explorer

### Pages
| Route | Description |
|-------|-------------|
| /contracts | Explorer with "Deploy Contract" button |
| /contracts/deploy | Deployment wizard with multi-step UI |

### API Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| /api/contracts/deploy/simulate | POST | Simulate deployment transaction |
| /api/contracts/deploy/submit | POST | Submit signed transaction |
| /api/contracts/deploy/status/[txHash] | GET | Poll transaction status |

### Components
| Component | Description |
|-----------|-------------|
| WalletConnect | Freighter wallet connection button |
| WasmUploader | Drag-and-drop WASM file upload |
| DeploymentWizard | Multi-step deployment flow |
| DeploymentStatus | Progress indicator and results |

### Hooks
| Hook | Description |
|------|-------------|
| useFreighter | Wallet state management (connect, sign) |
| useContractDeploy | Deployment workflow (simulate, submit, poll) |

### Dependencies
```json
{
  "@stellar/freighter-api": "^3.1.0",
  "@stellar/stellar-sdk": "^12.3.0"
}
```

### Security Features
- All signing happens client-side in Freighter (no private keys stored)
- WASM validation (magic bytes check, 256KB size limit)
- Mainnet network enforcement
- Rate limiting on API endpoints

### WASM Validation
- Magic bytes: `\0asm` (0x00 0x61 0x73 0x6d)
- Maximum size: 256 KB
- File extension: `.wasm`

### RPC Configuration
Uses public Soroban RPC with fallback:
1. `https://mainnet.sorobanrpc.com` (primary)
2. `https://soroban-rpc.mainnet.stellar.gateway.fm`
3. Local RPC (fallback)

### Error Handling
| Error | User Message |
|-------|--------------|
| Freighter not installed | "Install Freighter wallet to deploy contracts" |
| Wrong network | "Switch to Stellar Mainnet in Freighter" |
| Invalid WASM | "Invalid WASM file format" |
| WASM too large | "File exceeds 256KB limit" |
| Insufficient balance | "Need X XLM for deployment fees" |
| User rejected | "Transaction cancelled" |
| Transaction failed | "Deployment failed: {error}" |

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

**STATUS: REMOVED**

This documentation has been removed along with the Compliance & AML feature on 2026-02-21. The `/docs/compliance` page no longer exists.

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
Internal admin console for managing users, monitoring feature usage, tracking login activity, and performing admin tasks. Access restricted to users with SUPER_ADMIN role only.

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

---

# Project Memory Summary

*Generated: 2026-03-08 | For future session context loading*

## Project Purpose

**LumenQuery** is a comprehensive Stellar blockchain analytics and developer platform. It provides:

1. **Horizon API Gateway** - Proxied access to Stellar Horizon with rate limiting, caching, and usage tracking
2. **Soroban RPC Gateway** - JSON-RPC proxy for Soroban smart contracts
3. **Analytics Dashboard** - Real-time Stellar network metrics (public, no auth required)
4. **Soroban Pro** - Smart contract explorer with decoded calls, storage viewer, event streaming
5. **Transaction Intelligence** - Real-time transaction monitoring, watchlists, alerts
6. **Portfolio Intelligence** - Multi-account aggregation, P&L tracking, yield monitoring
7. **Admin Console** - User management, usage analytics, audit logging (SUPER_ADMIN only)

**Target users**: Web3 developers, traders, validators, exchanges, custodians, DAOs, DeFi participants

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Internet                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Traefik (Reverse Proxy)                      │
│         - TLS termination (Let's Encrypt)                       │
│         - Rate limiting                                          │
│         - Gzip compression                                       │
│         - Routing: lumenquery.io, api.*, rpc.*                  │
└─────────────────────────────────────────────────────────────────┘
          │                    │                    │
          ▼                    ▼                    ▼
┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
│  Portal (3000)  │   │ API Gateway     │   │ RPC Gateway     │
│  Next.js 14     │   │ (8080)          │   │ (8082)          │
│  - App Router   │   │ - Horizon proxy │   │ - Soroban proxy │
│  - NextAuth v5  │   │ - Usage logging │   │ - Usage logging │
│  - Prisma ORM   │   │                 │   │                 │
└─────────────────┘   └─────────────────┘   └─────────────────┘
          │                    │                    │
          ▼                    ▼                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Data Layer                                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐ │
│  │ PostgreSQL  │  │    Redis    │  │  External APIs          │ │
│  │  (5432)     │  │   (6379)    │  │  - horizon.stellar.org  │ │
│  │  40 tables  │  │  - Cache    │  │  - Soroban RPC          │ │
│  │             │  │  - Sessions │  │                         │ │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### Docker Services (12 containers)
| Service | Container | Purpose |
|---------|-----------|---------|
| traefik | lumenquery-traefik | Reverse proxy, TLS, routing |
| portal | lumenquery-portal | Next.js web application |
| api-gateway | lumenquery-api-gateway | Horizon API proxy |
| rpc-gateway | lumenquery-rpc-gateway | Soroban RPC proxy |
| postgres | lumenquery-postgres | Primary database |
| redis | lumenquery-redis | Cache and sessions |
| stellar-horizon | stellar-horizon | Local Horizon (uses remote DB) |
| soroban-rpc | soroban-rpc | Local Soroban RPC |
| node-exporter | node-exporter | System metrics |
| cadvisor | cadvisor | Container metrics |
| postgres-exporter | postgres-exporter | DB metrics |
| redis-exporter | redis-exporter | Cache metrics |

## Key Directories

```
/opt/lumenquery-portal/
├── portal/                      # Next.js application
│   ├── app/                     # App Router pages and API routes
│   │   ├── api/                 # API endpoints
│   │   │   ├── admin/           # Admin APIs (SUPER_ADMIN)
│   │   │   ├── analytics/       # Network analytics
│   │   │   ├── auth/            # NextAuth endpoints
│   │   │   ├── contracts/       # Soroban Pro APIs
│   │   │   ├── intelligence/    # Transaction intelligence
│   │   │   ├── portfolio/       # Portfolio APIs
│   │   │   └── transactions/    # Live transaction stream (SSE)
│   │   ├── admin/               # Admin Console pages
│   │   ├── analytics/           # Analytics dashboard
│   │   ├── contracts/           # Contract explorer
│   │   ├── dashboard/           # User dashboard
│   │   ├── docs/                # API documentation
│   │   ├── intelligence/        # Intelligence dashboard
│   │   └── portfolio/           # Portfolio pages
│   ├── components/              # React components
│   │   ├── Header.tsx           # Main navigation
│   │   ├── Footer.tsx           # Site footer
│   │   ├── admin/               # Admin components
│   │   ├── analytics/           # Charts, metrics
│   │   ├── contracts/           # Contract explorer UI
│   │   ├── intelligence/        # Intelligence UI
│   │   └── portfolio/           # Portfolio UI
│   ├── lib/                     # Utility libraries
│   │   ├── admin/               # Admin guards, audit
│   │   ├── intelligence/        # Account profiling
│   │   ├── portfolio/           # P&L, risk assessment
│   │   ├── soroban/             # XDR decoding, RPC client
│   │   ├── wallet/              # Freighter integration
│   │   ├── prisma.ts            # DB client
│   │   ├── redis.ts             # Cache client
│   │   └── rate-limit.ts        # Rate limiting
│   ├── hooks/                   # React hooks
│   ├── prisma/                  # Database schema
│   └── public/                  # Static assets
├── api-gateway/                 # Horizon proxy service
├── rpc-gateway/                 # Soroban RPC proxy
├── traefik/                     # Traefik configuration
│   └── dynamic.yml              # Routes and middleware
├── monitoring/                  # Prometheus/Grafana
├── docker-compose.yml           # Main orchestration
├── .env                         # Environment secrets
└── CLAUDE.md                    # This documentation
```

## Important Scripts

### Development
```bash
cd /opt/lumenquery-portal/portal
npm run dev                      # Start dev server (port 3000)
npm run lint                     # Run ESLint
npm run build                    # Build for production
```

### Database
```bash
cd /opt/lumenquery-portal/portal
npx prisma db push               # Sync schema (no migration)
npx prisma migrate dev           # Create migration
npx prisma studio                # Database GUI
npx prisma generate              # Generate client
```

### Docker Operations
```bash
cd /opt/lumenquery-portal
docker compose build portal      # Build portal image
docker compose up -d portal      # Deploy portal
docker compose logs -f portal    # View logs
docker compose ps                # Check status
```

### Deployment (Full)
```bash
cd /opt/lumenquery-portal
docker compose build portal && docker compose up -d portal
```

### Git Operations
```bash
cd /opt/lumenquery-portal
git status                       # Check changes
git add <files>                  # Stage changes
git commit -m "message"          # Commit
git push                         # Push to GitHub
```

## Deployment Process

1. **Make changes** to code in `/opt/lumenquery-portal/portal/`

2. **Build Docker image**:
   ```bash
   cd /opt/lumenquery-portal
   docker compose build portal
   ```

3. **Deploy**:
   ```bash
   docker compose up -d portal
   ```

4. **Verify**:
   ```bash
   curl -s -o /dev/null -w "%{http_code}" https://lumenquery.io
   # Should return 200
   ```

5. **Commit and push**:
   ```bash
   git add <files>
   git commit -m "Description of changes"
   git push
   ```

### Environment Variables (in .env)
| Variable | Purpose |
|----------|---------|
| DATABASE_URL | PostgreSQL connection string |
| REDIS_URL | Redis connection string |
| NEXTAUTH_URL | Public URL (https://lumenquery.io) |
| NEXTAUTH_SECRET | Session encryption key |
| DOMAIN | Primary domain |
| ACME_EMAIL | Let's Encrypt email |
| STRIPE_* | Payment processing |
| ANTHROPIC_API_KEY | AI explanations (coming soon) |

## Coding Conventions

### File Structure
- **Pages**: `/app/[route]/page.tsx` (server component by default)
- **Layouts**: `/app/[route]/layout.tsx` or `layout-client.tsx` (for client-side nav)
- **API Routes**: `/app/api/[endpoint]/route.ts`
- **Components**: `/components/[feature]/ComponentName.tsx`
- **Libraries**: `/lib/[feature]/index.ts`

### Naming
- Components: PascalCase (`ContractCard.tsx`)
- Utilities: camelCase (`formatAddress.ts`)
- API routes: kebab-case directories (`/api/forgot-password/`)

### Patterns
- **Authentication**: Use `auth()` from `/auth.ts` (NextAuth v5)
- **Database**: Import `prisma` from `/lib/prisma`
- **Cache**: Import `redis` from `/lib/redis`
- **Role checks**: `(session.user as any)?.role === 'SUPER_ADMIN'`

### UI Conventions
- **Colors**: Primary blue `#2855FF`, Gray text `#6A6A6A`, Border `#E6E7E9`
- **Layout**: `max-w-6xl mx-auto px-4 sm:px-6` for content width
- **Cards**: `rounded-xl bg-white border border-[#E6E7E9] p-4 sm:p-6`
- **Responsive**: Mobile-first with `sm:`, `md:`, `lg:` breakpoints

### Navigation Pattern
Each major section has a `layout-client.tsx` with:
1. Header with logo and page title
2. Product navigation bar (Live Transactions, Contracts, Analytics, etc.)
3. Admin link visible only to SUPER_ADMIN users
4. Section-specific sub-navigation (tabs or sidebar)

## Open Problems

### Infrastructure
1. **Local Horizon database unreachable** - PostgreSQL at 184.105.230.246:5432 refuses connections
   - **Workaround**: Analytics/transactions use public Horizon API (horizon.stellar.org)
   
2. **Monitoring stack not deployed** - Prometheus/Grafana configured but not running on mon1
   - Files ready in `/monitoring/`, needs deployment to mon1.lumenquery.io

3. **GitHub Secrets not configured** - CI/CD deployment not automated
   - Need to add: DEPLOY_HOST, DEPLOY_USER, DEPLOY_SSH_KEY

### Features
4. **AI Explanations** - Soroban Pro feature not implemented
   - Requires ANTHROPIC_API_KEY
   - UI shows "Coming Soon"

5. **Compliance feature removed** - Was removed 2026-02-21
   - Database schema still has compliance tables (unused)
   - Consider cleaning up schema in future migration

6. **Analytics 7d/30d removed** - Performance issue (too many API calls)
   - Only 24h time range available
   - Would need background job to pre-aggregate data

### Technical Debt
7. **Type casting for user role** - Uses `(session.user as any)?.role`
   - Should extend NextAuth types properly

8. **Build warnings** - Stellar SDK has require() warnings
   - Non-blocking but appears in build logs

9. **Unused enums** - ADMIN role exists but Admin Console is SUPER_ADMIN only
   - May want to remove ADMIN role or give it limited access

### Data
10. **No database backups** - PostgreSQL not backed up
    - Should configure pg_dump cron job or managed backup

11. **No SSL monitoring** - Let's Encrypt certificates not monitored
    - Should add certificate expiry alerts

## Quick Reference

### Check Service Status
```bash
docker ps --format "table {{.Names}}\t{{.Status}}"
```

### View Logs
```bash
docker compose logs -f portal --tail 100
```

### Database Access
```bash
docker exec -it lumenquery-postgres psql -U lumenquery -d lumenquery_portal
```

### Redis Access
```bash
docker exec -it lumenquery-redis redis-cli
```

### Common Issues

**Portal won't start**: Check logs, usually DATABASE_URL or REDIS_URL issue
```bash
docker compose logs portal --tail 50
```

**API returns 500**: Usually Horizon API unreachable, check fallback is working
```bash
curl https://horizon.stellar.org/ledgers?limit=1
```

**Build fails**: Usually TypeScript error, check build output
```bash
docker compose build portal 2>&1 | tail -100
```

