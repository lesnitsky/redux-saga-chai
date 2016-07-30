# Chai assertions for redux-saga (WIP)

`redux-saga-chai` extends [Chai](http://chaijs.com/) and allows you to be more verbose while testing sagas

### Installation
```sh
npm i r1zzu/redux-saga-chai --save-dev
```

### Usage
```js
const chai = require('chai');
const reduxSagaChai = require('redux-saga-chai');

chai.use(reduxSagaChai);
```

### Docs
You can find complete docs [here](https://github.com/R1ZZU/redux-saga-chai/blob/master/docs.md#toc)

### Example
```js
function* testSaga() {
  yield take('ACTION')
  yield call(delay, 300);
  yield put({ type: 'ANOTHER_ACTION' });
}

describe('testSaga', () => {
  const gen = testSaga();
  let next;

  beforeEach(() => {
    next = gen.next();
  });

  it('should take ACTTION', () => {
    expect(next).to.take('ACTION');
  });

  it('should wait 300ms', () => {
    expect(next).to.wait(300);
  })

  it('should put ANOTHER_ACTION', () => {
    expect(next).to.put({ type: 'ANOTHER_ACTION' });
  });
})
```
