const isEffect = require('./is-effect');
const take = require('./take');
const put = require('./put');
const joinAndCancel = require('./join-cancel');

module.exports = function effects(chai) {
  const { Assertion } = chai;

  Assertion.addProperty('effect', function () {
    const obj = this._obj;

    this.assert(
      isEffect(obj),
      'expected #{this} to be an effect',
      'expected #{this} not to be an effect'
    );
  });

  chai.use(take);
  chai.use(put);
  chai.use(joinAndCancel);
}
