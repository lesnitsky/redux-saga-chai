const Effects = require('redux-saga/effects');
const { AssertionError } = require('chai');

const { select, put } = Effects;

const noop = () => undefined

describe('Effects', () => {
  describe('select(pattern)', () => {
    describe('.be.selectEffect', () => {
      it('does not fail if tested object is `select` effect', () => {
        const effect = select(noop);
        expect(effect).to.be.selectEffect;
      });
    });

    describe('.not.be.selectEffect', () => {
      it('does not fail if tested object is not `select` effect', () => {
        const notTakeEffectObject = put({ type: 'ACTION' });


        expect(null).not.to.be.an.selectEffect;
        expect(undefined).not.to.be.an.selectEffect;
        expect(42).not.to.be.an.selectEffect;
        expect(notTakeEffectObject).not.to.be.an.selectEffect;
      });
    });

    describe('.to.select(selector)', () => {
      it('does not fail if tested object is `select` effect yielded from generator', () => {
        function* testSaga() {
          yield select(noop);
        }

        const next = testSaga().next();
        expect(next).to.select(noop);

        // dpcs-ingore-start
        expect(() => {
          expect(next).to.select(x => x);
        }).to.throw(AssertionError);
        // docs-ignore-end
      });
    });

    describe('.not.to.select(selector)', () => {
      it('does not fail if tested object is `select` effect with wrong selector', () => {
        const selector = state => state.prop;


        function* testSaga() {
          yield select(selector);
        }

        const next = testSaga().next();

        expect(next).not.to.select(noop);

        // docs-ignore-start
        expect(() => {
          expect(next).not.to.select(selector)
        }).to.throw(AssertionError);
        // docs-ignore-end
      });
    });

    describe('.to.select(selector).withArgs(...args)', () => {
      it('does not fail if tested object is `select` effect and it was with called with correct arguments', () => {
        function* testSaga() {
          yield select(noop, 1);
          yield select(noop, 1, 2);
          yield select(noop, 1, 2, 3);
        }


        const gen = testSaga();
        const steps = [];
        let next = gen.next();


        while (!next.done) {
          steps.push(next);
          next = gen.next();
        }


        expect(steps[0]).to.select(noop).withArgs(1);
        expect(steps[1]).to.select(noop).withArgs(1, 2);
        expect(steps[2]).to.select(noop).withArgs(1, 2, 3);
      })
    })

    describe('.to.select(selector).withoutArgs(..args)', () => {
      it('does not fail if tested object is `select` effect and it was called without args', () => {
        function* testSaga() {
          yield select(noop);
        }


        const next = testSaga().next();


        expect(next).to.select(noop).withoutArgs();
      });
    });
  });
});
