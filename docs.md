# TOC
   - [Iteration assertion](#iteration-assertion)
     - [.be.iteration](#iteration-assertion-beiteration)
     - [.not.be.iteration](#iteration-assertion-notbeiteration)
   - [Effect assertion](#effect-assertion)
     - [.be.effect](#effect-assertion-beeffect)
     - [not.be.an.effect](#effect-assertion-notbeaneffect)
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

