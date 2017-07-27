import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import autobind from 'react-autobind';

import MarkdownPage from './markdown-page';
import {loadContent} from '../actions/app-actions';

class Page extends Component {

  constructor(props) {
    super(props);
    this.state = {
      content: this._loadContent(props.route.content)
    };
    autobind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {route} = nextProps;
    if (this.props.route !== route) {
      this.setState({
        content: this._loadContent(route.content)
      });
    }
  }

  _loadContent(content) {
    if (typeof content === 'string') {
      this.props.loadContent(content);
    }
    return content;
  }

  // replaces the current query string in react-router
  _updateQueryString(queryString) {
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

    return (
      <div className="page">
        <MarkdownPage content={contents[content]}
          query={query}
          updateQueryString={this._updateQueryString} />
      </div>
    );
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

export default connect(mapStateToProps, {loadContent})(Page);
