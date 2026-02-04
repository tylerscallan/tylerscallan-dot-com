.PHONY: dev build preview lint format typecheck test test-unit test-e2e clean install

# Development
dev:
	npm run dev

build:
	npm run build

preview:
	npm run preview

# Code quality
lint:
	npm run lint

lint-fix:
	npm run lint:fix

format:
	npm run format

format-check:
	npm run format:check

typecheck:
	npm run typecheck

# Testing
test: test-unit test-e2e

test-unit:
	npm run test:unit:run

test-unit-watch:
	npm run test:unit

test-e2e:
	npm run test:e2e

test-e2e-ui:
	npm run test:e2e:ui

test-coverage:
	npm run test:coverage

# Docker
docker-up:
	./scripts/start.sh

docker-down:
	docker compose -f docker/docker-compose.yml down

# Utilities
install:
	npm install

clean:
	rm -rf out node_modules coverage test-results playwright-report

# CI checks (runs all checks in sequence)
ci: install lint format-check typecheck test-unit
