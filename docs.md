# TOC

   - [Iteration assertion](#iteration-assertion)
     - [.be.iteration](#iteration-assertion-beiteration)
     - [.not.be.iteration](#iteration-assertion-notbeiteration)
   - [Effect assertion](#effect-assertion)
     - [.be.effect](#effect-assertion-beeffect)
     - [not.be.an.effect](#effect-assertion-notbeaneffect)
   - [Effects](#effects)
     - [take(pattern)/takem(pattern)](#effects-takepatterntakempattern)
       - [.be.takeEffect](#effects-takepatterntakempattern-betakeeffect)
       - [.not.be.takeEffect](#effects-takepatterntakempattern-notbetakeeffect)
       - [.to.take(pattern)](#effects-takepatterntakempattern-totakepattern)
       - [.not.to.take(pattern)](#effects-takepatterntakempattern-nottotakepattern)
<a name=""></a>
 
<a name="iteration-assertion"></a>
# Iteration assertion
<a name="iteration-assertion-beiteration"></a>
## .be.iteration
does not fail if tested object has `done` and `value` keys.

```js
const iteration = { done: false, value: null };
expect(iteration).to.be.an.iteration;
iteration.should.be.an.iteration;
```

<a name="iteration-assertion-notbeiteration"></a>
## .not.be.iteration
does not fail if tested object does not have `done` or `value` key.

```js
const notIterationObject = { value: 42 };
expect(null).not.to.be.an.iteration;
expect(undefined).not.to.be.an.iteration;
expect(42).not.to.be.an.iteration;
expect(notIterationObject).not.to.be.an.iteration;
notIterationObject.should.not.be.an.iteration;
```

<a name="effect-assertion"></a>
# Effect assertion
<a name="effect-assertion-beeffect"></a>
## .be.effect
does not fail if tested object is redux-saga effect.

```js
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
```

<a name="effect-assertion-notbeaneffect"></a>
## not.be.an.effect
does not fail if tested object is not a redux-saga effect.

```js
const notEffectObject = { value: 42 };

expect(null).not.to.be.an.effect;
expect(undefined).not.to.be.an.effect;
expect(42).not.to.be.an.effect;
expect(notEffectObject).not.to.be.an.effect;

notEffectObject.should.not.be.an.effect;
```

<a name="effects"></a>
# Effects
<a name="effects-takepatterntakempattern"></a>
## take(pattern)/takem(pattern)
<a name="effects-takepatterntakempattern-betakeeffect"></a>
### .be.takeEffect
does not fail if tested object is `take` effect.

```js
const effect = take('ACTION');

expect(effect).to.be.takeEffect;
effect.should.be.takeEffect;
```

<a name="effects-takepatterntakempattern-notbetakeeffect"></a>
### .not.be.takeEffect
does not fail if tested object is not `take` effect.

```js
const notTakeEffectObject = put({ type: 'ACTION' });

expect(null).not.to.be.an.takeEffect;
expect(undefined).not.to.be.an.takeEffect;
expect(42).not.to.be.an.takeEffect;
expect(notTakeEffectObject).not.to.be.an.takeEffect;

notTakeEffectObject.should.not.be.an.takeEffect;
```

<a name="effects-takepatterntakempattern-totakepattern"></a>
### .to.take(pattern)
does not fail if tested object is `take` effect yielded from generator.

```js
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
```

<a name="effects-takepatterntakempattern-nottotakepattern"></a>
### .not.to.take(pattern)
does not fail if tested object is not `take` effect yielded from generator.

```js
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
```


