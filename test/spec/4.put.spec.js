const Effects = require('redux-saga/effects');
const { AssertionError } = require('chai');

const { take, put } = Effects;

describe('Effects', () => {
  describe('put(action)', () => {
    describe('.be.putEffect', () => {
      it('does not fail if tested object is `put` effect', () => {
        const effect = put({ type: 'ACTION' });


        expect(effect).to.be.putEffect;
        effect.should.be.putEffect;
      });
    });

    describe('.not.be.putEffect', () => {
      it('does not fail if tested object is not `put` effect', () => {
        const notPutEffectObject = take({ type: 'ACTION' });


        expect(null).not.to.be.an.putEffect;
        expect(undefined).not.to.be.an.putEffect;
        expect(42).not.to.be.an.putEffect;
        expect(notPutEffectObject).not.to.be.an.putEffect;


        notPutEffectObject.should.not.be.an.putEffect;
      });
    });

    describe('.to.put(action)', () => {
      it('does not fail if tested object is `put` effect with correct action yielded from generator', () => {
        function* testSaga() {
          yield put({ type: 'ACTION' });
          yield put({ type: 'ACTION', payload: 42 });
        }

        const gen = testSaga();
        const first = gen.next();
        const second = gen.next();

        expect(first).to.put({ type: 'ACTION' });
        expect(second).to.put({ type: 'ACTION', payload: 42 });
      });
    });

    describe('.not.to.put(action)', () => {
      it('does not fail if tested object is not `put` effect', () => {
        function* testSaga() {
          yield take('ACTION');
        }

        expect(testSaga().next()).not.to.put('ACTION');
      });

      it('does not fail if tested object is `put` effect with incorrect action', () => {
        function* testSaga() {
          yield put({ type: 'ACTION' });
          yield put({ type: 'OTHER_ACTION', payload: 42 });
        }

        const gen = testSaga();
        const first = gen.next();
        const second = gen.next();

        expect(first).not.to.put({ type: 'OTHER_ACTION' });
        expect(second).not.to.put({ type: 'OTHER_ACTION' }); // no payload
      });
    });
  });
});
