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
                deck.gl is a WebGL-powered framework for visual exploratory
                data analysis of large datasets.
              </h2>
              <hr className="short" />

              <h3>
                <img src="images/icon-layers.svg" />
                A Layered Approach to Data Visualization
              </h3>
              <p>
              deck.gl allows complex visualizations to be constructed by
              composing existing layers, and makes it easy to package and
              share new visulizations as reusable layers. We already offer
              a <a href="#/documentation/layer-catalog">catalog of proven layers</a> and
              we have many more in the works.
              </p>

              <h3>
                <img src="images/icon-high-precision.svg" />
                High-Precision Computations in the GPU
              </h3>
              <p>
              By emulating 64 bit floating point computations in the GPU,
              deck.gl renders datasets with unparalleled accuracy and
              performance.
              </p>

              <h3>
                <img src="images/icon-react.svg" />
                React and Mapbox GL Integrations
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

          <div className="container text-center buttons">
            <a href="#/documentation/getting-started" className="btn">
              Get Started <i className="icon icon-arrow-right" />
            </a>
            <a href="https://github.com/uber/react-map-gl" className="btn">
              View on Github <i className="icon icon-github" />
            </a>
            <a href="#/examples" className="btn">
              See examples <i className="icon icon-gallery" />
            </a>
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
