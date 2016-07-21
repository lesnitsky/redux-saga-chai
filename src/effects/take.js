const { addEffectType, addEffectAssertion } = require('./chai-assertion-wrapper');
const { AssertionError } = require('chai');

function takes(pattern, actionType, negate) {
  if (pattern === '*' || pattern === undefined) {
    return !negate;
  }

  if (!actionType || !actionType.length) {
    throw new AssertionError('Empty action type');
  }

  if (typeof pattern !== 'function') {
    if (!Array.isArray(pattern)) {
      pattern = [pattern];
    }

    if (!Array.isArray(actionType)) {
      actionType = [actionType];
    }

    return negate
      ? actionType.some(at => pattern.includes(at))
      : actionType.every(at => pattern.includes(at));
  }

  return !negate && pattern({ type: actionType });
}

module.exports = function take(chai, utils) {
  const { Assertion } = chai;

  addEffectType('take');
  addEffectAssertion('take', function (actionType) {
    const actualPattern = this._obj.value.TAKE.pattern;

    if (typeof actionType !== 'string' && !Array.isArray(actionType)) {
      throw new AssertionError(`Unsupported action type`);
    }

    this.assert(
      takes(actualPattern, actionType, utils.flag(this, 'negate')),
      `expected ${actionType} to be taken`,
      `expected ${actionType} not to be taken`
    )
  });
}
