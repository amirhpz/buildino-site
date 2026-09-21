#!/usr/bin/env bash

set -Eeuo pipefail

project_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$project_root"

if [[ ! -f .env ]]; then
    echo 'Deployment stopped: create and configure .env first.' >&2
    exit 1
fi

composer install --no-dev --prefer-dist --no-interaction --optimize-autoloader
php artisan optimize

echo 'Buildino deployment completed.'
