#!/bin/bash

# Local CI verification script
# Runs all CI checks inside a Docker container to mirror GitHub Actions

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

echo ""
echo "╔══════════════════════════════════════════════════════════╗"
echo "║           Local CI Verification (Containerized)          ║"
echo "║           Mirrors GitHub Actions workflow                ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

# Remove existing CI container if it exists
docker rm -f tylerscallan-dot-com-ci 2>/dev/null || true

# Run CI in a Node 20 container (same as GitHub Actions)
docker run --rm \
    --name tylerscallan-dot-com-ci \
    -v "$PROJECT_DIR":/app \
    -w /app \
    node:20-slim \
    bash -c '
set -e

# Colors for output
RED="\033[0;31m"
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
NC="\033[0m"

print_step() {
    echo -e "\n${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${YELLOW}▶ $1${NC}"
    echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

START_TIME=$(date +%s)

# Install dependencies
print_step "Installing dependencies (npm ci)"
npm ci --ignore-scripts
print_success "Dependencies installed"

# Security audit
print_step "Running security audit"
npm audit --audit-level=high || true
print_success "Security audit completed"

# Lint
print_step "Running ESLint"
npm run lint
print_success "ESLint passed"

# Format check
print_step "Checking formatting (Prettier)"
npm run format:check
print_success "Formatting check passed"

# Type check
print_step "Running TypeScript type check"
npm run typecheck
print_success "Type check passed"

# Unit tests
print_step "Running unit tests"
npm run test:unit:run
print_success "Unit tests passed"

# Build
print_step "Building project"
npm run build
print_success "Build completed"

# Summary
END_TIME=$(date +%s)
DURATION=$((END_TIME - START_TIME))

echo -e "\n${GREEN}╔══════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║           All CI checks passed!                          ║${NC}"
echo -e "${GREEN}║           Duration: ${DURATION}s                                     ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════════════════════╝${NC}\n"
'
