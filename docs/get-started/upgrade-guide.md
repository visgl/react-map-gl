# Upgrade Guide

## From v1

If you are still using `v1` of `ReactMapGL`, make sure that you upgrade your
`node` version to `v4` or higher, and your `react` version to `15.4` or higher.

## From v1 & v2

For the most part, upgrade to `v3` should not completely break your application.
We have started to deprecate, and rename, a few props that you should update.
In all the cases below, the old `props` will still work, but they will eventually
be removed completely and you should start using the new `props` as soon as possible.

| Old Prop | New Prop |
| --- | --- |
| `onChangeViewport(<viewport>)`  | `onViewportChange(<viewport>)` |
| `onHoverFeatures(<features>)` | `onHover(<event>)` |
| `onClickFeatures(<features>)` | `onClick(<event>)` |
| `perspectiveEnabled [default: false]` | `dragRotate [default: true]`  |
