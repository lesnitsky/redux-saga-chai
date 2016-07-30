const { addEffectAssertion, addEffectType } = require('./chai-assertion-wrapper');
const { Assertion } = require('chai');

class SelectEffectAssertion extends Assertion {
  withArgs(...expectedArgs) {
    const assertion = new Assertion(this._obj.value.SELECT.args);
    assertion.to.deep.equal(expectedArgs);
  }

  withoutArgs() {
    const assertion = new Assertion(this._obj.value.SELECT.args);
    assertion.to.deep.equal([]);
  }
}

module.exports = function select(chai, utils) {
  addEffectType('select');
  addEffectAssertion('select', function (expectedSelector) {
    const { Assertion } = chai;

    const { selector } = this._obj.value.SELECT;
    const assertion = new Assertion(selector)

    if (utils.flag(this, 'negate')) {
      return assertion.not.to.equal(expectedSelector);
    }

    assertion.to.equal(expectedSelector);

    return new SelectEffectAssertion(this._obj);
  });
}
