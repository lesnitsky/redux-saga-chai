const { addEffectAssertion, addEffectType } = require('./chai-assertion-wrapper');

function addAssertionFor(effectName, taskExtractor) {
  return function (chai, utils) {
    addEffectType(effectName);

    addEffectAssertion(effectName, function (expectedTask) {
      const { Assertion } = chai;

      const task = taskExtractor(this._obj);
      const assertion = new Assertion(task)

      if (utils.flag(this, 'negate')) {
        return assertion.not.to.equal(expectedTask);
      }

      assertion.to.equal(expectedTask);
    });
  }
}

module.exports = function (chai, utils) {
  addAssertionFor('join', (context) => context.value.JOIN)(chai, utils);
  addAssertionFor('cancel', (context) => context.value.CANCEL)(chai, utils);
}
