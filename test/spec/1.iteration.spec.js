describe('Iteration assertion', () => {
  describe('.be.iteration', () => {
    it('does not fail if tested object has `done` and `value` keys', () => {
      const iteration = { done: false, value: null };

      expect(iteration).to.be.an.iteration;
      iteration.should.be.an.iteration;
    });
  });

  describe('.not.be.iteration', () => {
    it('does not fail if tested object does not have `done` or `value` key', () => {
      const notIterationObject = { value: 42 };

      expect(null).not.to.be.an.iteration;
      expect(undefined).not.to.be.an.iteration;
      expect(42).not.to.be.an.iteration;
      expect(notIterationObject).not.to.be.an.iteration;
      notIterationObject.should.not.be.an.iteration;
    });
  });
});
