## Getting Started

react-map-gl is a [React](http://facebook.github.io/react/)-friendly
wrapper for [MapboxGL-js](https://www.mapbox.com/mapbox-gl-js/), a WebGL-powered
vector and raster tile mapping library.

MapboxGL-js provides impressive vector tile rendering capabilities
that you can find out more about [here](https://www.mapbox.com/mapbox-gl-js/).
Although the Mapbox
[vector tile specification](https://www.mapbox.com/developers/vector-tiles/) is 
[open source](https://github.com/mapbox/vector-tile-spec), there aren't yet very
many free alternatives to Mapbox's paid 
[vector tile API](https://www.mapbox.com/pricing/). Because of this, the
examples here don't use the paid vector tile API and instead use map tiles by
[Stamen Design](http://stamen.com), under
[CC BY 3.0](http://creativecommons.org/licenses/by/3.0) and data by
[OpenStreetMap](http://openstreetmap.org),
under [CC BY SA](http://creativecommons.org/licenses/by-sa/3.0).

Two important guiding principles this library tries to adhere that might be unfamiliar to you:

### Stateless

One of the goals of the project is to provide a [stateless](https://facebook.github.io/react/docs/interactivity-and-dynamic-uis.html#what-components-should-have-state) API to the underlying map and overlay components. (Also see [Pure UI](http://rauchg.com/2015/pure-ui/) by [Guillermo Rauch](https://twitter.com/rauchg).)

### Small modules

[Small modules]() - Whenever possible, isolated, reusable code should exist in separate npm modules that [do one thing well](https://en.wikipedia.org/wiki/Unix_philosophy#Do_One_Thing_and_Do_It_Well). (Also see [Module Best Practices](https://github.com/mattdesl/module-best-practices) by [Matt DesLauriers](https://twitter.com/mattdesl).)


## Installation

react-map-gl needs to be installed in a product that also requires react 0.14.x and ImmutableJS 3.x. (These are referred to as its [peerDependencies](https://nodejs.org/en/blog/npm/peer-dependencies/)) so if you haven't already, you'll need to run the following in your project:

    npm install react
    npm install immutable

And then install react-map-gl with:

    npm install react-map-gl

The below example is a quick preview of the API and how you could create a simple non-interactive map.
