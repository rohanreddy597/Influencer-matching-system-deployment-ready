#!/bin/bash

# 🐳 Docker Helper Script for Influencer Matching System
# Usage: ./docker-helper.sh [command]

set -e  # Exit on error

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Print colored messages
print_info() {
  echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
  echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
  echo -e "${RED}❌ $1${NC}"
}

# Check if Docker is installed
check_docker() {
  if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed"
    echo "Download from: https://www.docker.com/products/docker-desktop"
    exit 1
  fi
  print_success "Docker is installed"
}

# Build Docker image
build() {
  print_info "Building Docker image..."
  docker build -t influencer-matching:latest .
  print_success "Docker image built successfully"
}

# Start containers
start() {
  print_info "Starting Docker containers..."
  check_docker
  
  # Create .env from example if it doesn't exist
  if [ ! -f .env ]; then
    print_info "Creating .env file from .env.example..."
    cp .env.example .env
    print_info "⚠️  Update .env with your credentials before running!"
  fi
  
  docker-compose up -d
  print_success "Containers started!"
  echo ""
  echo "📌 App URL: http://localhost:8080"
  echo "📌 MongoDB: localhost:27017"
  echo ""
  echo "View logs: docker-compose logs -f"
}

# Stop containers
stop() {
  print_info "Stopping containers..."
  docker-compose down
  print_success "Containers stopped"
}

# View logs
logs() {
  print_info "Showing logs (press Ctrl+C to exit)..."
  docker-compose logs -f
}

# Rebuild and restart
rebuild() {
  print_info "Rebuilding and restarting..."
  stop
  build
  start
}

# Clean everything
clean() {
  print_info "Cleaning up Docker resources..."
  docker-compose down -v
  docker rmi influencer-matching:latest 2>/dev/null || true
  print_success "Cleaned up"
}

# Help message
show_help() {
  echo "🐳 Docker Helper for Influencer Matching System"
  echo ""
  echo "Usage: ./docker-helper.sh [command]"
  echo ""
  echo "Commands:"
  echo "  start     - Start containers (Docker Compose)"
  echo "  stop      - Stop containers"
  echo "  logs      - View container logs"
  echo "  build     - Build Docker image"
  echo "  rebuild   - Rebuild and restart everything"
  echo "  clean     - Remove all containers and images"
  echo "  help      - Show this help message"
  echo ""
  echo "Examples:"
  echo "  ./docker-helper.sh start     # Start the app"
  echo "  ./docker-helper.sh logs      # View logs"
  echo "  ./docker-helper.sh stop      # Stop the app"
}

# Main script logic
case "${1:-help}" in
  start)
    start
    ;;
  stop)
    stop
    ;;
  logs)
    logs
    ;;
  build)
    check_docker
    build
    ;;
  rebuild)
    rebuild
    ;;
  clean)
    clean
    ;;
  help|"")
    show_help
    ;;
  *)
    print_error "Unknown command: $1"
    show_help
    exit 1
    ;;
esac
