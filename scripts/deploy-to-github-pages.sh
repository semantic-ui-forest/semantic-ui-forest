#!/bin/bash

set -o errexit
rm -rf output

# config
git config --global user.email "xiaohanyu1988@gmail.com"
git config --global user.name "Xiao Hanyu"

# build
bundle install

nanoc_plate_rev=$(git rev-parse HEAD)

git clone https://github.com/${GITHUB_PAGES_REPO}.git output

bundle exec nanoc compile

# deploy
cd output
git add .
git commit -F- <<EOF
Auto deployed by travis-ci.

Projects used for this deployment:
- https://github.com/nanoc-plate/nanoc-plate/commit/${nanoc_plate_rev}
EOF

git push -f "https://${GITHUB_TOKEN}@github.com/${GITHUB_PAGES_REPO}.git" master:master
