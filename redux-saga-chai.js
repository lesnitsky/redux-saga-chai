const effects = require('./src/effects');

module.exports = function reduxSagaChai(chai) {
  const { Assertion } = chai;

  Assertion.addProperty('iteration', function () {
    const obj = this._obj;

    this.assert(
      obj && (typeof obj === 'object') && ('value' in obj) && ('done' in obj),
      'expected #{this} to be an iteration',
      'expected #{this} not to be an iteration'
    );
  });

  chai.use(effects);
};
