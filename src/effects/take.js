const isEffect = require('./is-effect');
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

  Assertion.addProperty('takeEffect', function () {
    this.assert(
      isEffect(this._obj, 'take'),
      'expected #{this} to be "take" effect',
      'expected #{this} not to be "take" effect'
    );
  });

  Assertion.addMethod('take', function (actionType) {
    new Assertion(this._obj).to.be.iteration;

    const { value } = this._obj;
    new Assertion(value).to.be.takeEffect;

    const actualPattern = value.TAKE.pattern;

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
