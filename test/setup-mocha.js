const chai = require('chai');
const reduxSagaChai = require('../');

global.expect = chai.expect;
chai.should();

chai.use(reduxSagaChai);

global.noop = x => undefined
