# Testing

## Unit, Lint

```
npm run test
```

## Browser

```
npm run test-browser
```

**You'll need to specify a valid Mapbox Access Token in the URL** for the tests to pass.

```
http://localhost:8080/?access_token=MAPBOX_ACCESS_TOKEN
```

# Bumping Mapbox Version

Always pin Mapbox to a specific release.

The React controls (`NavigationControl`, `Popup` and `Marker`) are dependent on
the Mapbox stylesheet, and may be broken by Mapbox updates.
Always run `examples/controls` after bumping Mapbox version to make sure they
still work.
