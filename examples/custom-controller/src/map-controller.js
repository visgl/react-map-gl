import {MapController} from 'react-map-gl';

export default class MyMapController extends MapController {

  // register custom events
  events = ['press'];

  // override default event handler
  handleEvent(event) {
    if (event.type === 'press' && this.onPress) {
      this.onPress(event);
      return;
    }
    super.handleEvent(event);
  }

  // override default pan event handler
  _onPan(event) {
    let shouldRotate = this.isFunctionKeyPressed(event) || event.rightButton;
    if (this.invertPan) {
      shouldRotate = !shouldRotate;
    }
    return shouldRotate ? this._onPanRotate(event) : this._onPanMove(event);
  }

  // override default wheel event handler
  _onWheel(event) {
    if (this.invertZoom) {
      event.delta = -event.delta;
    }
    super._onWheel(event);
  }

  setOptions(options) {
    this.invertZoom = options.invertZoom;
    this.invertPan = options.invertPan;
    this.onPress = options.onPress;

    super.setOptions(options);
  }
}
