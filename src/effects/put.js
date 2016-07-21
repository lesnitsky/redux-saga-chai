const { addEffectAssertion, addEffectType } = require('./chai-assertion-wrapper');

module.exports = function put(chai, utils) {
  addEffectType('put');
  addEffectAssertion('put', function (expectedAction) {
    const { Assertion } = chai;

    const { action } = this._obj.value.PUT;
    const assertion = new Assertion(action)

    if (utils.flag(this, 'negate')) {
      return assertion.not.to.deep.equal(expectedAction);
    }

    assertion.to.deep.equal(expectedAction);
  });
}
