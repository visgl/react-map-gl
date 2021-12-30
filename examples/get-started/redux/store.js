import {createStore} from 'redux';

function mapStateReducer(state, action) {
  switch (action.type) {
    case 'setViewState':
      return {...state, viewState: action.payload};

    default:
      return state;
  }
}

const defaultMapState = {
  mapStyle: 'mapbox://styles/mapbox/streets-v11',
  viewState: {
    latitude: 37.8,
    longitude: -122.4,
    zoom: 14
  }
};

export default createStore(mapStateReducer, defaultMapState);
