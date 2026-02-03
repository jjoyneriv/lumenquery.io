# LumenQuery Monitoring Stack

Prometheus + Grafana monitoring for LumenQuery infrastructure.

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     mon1.lumenquery.io                          │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │  Prometheus │───▶│   Grafana   │◀───│   Traefik   │◀── HTTPS│
│  │    :9090    │    │    :3000    │    │   :80/443   │         │
│  └──────┬──────┘    └─────────────┘    └─────────────┘         │
│         │                                                       │
│         │ Scrapes metrics                                       │
└─────────┼───────────────────────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────────────────────────────────┐
│                     api1.lumenquery.io                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ node-exporter│  │   cAdvisor   │  │postgres-export│         │
│  │    :9100     │  │    :9080     │  │    :9187     │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │redis-exporter│  │  RPC Gateway │  │    Portal    │          │
│  │    :9121     │  │ :8082/metrics│  │/api/metrics  │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
```

## Deployment

### Step 1: Deploy Exporters on api1.lumenquery.io

```bash
# On api1.lumenquery.io
cd /opt/lumenquery-portal/monitoring
docker compose -f exporters-docker-compose.yml up -d
```

### Step 2: Configure Firewall on api1

Allow mon1.lumenquery.io to access exporter ports:

```bash
# Replace MON1_IP with the actual IP of mon1.lumenquery.io
sudo ufw allow from MON1_IP to any port 9100  # node-exporter
sudo ufw allow from MON1_IP to any port 9080  # cAdvisor
sudo ufw allow from MON1_IP to any port 9121  # redis-exporter
sudo ufw allow from MON1_IP to any port 9187  # postgres-exporter
sudo ufw allow from MON1_IP to any port 8082  # rpc-gateway metrics
```

### Step 3: Deploy Monitoring Stack on mon1.lumenquery.io

```bash
# Copy monitoring directory to mon1
scp -r /opt/lumenquery-portal/monitoring user@mon1.lumenquery.io:/opt/

# SSH to mon1
ssh user@mon1.lumenquery.io

# Deploy
cd /opt/monitoring
cp .env.example .env
# Edit .env with your settings
nano .env

# Start services
docker compose up -d
```

### Step 4: Configure DNS

Point `monitoring.lumenquery.io` to mon1's IP address.

## Configuration

### Environment Variables (.env)

```bash
GRAFANA_ADMIN_USER=admin
GRAFANA_ADMIN_PASSWORD=your-secure-password
ACME_EMAIL=admin@lumenquery.io
```

### Prometheus Targets

Edit `prometheus/prometheus.yml` to update target IPs if needed.

## Accessing Services

| Service | URL | Access |
|---------|-----|--------|
| Grafana | https://monitoring.lumenquery.io | Public (auth required) |
| Prometheus | http://localhost:9090 | Internal only |

## Dashboards

Pre-configured dashboards:
- **LumenQuery Overview**: Service health, request rates, latency, system resources

## Alerts

Configured alerts in `prometheus/alerts.yml`:
- Service down (1 min)
- High error rate (>5%)
- High latency (p95 >2s)
- High memory usage (>90%)
- High CPU usage (>80%)
- Low disk space (<10%)
- Database/Redis down

## Maintenance

### View Logs
```bash
docker compose logs -f prometheus
docker compose logs -f grafana
```

### Restart Services
```bash
docker compose restart
```

### Update Images
```bash
docker compose pull
docker compose up -d
```

### Backup Grafana
```bash
docker compose exec grafana grafana-cli admin export-dashboard --overwrite
# Or backup the volume
docker run --rm -v monitoring_grafana-data:/data -v $(pwd):/backup alpine tar czf /backup/grafana-backup.tar.gz /data
```
