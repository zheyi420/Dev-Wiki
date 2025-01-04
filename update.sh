#!/usr/bin/env sh

# abort on errors
# set -e

git status

# navigate into the build output directory
# cd dist

# place .nojekyll to bypass Jekyll processing
# echo > .nojekyll

# # if you are deploying to a custom domain
# # echo 'www.example.com' > CNAME

# git init
# # git checkout -B master
git add .
git commit -m 'bak'
git push

# # if you are deploying to https://<USERNAME>.github.io
# # git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# # if you are deploying to https://<USERNAME>.github.io/<REPO>
# # git push -f git@github.com:<USERNAME>/<REPO>.git main:gh-pages

# cd -

# test
# test corp-pc
# test corp-pc commit by user vinoniv
