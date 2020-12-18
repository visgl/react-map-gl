type MapboxStyle = string | {
  toJS?: Function,
  layers: Array<any>
};

export function normalizeStyle(style?: MapboxStyle): null | MapboxStyle;
