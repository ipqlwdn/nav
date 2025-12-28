#!/bin/bash

# VPS Deployment Script
# Purpose: Auto-sync deployment (Deployment Sync Only)

set -e

echo "======================================"
echo "LaoWang Nav Auto-Deploy (API Sync Removed)"
echo "======================================"
echo ""

# Color definitions
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Config variables
PROJECT_DIR="/opt/laowang-nav"
LOG_FILE="/var/log/nav-deploy.log"

# Check root
if [ "" -ne 0 ]; then 
    echo -e "Note: Some operations may require sudo"
fi

# Step 1: Check Directory
echo -e "[1/3] Checking project directory..."
if [ ! -d "" ]; then
    echo -e "Error: Directory not found: "
    echo "Please clone the repository first."
    exit 1
fi
cd ""
echo " Dir: "

# Step 2: Check Docker
echo -e "[2/3] Checking Docker environment..."
if ! command -v docker &> /dev/null; then
    echo -e "Error: Docker not installed"
    exit 1
fi
echo " Docker installed"

# Step 3: Start Containers (Watchtower included)
echo -e "[3/3] Starting containers..."
echo "Restarting containers..."
docker-compose down
docker-compose up -d

echo ""
echo -e "======================================"
echo "Deployment Complete!"
echo "======================================"
echo ""
echo "Config Info:"
echo "  - Directory: "
echo "  - Auto-Update: Enabled via Watchtower"
echo "  - Check Interval: Every 5 minutes (default)"
echo "  - Data Protection: Local conf.yml mounted"
echo ""
echo -e " Deployment Sync Enabled!"