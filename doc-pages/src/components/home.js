import React, {Component} from 'react';

export default class Home extends Component {

  render() {
    return (
      <div className="home-wrapper">

        <section ref="banner" id="banner">
          <div className="container soft-left">
            <h1>react-map-gl</h1>
            <p>A React port of MapboxGL JS</p>
            <a href="#/documentation/getting-started" className="btn">Get started</a>
          </div>
          <div ref="fps" className="fps" />
        </section>

        <section id="features">
          <div className="image" />
          <div className="container soft-left texts">
            <div>
              <h2>
                react-map-gl makes using mapbox-gl in React applications easy.
              </h2>
              <hr className="short" />

              <h3>
                <img src="images/icon-react.svg" />
                React Integration
              </h3>
              <p>
              Integration on browser and Node.js, exposing the full power of mapbox-gl.
              </p>

              <h3>
                <img src="images/icon-layers.svg" />
                Component Library
              </h3>
              <p>
              react-map-gl comes with additional React component that
              synchronize with the map camera system.
              </p>

              <h3>
                <img src="images/icon-high-precision.svg" />
                Perfect Companion to deck.gl
              </h3>
              <p>
              deck.gl is a great match with React, supporting
              efficient WebGL rendering under the Reactive programming
              paradigm. And when used with Mapbox GL it automatically
              coordinates with the Mapbox camera system to provide
              compelling 2D and 3D visualizations on top of your Mapbox
              based maps.
              </p>

            </div>
          </div>

        </section>

        <hr />

        <section id="footer">
          <div className="container soft-left">
            <h4>Made by</h4>
            <i className="icon icon-uber-logo" />
          </div>
        </section>

      </div>
    );
  }
}
