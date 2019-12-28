#!/bin/sh
# Example:
# update-release-branch.sh 6.3

set -e

BRANCH=`echo "$1-release"`
VERSION=`echo "$1.0"`

echo "Updating branch to ${BRANCH}..."

# Replace source links in docs and examples
find docs -iname "*.md" -type f -exec sed -i '' -E "s/react-map-gl\/(tree|blob)\/(master|[0-9\.]+-release)/react-map-gl\/tree\/${BRANCH}/g" {} \;
find examples -maxdepth 0 -iname "*.md" -type f -exec sed -i '' -E "s/react-map-gl\/(tree|blob)\/(master|[0-9\.]+-release)/react-map-gl\/tree\/${BRANCH}/g" {} \;
find examples/*/src -iname "*.js" -type f -exec sed -i '' -E "s/react-map-gl\/(tree|blob)\/(master|[0-9\.]+-release)/react-map-gl\/tree\/${BRANCH}/g" {} \;

# Bump dependencies in examples
update_dep() {
  FILE=$1
  VERSION=$2
  cat $FILE | jq ".dependencies |= . + \
  with_entries(select(.key | match(\"react-map-gl\")) | .value |= \"^${VERSION}\")" > temp
  mv temp $FILE
}

# https://stackoverflow.com/questions/4321456/find-exec-a-shell-function-in-linux
export -f update_dep
find examples/*/package.json -exec bash -c 'update_dep "$0" $1' {} $VERSION \;
