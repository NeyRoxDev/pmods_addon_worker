# PMods v0.6.1 — Pack PROD
Date: 2025-08-08

## Contenu
- **panel-addon/public/index.js** : bundle précompilé sans dépendances (fallback prod).
- **resources/views/vendor/pmods/server.blade.php** : vue pour intégrer le dashboard.
- **scripts/deploy_prod.sh** : déploiement rapide (copie assets + migrations).
- **scripts/pmods-worker.service** : service systemd pour le worker.

## Utilisation
1) Copier l'archive, décompresser.
2) Exécuter sur le serveur panel :
   ```bash
   PANEL_ROOT=/var/www/pterodactyl bash scripts/deploy_prod.sh
   ```
3) Configurer `.env` du panel :
   ```env
   PMODS_WORKER_URL=http://IP:8086
   PMODS_WORKER_TOKEN=changeme
   ```
4) Installer/activer le worker (voir service systemd ci-joint).

> Pour l'UI avancée (React/Vite + charts), utilise l'archive **v0.6.1** précédente et exécute `npm run build`.
