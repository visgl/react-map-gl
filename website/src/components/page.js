/* global window */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import MarkdownPage from './markdown-page';
import {loadContent, updateMap} from '../actions/app-actions';

class Page extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mapHasFocus: true,
      content: this._loadContent(props.route.content)
    };
  }

  componentWillReceiveProps(nextProps) {
    const {route} = nextProps;
    if (this.props.route !== route) {
      this.setState({
        content: this._loadContent(route.content)
      });
    }
  }

  componentWillUnmount() {
    window.onresize = null;
  }

  _loadContent(content) {
    if (typeof content === 'string') {
      this.props.loadContent(content);
    }
    return content;
  }

  // replaces the current query string in react-router
  _updateQueryString = (queryString) => {
    const {location: {pathname, search}} = this.props;
    if (search !== queryString) {
      this.context.router.replace({
        pathname,
        search: queryString
      });
    }
  }

  render() {
    const {contents, location: {query}} = this.props;
    const {content} = this.state;

    let child;

    if (content.demo) {
      child = this._renderDemo(content.demo, content.code);
    } else if (typeof content === 'string') {
      child = (<MarkdownPage content={contents[content]}
        query={query}
        updateQueryString={this._updateQueryString} />);
    }

    return <div className="page">{child}</div>;
  }
}

Page.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state) {
  return {
    contents: state.contents
  };
}

export default connect(mapStateToProps, {loadContent, updateMap})(Page);
