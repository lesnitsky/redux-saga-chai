const Effects = require('redux-saga/effects');
const { AssertionError } = require('chai');

const { take, put } = Effects;

describe('Effects', () => {
  describe('take(pattern)/takem(pattern)', () => {
    describe('.be.takeEffect', () => {
      it('does not fail if tested object is `take` effect', () => {
        const effect = take('ACTION');


        expect(effect).to.be.takeEffect;
        effect.should.be.takeEffect;
      });
    });

    describe('.not.be.takeEffect', () => {
      it('does not fail if tested object is not `take` effect', () => {
        const notTakeEffectObject = put({ type: 'ACTION' });


        expect(null).not.to.be.an.takeEffect;
        expect(undefined).not.to.be.an.takeEffect;
        expect(42).not.to.be.an.takeEffect;
        expect(notTakeEffectObject).not.to.be.an.takeEffect;


        notTakeEffectObject.should.not.be.an.takeEffect;
      });
    });

    describe('.to.take(pattern)', () => {
      it('does not fail if tested object is `take` effect yielded from generator', () => {
        function* testSaga() {
          yield take('*');
          yield take();
          yield take('ACTION');
          yield take(['ACTION1', 'ACTION2', 'ACTION3']);
          yield take(action => action.type.startsWith('IMPORTANT'));
        }


        const gen = testSaga();
        const steps = [];
        let next = gen.next();


        while (!next.done) {
          steps.push(next);
          next = gen.next();
        }


        expect(steps[0]).to.take('ACTION');
        expect(steps[1]).to.take('ACTION');


        expect(steps[0]).to.take(['ACTION1', 'ACTION2', 'ACTION3']);
        expect(steps[1]).to.take(['ACTION1', 'ACTION2', 'ACTION3']);


        expect(steps[2]).to.take('ACTION');
        steps[2].should.take('ACTION');


        expect(steps[3]).to.take(['ACTION1', 'ACTION2', 'ACTION3']);
        expect(steps[3]).to.take(['ACTION1', 'ACTION2']);
        expect(steps[3]).to.take('ACTION1');

        steps[3].should.take(['ACTION1', 'ACTION2', 'ACTION3']);
        steps[3].should.take(['ACTION1', 'ACTION2']);
        steps[3].should.take('ACTION1');


        expect(steps[4]).to.take('IMPORTANT_ACTION');
        steps[4].should.take('IMPORTANT_ACTION');

        // docs-ignore-start
        expect(() => {
          expect(steps[4]).to.take(null);
        }).to.throw(AssertionError);

        expect(() => {
          expect(steps[4]).to.take('')
        }).to.throw(AssertionError);
        // docs-ignore-end
      });
    });

    describe('.not.to.take(pattern)', () => {
      it('does not fail if tested object is not `take` effect yielded from generator', () => {
        function* testSaga() {
          yield take('ACTION');
          yield take(['ACTION1', 'ACTION2', 'ACTION3']);
          yield take(action => action.type.startsWith('IMPORTANT'));
        }


        const gen = testSaga();


        const first = gen.next();
        const second = gen.next();
        const third = gen.next();


        expect(first).not.to.take('NOT_ACTION');
        first.should.not.take('NOT_ACTION');


        expect(second).not.to.take('WRONG_ACTION');
        expect(second).not.to.take(['FOO', 'BAR', 'BAZ']);
        second.should.not.take('WRONG_ACTION');
        second.should.not.take(['FOO', 'BAR', 'BAZ']);


        expect(third).not.to.take('NOT_IMPORTANT_ACTION');
        third.should.not.take('NOT_IMPORTANT_ACTION');

        // docs-ignore-start
        expect(() => {
          expect(first).to.take(null);
        }).to.throw(AssertionError);

        expect(() => {
          expect(first).to.take('')
        }).to.throw(AssertionError);
        // docs-ignore-end
      });
    });
  });
});
