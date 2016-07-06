# TOC
   - [Iteration assertion](#iteration-assertion)
     - [.be.iteration](#iteration-assertion-beiteration)
     - [.not.be.iteration](#iteration-assertion-notbeiteration)
   - [Effect assertion](#effect-assertion)
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
expect(42).not.be.an.iteration;
expect(notIterationObject).not.to.be.an.iteration;
notIterationObject.should.not.be.an.iteration;
```

