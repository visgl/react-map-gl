As of version 2, the `ChoroplethOverlay` React component is no longer part
of the exported library of react-map-gl.

It has been moved to this examples folder, and applications that
still need it can copy it from here instead of importing it directly.

Removing `ChoroplethOverlay` eliminated a fairly large overlay and a big
D3 dependency (in particular, d3-geo) from react-map-gl, which seemed like
the right tradeoff since most users are using mapbox styles or deck.gl layers
for Choropleths.
