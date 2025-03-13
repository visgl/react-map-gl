#!/bin/bash
# Example:
# update-release-branch.sh 8.0

set -e

BRANCH=`echo "$1-release"`
VERSION=`echo "$1.0"`

echo "Updating branch to ${BRANCH}..."

# Replace source links in docs and examples
find docs -mindepth 2 -iname "*.md" -exec perl -i -pe "s/react-map-gl\/(tree|blob)\/(master|[0-9\.]+-release)/react-map-gl\/tree\/${BRANCH}/g" {} \;
find examples \( -iname "*.js" -iname "*.jsx" -iname "*.ts" -o -iname "*.tsx" \) -type f -exec perl -i -pe "s/react-map-gl\/(tree|blob)\/(master|[0-9\.]+-release)/react-map-gl\/tree\/${BRANCH}/g" {} \;

# Bump dependencies in examples
update_dep() {
  local FILE=$1
  local VERSION=$2
  cat $FILE | jq ".dependencies |= . + \
  with_entries(select(.key | match(\"react-map-gl\")) | .value |= \"^${VERSION}\")" > temp
  mv temp $FILE
}

# https://stackoverflow.com/questions/4321456/find-exec-a-shell-function-in-linux
export -f update_dep
find examples -type f -name "package.json" -exec bash -c 'update_dep "$0" $1' {} $VERSION \;
