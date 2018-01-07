/**
 * Copyright (c) 2014-present, Facebook, Inc.
 * MIT license
 */

/**
 * https://github.com/facebook/immutable-js/blob/master/src/Map.js
 * This is to avoid importing the full `immutable` module for type check
 * @returns `true` if object is an immutable.js Map instance
 */
const IS_MAP_SENTINEL = '@@__IMMUTABLE_MAP__@@';

export default function isMap(maybeMap) {
  return Boolean(maybeMap && maybeMap[IS_MAP_SENTINEL]);
}
