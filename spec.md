# SBZ Enterprises Digital Card

## Current State
Links stored in browser localStorage only. New links only visible in adding browser.

## Requested Changes (Diff)

### Add
- Backend storage for custom links with getLinks, addLink, removeLink

### Modify
- SmartLinks.tsx: replace localStorage with backend actor calls

### Remove
- All localStorage usage for sbz_links

## Implementation Plan
1. Generate Motoko backend with link CRUD
2. Update SmartLinks.tsx to call backend
