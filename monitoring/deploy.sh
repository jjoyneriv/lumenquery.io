#!/bin/bash
# ===========================================
# LumenQuery Monitoring Deployment Script
# ===========================================
# Run this script on mon1.lumenquery.io

set -e

echo "=== LumenQuery Monitoring Deployment ==="

# Check if running as appropriate user
if [ "$EUID" -eq 0 ]; then
    echo "Warning: Running as root. Consider using a non-root user with docker access."
fi

# Create directory structure
INSTALL_DIR="${INSTALL_DIR:-/opt/lumenquery-monitoring}"
echo "Installing to: $INSTALL_DIR"

mkdir -p "$INSTALL_DIR"
cd "$INSTALL_DIR"

# Copy files if not already present
if [ ! -f "docker-compose.yml" ]; then
    echo "Copying configuration files..."
    # These should be copied from the repo or downloaded
    echo "Please copy the monitoring directory contents to $INSTALL_DIR"
    exit 1
fi

# Create .env file if not exists
if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cat > .env << 'EOF'
# Grafana credentials (CHANGE THESE!)
GRAFANA_ADMIN_USER=admin
GRAFANA_ADMIN_PASSWORD=your-secure-password-here

# Let's Encrypt email
ACME_EMAIL=admin@lumenquery.io

# API server address
API_SERVER=api1.lumenquery.io
EOF
    echo "Created .env file - please edit with your settings!"
    echo "Then run this script again."
    exit 0
fi

# Pull images
echo "Pulling Docker images..."
docker compose pull

# Start services
echo "Starting monitoring stack..."
docker compose up -d

# Wait for services to start
echo "Waiting for services to start..."
sleep 10

# Check status
echo ""
echo "=== Service Status ==="
docker compose ps

echo ""
echo "=== Deployment Complete ==="
echo ""
echo "Grafana URL: https://monitoring.lumenquery.io"
echo "Prometheus: http://localhost:9090 (internal only)"
echo ""
echo "Default Grafana credentials:"
echo "  Username: admin"
echo "  Password: (check your .env file)"
echo ""
echo "Next steps:"
echo "1. Update DNS: Point monitoring.lumenquery.io to this server"
echo "2. Deploy exporters on api1.lumenquery.io"
echo "3. Configure firewall to allow mon1 -> api1 on ports 9100, 9080, 9121, 9187, 8082"
echo "4. Change the default Grafana password"
