import React, {Component} from 'react';
import {Link} from 'react-router';

import {LIBRARIES} from '../constants/links';

export default class Header extends Component {

  _renderLinks() {
    return (
      <div className="site-links">
        { Object.keys(LIBRARIES).map(name =>
            <div className="site-link"><a href={LIBRARIES[name]}>{name}</a></div>) }
      </div>
    );
  }

  render() {
    const {isMenuOpen, opacity, toggleMenu} = this.props;

    return (
      <header className={ isMenuOpen ? 'open' : '' }>
        <div className="bg" style={{opacity}} />
        <div className="container stretch">
          { this._renderLinks() }
          <div className="menu-toggle" onClick={ () => toggleMenu(!isMenuOpen) }>
            <i className={`icon icon-${isMenuOpen ? 'close' : 'menu'}`} />
          </div>
          <div className="links">
            <Link activeClassName="active" to="examples">Examples</Link>
            <Link activeClassName="active" to="documentation">Documentation</Link>
            <a
              href="https://github.com/uber/react-map-gl"
              target="_blank"
              rel="noopener noreferrer">
              Github <i style={{marginLeft: 2}} className="icon icon-github" />
            </a>
            <a
              href="https://github.com/mapbox/mapbox-gl-js"
              target="_blank"
              rel="noopener noreferrer">
              Mapbox GL JS <i style={{marginLeft: 2}} className="icon icon-github" />
            </a>
          </div>
        </div>
      </header>
    );
  }
}
