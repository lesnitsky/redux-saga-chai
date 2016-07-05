const Effects = require('redux-saga/effects');
const { createMockTask } = require('redux-saga/utils');

const mockTask = createMockTask();

const argsForEffectCreator = {
  take: ['ACTION'],
  takem: ['ACTION'],
  put: ['ACTION'],
  race: [[]],
  call: [noop],
  apply: [{}, noop],
  cps: [noop],
  fork: [noop],
  spawn: [noop],
  join: [mockTask],
  cancel: [mockTask],
  actionChannel: ['ACTION'],
};

describe('Effect assertion', () => {
  it('should detect effects correctly', () => {
    expect(null).not.to.be.effect;
    expect({ done: true, value: true }).not.to.be.effect;

    Object.keys(Effects).forEach(effectName => {
      const effectCreator = Effects[effectName];
      const args = argsForEffectCreator[effectName];

      expect(effectCreator.apply(null, args)).to.be.effect;
    });
  });
});
