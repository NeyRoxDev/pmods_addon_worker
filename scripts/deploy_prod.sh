#!/usr/bin/env bash
set -euo pipefail

if ! command -v php >/dev/null; then echo 'PHP manquant'; exit 1; fi

PANEL_ROOT="${PANEL_ROOT:-/var/www/pterodactyl}"
cd "$PANEL_ROOT"

# Copy public assets
mkdir -p public/vendor/pmods
cp -f "$(dirname "$0")/../panel-addon/public/index.js" public/vendor/pmods/index.js

# Views (optional placement)
mkdir -p resources/views/vendor/pmods
cp -f "$(dirname "$0")/../panel-addon/resources/views/vendor/pmods/server.blade.php" resources/views/vendor/pmods/server.blade.php

# DB migrations (si l'addon est déjà installé pour les tables)
php artisan migrate --force

echo "Déploiement terminé. Pense à configurer PMODS_WORKER_URL et PMODS_WORKER_TOKEN dans .env"
