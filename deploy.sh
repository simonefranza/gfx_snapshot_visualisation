#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run generateGHPages

# navigate into the build output directory
cd .output/public

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:simonefranza/gfx_snapshot_visualisation.git main:gh-pages

cd -
