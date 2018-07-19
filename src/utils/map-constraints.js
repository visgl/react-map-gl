import {MAPBOX_LIMITS} from './map-state';

function decapitalize(s) {
  return s[0].toLowerCase() + s.slice(1);
}

// Checks a visibilityConstraints object to see if the map should be displayed
// Returns true if props are within the constraints
export function checkVisibilityConstraints(props, constraints = MAPBOX_LIMITS) {

  for (const constraintName in constraints) {
    // in the format of min* or max*
    const type = constraintName.slice(0, 3);
    const propName = decapitalize(constraintName.slice(3));

    if (type === 'min' && props[propName] < constraints[constraintName]) {
      return false;
    }
    if (type === 'max' && props[propName] > constraints[constraintName]) {
      return false;
    }
  }
  return true;
}
