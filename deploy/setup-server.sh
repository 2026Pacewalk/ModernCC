#!/usr/bin/env bash
# One-time VPS setup for Modern Crop Care Chemicals (Ubuntu/Debian).
# Usage: sudo bash setup-server.sh <domain-or-ip>
set -euo pipefail

DOMAIN="${1:?Usage: sudo bash setup-server.sh <domain-or-ip>}"
REPO="https://github.com/2026Pacewalk/ModernCC.git"
APP_DIR="/var/www/moderncc"

echo "==> Installing nginx, git, curl..."
apt-get update -y
apt-get install -y nginx git curl

if ! command -v node >/dev/null 2>&1; then
  echo "==> Installing Node.js 22..."
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
  apt-get install -y nodejs
fi

echo "==> Cloning and building..."
mkdir -p "$APP_DIR"
if [ ! -d "$APP_DIR/repo/.git" ]; then
  git clone "$REPO" "$APP_DIR/repo"
else
  git -C "$APP_DIR/repo" pull --ff-only
fi

cd "$APP_DIR/repo"
npm ci
npm run build

echo "==> Publishing release..."
rm -rf "$APP_DIR/current.new"
cp -r dist "$APP_DIR/current.new"
rm -rf "$APP_DIR/current.old"
[ -d "$APP_DIR/current" ] && mv "$APP_DIR/current" "$APP_DIR/current.old"
mv "$APP_DIR/current.new" "$APP_DIR/current"
chown -R www-data:www-data "$APP_DIR/current"

echo "==> Configuring nginx..."
sed "s/SERVER_NAME/$DOMAIN/" deploy/nginx.conf > /etc/nginx/sites-available/moderncc
ln -sf /etc/nginx/sites-available/moderncc /etc/nginx/sites-enabled/moderncc
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx

echo "==> Done. Site is live at http://$DOMAIN"
echo "    For HTTPS (after DNS points here): sudo apt-get install -y certbot python3-certbot-nginx && sudo certbot --nginx -d $DOMAIN"
