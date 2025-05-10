#!/usr/bin/bash

sed '
/## \[Unreleased\]/a\
\n## ['"$1"'] - '"$(date -I)"'
1,/^\[[0-9]\+\.[0-9]\+\.[0-9]\+\]/{
//i\
['"$1"']: https://github.com/lumynou5/live-time-copier/releases/tag/v'"$1"'
}
' CHANGELOG.md >dist/CHANGELOG.md
mv dist/CHANGELOG.md CHANGELOG.md

sed '
s/"version": "[0-9]\+\.[0-9]\+\.[0-9]\+"/"version": "'"$1"'"/
' src/manifest.json >dist/manifest.json
mv dist/manifest.json src/manifest.json
