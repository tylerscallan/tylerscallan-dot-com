#!/bin/bash

set -e

FRESH_BUILD=false

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --fresh)
            FRESH_BUILD=true
            shift
            ;;
        -h|--help)
            echo "Usage: $0 [OPTIONS]"
            echo ""
            echo "Options:"
            echo "  --fresh    Force clean rebuild without Docker cache"
            echo "  -h, --help Show this help message"
            exit 0
            ;;
        *)
            echo "Unknown option: $1"
            echo "Use --help for usage information"
            exit 1
            ;;
    esac
done

echo "Building and starting Tyler Callan portfolio..."

if [ "$FRESH_BUILD" = true ]; then
    echo "Performing fresh build (no cache)..."
    docker compose -f docker/docker-compose.yml down
    docker compose -f docker/docker-compose.yml build --no-cache
    docker compose -f docker/docker-compose.yml up -d
else
    docker compose -f docker/docker-compose.yml up --build -d
fi

echo ""
echo "Site is running at: http://localhost:27100"
echo ""
echo "To view logs:  docker compose -f docker/docker-compose.yml logs -f"
echo "To stop:       docker compose -f docker/docker-compose.yml down"
