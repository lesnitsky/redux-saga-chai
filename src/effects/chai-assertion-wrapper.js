const isEffect = require('./is-effect');
const { Assertion } = require('chai');

exports.addProperty = function addProperty(type) {
  Assertion.addProperty(`${type}Effect`, function () {
    this.assert(
      isEffect(this._obj, type),
      `expected #{this} to be "${type}" effect`,
      `expected #{this} not to be "${type}" effect`
    );
  });
}

exports.addMethod = function addMethod(type, asserter) {
  Assertion.addMethod(type, function () {
    new Assertion(this._obj).to.be.iteration;

    const { value } = this._obj;
    new Assertion(value).to.be[`${type}Effect`];

    return asserter.apply(this, arguments);
  });
}
