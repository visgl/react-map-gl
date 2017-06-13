# Testing

```
npm run test
npm run test-browser
```

## Bumping Mapbox Version

Always pin Mapbox to a specific release.

The React controls (`NavigationControl`, `Popup` and `Marker`) are dependent on
the Mapbox stylesheet, and may be broken by Mapbox updates.
Always run `examples/controls` after bumping Mapbox version to make sure they
still work.
