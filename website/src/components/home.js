import React, {Component} from 'react';

export default class Home extends Component {

  render() {
    return (
      <div className="home-wrapper">

        <section id="banner" style={{backgroundImage: 'url(images/hero.jpg)'}}>
          <div className="container soft">
            <h1>react-map-gl</h1>
            <p>React components for Mapbox GL JS</p>
            <a href="#/documentation/getting-started" className="btn">Get started</a>
          </div>
        </section>

        <section id="features">
          <div className="image" />
          <div className="container soft-left texts">
            <div>
              <h2>
                react-map-gl makes using Mapbox GL JS in React applications easy.
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
              react-map-gl comes with additional React components that
              synchronize with the map camera system. Use one of the supported
              overlays to visualize data, or build your own.
              </p>

              <h3>
                <img src="images/icon-high-precision.svg" />
                Part of Uber Visualization's Framework Suite
              </h3>
              <p>
              Use together with e.g. <a
                href="https://github.com/uber/react-map-gl"
                target="_blank"
                rel="noopener noreferrer">
                deck.gl</a> to render performant and compelling 2D and 3D
                WebGL visualizations on top of your Mapbox GL JS based maps.
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
