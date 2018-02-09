import React, {Component} from 'react';
import {render} from 'react-dom';
import BartMap from './bart-map';

export default class App extends Component {

  state = {
    showMap: true
  };

  _toggleMap() {
    this.setState({showMap: !this.state.showMap});
  }

  render() {
    const {showMap} = this.state;
    return (
      <div>
        <div onClick={this._toggleMap.bind(this)}>
          Toggle Map
        </div>
        {showMap && <BartMap />}
      </div>
    );
  }

}
