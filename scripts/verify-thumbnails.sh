#!/bin/bash
#
# Verifies that all required thumbnails exist and are up-to-date.
# This script is intended to run as part of the pre-commit hook.
#

missing=0
stale=0
errors=""

# Check photography thumbnails
for src in public/images/photography/*.webp; do
  [ -f "$src" ] || continue

  filename=$(basename "$src")
  thumb="public/images/photography/thumbs/${filename}"

  if [ ! -f "$thumb" ]; then
    errors="${errors}  Missing: $thumb\n"
    missing=$((missing + 1))
  elif [ "$src" -nt "$thumb" ]; then
    errors="${errors}  Stale: $thumb (source is newer)\n"
    stale=$((stale + 1))
  fi
done

# Check editorial cover thumbnails
for cover in public/images/editorials/*/cover.jpg; do
  [ -f "$cover" ] || continue

  dir=$(dirname "$cover")
  thumb="${dir}/cover-thumb.webp"

  if [ ! -f "$thumb" ]; then
    errors="${errors}  Missing: $thumb\n"
    missing=$((missing + 1))
  elif [ "$cover" -nt "$thumb" ]; then
    errors="${errors}  Stale: $thumb (source is newer)\n"
    stale=$((stale + 1))
  fi
done

# Report results
if [ $missing -gt 0 ] || [ $stale -gt 0 ]; then
  echo ""
  echo "Thumbnail verification failed!"
  echo ""
  echo -e "$errors"
  echo "Run 'npm run generate:thumbs' to generate missing/stale thumbnails."
  echo ""
  exit 1
fi

exit 0
