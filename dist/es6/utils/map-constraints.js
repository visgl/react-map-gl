import { MAPBOX_LIMITS } from './map-state';

function decapitalize(s) {
  return s[0].toLowerCase() + s.slice(1);
}

export function checkVisibilityConstraints(props, constraints = MAPBOX_LIMITS) {
  for (const constraintName in constraints) {
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
//# sourceMappingURL=map-constraints.js.map