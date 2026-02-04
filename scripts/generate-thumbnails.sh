#!/bin/bash
set -e

THUMB_SIZE=600

echo "=== Thumbnail Generation ==="
echo ""

# Create thumbs directory for photography
mkdir -p /app/public/images/photography/thumbs

# Process photography images
echo "Processing photography images..."
count=0
skipped=0

for src in /app/public/images/photography/*.webp; do
  [ -f "$src" ] || continue

  filename=$(basename "$src")
  thumb="/app/public/images/photography/thumbs/${filename}"

  # Skip if thumbnail exists and is newer than source
  if [ -f "$thumb" ] && [ "$thumb" -nt "$src" ]; then
    skipped=$((skipped + 1))
    continue
  fi

  echo "  → $filename"
  magick "$src" -filter Lanczos -resize "${THUMB_SIZE}x${THUMB_SIZE}^" \
    -gravity center -extent "${THUMB_SIZE}x${THUMB_SIZE}" \
    -define webp:lossless=true "$thumb"
  count=$((count + 1))
done

echo "  Generated: $count, Skipped (up-to-date): $skipped"
echo ""

# Process editorial cover images
echo "Processing editorial cover images..."
count=0
skipped=0

for cover in /app/public/images/editorials/*/cover.jpg; do
  [ -f "$cover" ] || continue

  dir=$(dirname "$cover")
  thumb="${dir}/cover-thumb.webp"

  # Skip if thumbnail exists and is newer than source
  if [ -f "$thumb" ] && [ "$thumb" -nt "$cover" ]; then
    skipped=$((skipped + 1))
    continue
  fi

  folder=$(basename "$dir")
  echo "  → $folder/cover.jpg"
  magick "$cover" -filter Lanczos -resize "${THUMB_SIZE}x${THUMB_SIZE}^" \
    -gravity center -extent "${THUMB_SIZE}x${THUMB_SIZE}" \
    -define webp:lossless=true "$thumb"
  count=$((count + 1))
done

echo "  Generated: $count, Skipped (up-to-date): $skipped"
echo ""

echo "=== Done ==="
