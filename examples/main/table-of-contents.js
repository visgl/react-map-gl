import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TOC from './constants/toc';

export default class TableOfContents extends Component {

  _renderPage(page, i) {
    const {activeId, onChange} = this.props;
    const {children, title, id, component} = page;

    if (children) {
      return (
        <div key={`page-${i}`}>
          <div className="list-header expanded" key={`group-header${i}`}>
            {title}
          </div>
          <div className="subpages" style={{maxHeight: `${40 * children.length}px`}}>
            <ul key={`group-list${i}`} >
              {children.map(this._renderPage.bind(this))}
            </ul>
          </div>
        </div>
      );
    }

    const activeClass = activeId === id ? 'active' : '';

    return (
      <li key={`page-${i}`}>
        <a
          onClick={onChange.bind(null, id, component)}
          className={`link ${activeClass}`}>
          {title}
        </a>
      </li>
    );
  }

  render() {
    return (
      <div className="toc" style={{zIndex: 1}}>
        <div>
          {TOC.map(this._renderPage.bind(this))}
        </div>
      </div>
    );
  }
}

TableOfContents.propTypes = {
  activeId: PropTypes.string,
  onChange: PropTypes.func
};
