#!/usr/bin/env bash

protected=('master' 'staging')

if [[ $(git symbolic-ref --short HEAD) =~ ${protected[@]} ]]; then
    printf '%s\n' 'Branch unprotected.'
    return 0
fi

git diff-index HEAD --

git diff-index --quiet HEAD -- && npm run build:CI
