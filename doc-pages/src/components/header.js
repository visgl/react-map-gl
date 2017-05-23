import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Header extends Component {

  render() {
    const {isMenuOpen, opacity, toggleMenu} = this.props;

    return (
      <header className={ isMenuOpen ? 'open' : '' }>
        <div className="bg" style={{opacity}} />
        <div className="container stretch">
          <a className="logo" href="#">react-map-gl</a>
          <div className="menu-toggle" onClick={ () => toggleMenu(!isMenuOpen) }>
            <i className={`icon icon-${isMenuOpen ? 'close' : 'menu'}`} />
          </div>
          <div className="links">
            <Link activeClassName="active" to="examples">Gallery</Link>
            <Link activeClassName="active" to="documentation">Documentation</Link>
          </div>
        </div>
      </header>
    );
  }
}
