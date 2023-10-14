const acc = {};

const isObject = (obj) => obj instanceof Object;

const flatten = (obj, parentKey) => {
  for (const key in obj) {
    const curVal = obj[key];
    if (isObject(curVal)) {
      flatten(curVal, key);
    } else {
      const propName = parentKey ? `${parentKey}-${key}` : `${key}`;
      acc[propName] = curVal;
    }
  }
  return acc;
};

export default flatten;
