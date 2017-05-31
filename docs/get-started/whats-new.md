# ReactMapGL v3.0

Release date: TBD

## Highlights

- **Separated Event Handling**: Event handling in `v3` is decoupled from the `React`
component and was re-written from the ground up, using `hammer.js`.
- **Added Touch Support**: Using `hammer.js` to back our new event handling
process means we can leverage its great support for touch events for our map interactions.
- **Static and Interactive Map Component**: We now expose a `StaticMap` component
which is meant to be completely stateless. The default component is now `InteractiveMap`,
which will take care of handling interactions and states for you.
- **Addional MapboxGL Components**: The following `MapboxGL` pieces have been
given their own `React` components as well: `Popup`, `Marker`, `NavigationControl`.
- **New fitBounds**: `fitBounds` has also been rewritten to remove dependency
on `MapboxGL`'s utility functions.
- **Documentation**: Improved and updated, and now uses a consistent style to
other Uber Visualization open source projects.
