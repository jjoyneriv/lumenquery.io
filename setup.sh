#!/bin/bash

# ===========================================
# LumenQuery Portal - Setup & Deployment Script
# ===========================================

set -e

echo "🚀 LumenQuery Portal Setup"
echo "=========================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check prerequisites
check_prereqs() {
    echo -e "\n${YELLOW}Checking prerequisites...${NC}"
    
    if ! command -v docker &> /dev/null; then
        echo -e "${RED}Error: Docker is not installed${NC}"
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
        echo -e "${RED}Error: Docker Compose is not installed${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✓ All prerequisites met${NC}"
}

# Setup environment
setup_env() {
    echo -e "\n${YELLOW}Setting up environment...${NC}"
    
    if [ ! -f .env ]; then
        cp .env.example .env
        
        # Generate secrets
        NEXTAUTH_SECRET=$(openssl rand -base64 32)
        POSTGRES_PASSWORD=$(openssl rand -base64 24 | tr -d '/+=')
        
        # Update .env with generated values
        sed -i "s/CHANGE_ME_GENERATE_WITH_OPENSSL/$NEXTAUTH_SECRET/" .env
        sed -i "s/CHANGE_ME_SECURE_PASSWORD_HERE/$POSTGRES_PASSWORD/" .env
        
        echo -e "${GREEN}✓ Created .env file with generated secrets${NC}"
        echo -e "${YELLOW}⚠ Remember to update Stripe keys in .env!${NC}"
    else
        echo -e "${GREEN}✓ .env file already exists${NC}"
    fi
}

# Copy Prisma schema to API Gateway (they share it)
sync_prisma() {
    echo -e "\n${YELLOW}Syncing Prisma schema...${NC}"
    mkdir -p api-gateway/prisma
    cp portal/prisma/schema.prisma api-gateway/prisma/
    echo -e "${GREEN}✓ Prisma schema synced${NC}"
}

# Build and start services
deploy() {
    echo -e "\n${YELLOW}Building and deploying services...${NC}"
    
    # Use docker compose (v2) or docker-compose (v1)
    if docker compose version &> /dev/null; then
        COMPOSE_CMD="docker compose"
    else
        COMPOSE_CMD="docker-compose"
    fi
    
    # Build images
    $COMPOSE_CMD build
    
    # Start services
    $COMPOSE_CMD up -d
    
    echo -e "${GREEN}✓ Services deployed${NC}"
}

# Run database migrations
migrate() {
    echo -e "\n${YELLOW}Running database migrations...${NC}"
    
    # Wait for postgres to be ready
    echo "Waiting for PostgreSQL..."
    sleep 10
    
    # Run migrations via the portal container
    docker exec lumenquery-portal npx prisma db push
    
    echo -e "${GREEN}✓ Migrations complete${NC}"
}

# Show status
status() {
    echo -e "\n${YELLOW}Service Status:${NC}"
    docker ps --filter "name=lumenquery" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
}

# Show URLs
show_urls() {
    source .env
    
    echo -e "\n${GREEN}=== Deployment Complete ===${NC}"
    echo ""
    echo "Your services are available at:"
    echo "  • Portal:     https://$DOMAIN"
    echo "  • API:        https://api.$DOMAIN"
    echo "  • Traefik:    https://traefik.$DOMAIN (admin dashboard)"
    echo ""
    echo "Next steps:"
    echo "  1. Update Stripe keys in .env"
    echo "  2. Configure DNS records pointing to this server"
    echo "  3. Create your first user account at https://$DOMAIN/auth/signup"
    echo ""
}

# Main
main() {
    check_prereqs
    setup_env
    sync_prisma
    deploy
    migrate
    status
    show_urls
}

# Handle arguments
case "${1:-deploy}" in
    deploy)
        main
        ;;
    status)
        status
        ;;
    logs)
        docker logs -f lumenquery-${2:-portal}
        ;;
    restart)
        docker compose restart
        status
        ;;
    down)
        docker compose down
        ;;
    *)
        echo "Usage: $0 {deploy|status|logs [service]|restart|down}"
        exit 1
        ;;
esac
