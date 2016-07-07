const Effects = require('redux-saga/effects');

const { take } = Effects;
const { takem } = Effects;
const { put } = Effects;
const { race } = Effects;
const { call } = Effects;
const { apply } = Effects;
const { cps } = Effects;
const { fork } = Effects;
const { spawn } = Effects;
const { join } = Effects;
const { cancel } = Effects;
const { actionChannel } = Effects;

const { createMockTask } = require('redux-saga/utils');

const mockTask = createMockTask();

describe('Effect assertion', () => {
  describe('.be.effect', () => {
    it('does not fail if tested object is redux-saga effect', () => {
      expect(take('ACTION')).to.be.an.effect;
      expect(takem('ACTION')).to.be.an.effect;
      expect(put({ type: 'ACTION' })).to.be.an.effect;
      expect(race([])).to.be.an.effect;
      expect(call(noop)).to.be.an.effect;
      expect(apply({}, noop)).to.be.an.effect;
      expect(cps(noop)).to.be.an.effect;
      expect(fork(noop)).to.be.an.effect;
      expect(spawn(noop)).to.be.an.effect;
      expect(join(mockTask)).to.be.an.effect;
      expect(cancel(mockTask)).to.be.an.effect;
      expect(actionChannel('ACTION')).to.be.an.effect;


      take('ACTION').should.be.an.effect;
      takem('ACTION').should.be.an.effect;
      put({ type: 'ACTION' }).should.be.an.effect;
      race([]).should.be.an.effect;
      call(noop).should.be.an.effect;
      apply({}, noop).should.be.an.effect;
      cps(noop).should.be.an.effect;
      fork(noop).should.be.an.effect;
      spawn(noop).should.be.an.effect;
      join(mockTask).should.be.an.effect;
      cancel(mockTask).should.be.an.effect;
      actionChannel('ACTION').should.be.an.effect;
    });
  });

  describe('not.be.an.effect', () => {
    it('does not fail if tested object is not a redux-saga effect', () => {
      const notEffectObject = { value: 42 };


      expect(null).not.to.be.an.effect;
      expect(undefined).not.to.be.an.effect;
      expect(42).not.to.be.an.effect;
      expect(notEffectObject).not.to.be.an.effect;


      notEffectObject.should.not.be.an.effect;
    });
  });
});
