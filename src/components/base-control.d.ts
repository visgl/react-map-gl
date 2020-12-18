import {MapControlProps} from './use-map-control';
import {MjolnirEvent} from '../utils/map-controller';

export default class BaseControl {

  static defaultProps: MapControlProps;

  _context: any;
  _containerRef: {current: null | HTMLElement | SVGAElement};

  _onScroll(evt: MjolnirEvent) : void;

  _onDragStart(evt: MjolnirEvent) : void;

  _onDblClick(evt: MjolnirEvent) : void;

  _onClick(evt: MjolnirEvent) : void;

  _onPointerMove(evt: MjolnirEvent) : void;

}
