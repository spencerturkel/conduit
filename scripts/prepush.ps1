$protected = 'master','develop','staging'

if ((git symbolic-ref --short HEAD) -notin $protected) {
    Write-Output "Branch unprotected."
    return $true
}

git diff-index HEAD --

(git diff-index --quiet HEAD --) -and (npm run build:CI)
