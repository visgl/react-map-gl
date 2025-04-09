# CHANGELOG

# Version 8.1

## v8.1.0-alpha.2 (Apr 9, 2025)

- wrap jumpTo as internal update (#2516)

## v8.1.0-alpha.1 (Mar 28, 2025)

- feat(mapbox): Replace shadow transform with proxied approach (#2514)

# Version 8.0

## v8.0.0-beta.1 (Jan 31, 2025)

- feat: remove `RTLTextPlugin` default for MapLibre (#2480)

## v8.0.0-alpha.2 (Jan 27, 2025)

- Migrate to monorepo (#2459)

# Version 7.2

## 7.2.0-beta.1 (Sep 12, 2023)

- Switch to ESM module (#2281)

# Version 7.1

## 7.1.0-beta.3 (Jun 22, 2023)

- Remap event types (#2207)
- Restore fog, light and terrain types on MapProps (#2206)

## 7.1.0-beta.2 (Jun 14, 2023)

- Make source prop of Layer optional (#2200)
- Fix maplibre-gl peerDependencies typo (#2197)

## 7.1.0-beta.1 (Jun 5, 2023)

- Add ref forwarding to Marker and Popup (#2191)
- Split exports into separate endpoints (#2178)
- Make mapbox-gl an optional dependency (#2175)
- Remove defaultProps and displayName (#2173)


# Version 7.0

## 7.0.0 (Feb 4, 2022)

v7 is a complete rewrite of the library. It addresses many long-standing issues in v5 and v6 limited by legacy architecture decisions. The most notable results of this redesign are:

- Performance: minimize the overhead of React, offer the same fast and smooth interaction as the native library
- Lightweight: the ESM build size is reduced from 219k to 57k
- Predictability: Components behave the same as their mapbox counterparts. Props are mapped 1:1 from the native options wherever appropriate. Almost all imperative APIs (`flyTo`, `fitBounds` etc.) can now be called directly without breaking the React binding.
- Compatibility: first and third-party plugins! Directly use [mapbox-gl-draw](https://github.com/visgl/react-map-gl/tree/7.0-release/examples/draw-polygon), [mapbox-gl-geocoder](https://github.com/visgl/react-map-gl/tree/7.0-release/examples/geocoder), to name a few.
- TypeScript compliant: the code base is now entirely written in TypeScript, and all types can be [imported](/docs/api-reference/types.md).

Visit the [upgrade guide](https://visgl.github.io/react-map-gl/docs/upgrade-guide) if you are trying to upgrade from v5 and v6.

## 7.0.0-beta.1 (Jan 26, 2022)

- Add mapLib API (#1703)
- Support inline styling for all components (#1702)
- Refactor Mapbox class (#1701)

## 7.0.0-alpha.7 (Jan 17, 2022)

- Improve typing (#1695)
- [v7] Fix popup className update in mapbox v1/maplibre (#1694)

## 7.0.0-alpha.6 (Jan 9, 2022)

- [v7] Fix double controls in strict mode (#1678)
-  [v7] Fix AttributionControl prop typo (#1679)

## 7.0.0-alpha.5 (Jan 6, 2022)

- [v7] Handle unmount order (#1676)
- [v7] Fix synchronization during transition (#1675)
- [v7] Update MapRef (#1674)
- [v7] Bug fixes (#1673)

## 7.0.0-alpha.4 (Jan 4, 2022)

- [v7] Fix resize synchronization (#1670)
- [v7] Add fog, light, terrain props (#1669)
- [v7] support global settings with MapProps (#1668)

## 7.0.0-alpha.3 (Jan 3, 2022)

- [v7] Clean up typings and expose more utility types (#1667)
- Drop flow types support (#1666)

## 7.0.0-alpha.2 (Jan 2, 2022)

- Update `@types/mapbox-gl` dependency

## 7.0.0-alpha.1 (Jan 2, 2022)

- [v7] utility hooks (#1663)
- [v7] Add Layer and Source (#1657)
- [v7] Control components (#1656)
- [v7] Marker and Popup (#1655)
- [v7] Map component (#1652)
- Typescript dev setup
