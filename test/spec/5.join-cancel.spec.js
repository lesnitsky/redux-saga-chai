const Effects = require('redux-saga/effects');
const createMockTask = require('redux-saga/utils').createMockTask;
const { AssertionError } = require('chai');

const { take, join, cancel } = Effects;

describe('Effects', () => {
  let mockTask, otherMockTask;

  beforeEach(() => {
    mockTask = createMockTask();
    otherMockTask = createMockTask();
  })

  describe('join/cancel(task)', () => {
    describe('.be.joinEffect/cancelEffect', () => {
      it('does not fail if tested object is `join/cancel` effect', () => {
        const joinEffect = join(mockTask);
        const cancelEffect = cancel(mockTask);


        expect(joinEffect).to.be.joinEffect;
        expect(cancelEffect).to.be.cancelEffect;
      });
    });

    describe('.not.be.joinEffect/cancelEffect', () => {
      it('does not fail if tested object is not `join/cancel` effect', () => {
        const invalidEffect = take('ACTION');


        expect(null).not.to.be.an.joinEffect;
        expect(undefined).not.to.be.an.joinEffect;
        expect(42).not.to.be.an.joinEffect;
        expect(invalidEffect).not.to.be.an.joinEffect;


        invalidEffect.should.not.be.an.joinEffect;


        expect(null).not.to.be.an.cancelEffect;
        expect(undefined).not.to.be.an.cancelEffect;
        expect(42).not.to.be.an.cancelEffect;
        expect(invalidEffect).not.to.be.an.cancelEffect;


        invalidEffect.should.not.be.an.cancelEffect;
      });
    });

    describe('.to.join/cancel(task)', () => {
      it('does not fail if tested object is `join/cancel` effect with correct task yielded from generator', () => {
        function* testSaga() {
          yield join(mockTask);
          yield cancel(otherMockTask);
          // docs-ignore-start
          yield join(otherMockTask);
          yield cancel(mockTask);
          // docs-ignore-end
        }


        const gen = testSaga();
        const first = gen.next();
        const second = gen.next();


        expect(first).to.join(mockTask);
        expect(second).to.cancel(otherMockTask);

        // docs-ignore-start
        expect(() => {
          expect(gen.next()).to.join(mockTask);
        }).to.throw(AssertionError);

        expect(() => {
          expect(gen.next()).to.cancel(otherMockTask);
        }).to.throw(AssertionError);
        // docs-ignore-end
      });
    });

    describe('.not.to.join/cancel(task)', () => {
      it('does not fail if tested object is `join/cancel` effect with incorrect task', () => {
        function* testSaga() {
          yield join(otherMockTask);
          yield join(mockTask);

          yield cancel(otherMockTask);
          yield cancel(mockTask);
        }


        const gen = testSaga();
        const first = gen.next();
        const second = gen.next();
        const third = gen.next();
        const fourth = gen.next();


        expect(first).not.to.join(mockTask);
        expect(second).not.to.join(otherMockTask);

        expect(third).not.to.cancel(mockTask);
        expect(fourth).not.to.cancel(otherMockTask);

        // docs-ignore-start
        expect(() => {
          expect(first).not.to.join(otherMockTask);
        }).to.throw(AssertionError)

        expect(() => {
          expect(second).not.to.join(mockTask);
        }).to.throw(AssertionError)

        expect(() => {
          expect(third).not.to.cancel(otherMockTask);
        }).to.throw(AssertionError)

        expect(() => {
          expect(fourth).not.to.cancel(mockTask);
        }).to.throw(AssertionError)
        // docs-ignore-end
      });
    });
  });
});
