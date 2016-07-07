const { asEffect } = require('redux-saga/lib/internal/io');

const effectNames = Object.keys(asEffect);

module.exports = function isEffect(obj, type) {
  if (type) {
    return asEffect[type](obj);
  }

  for (let i = 0; i < effectNames.length; i++) {
    const method = effectNames[i];

    if (asEffect[method](obj)) {
      return true;
    }
  }

  return false;
};
