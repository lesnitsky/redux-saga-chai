describe('Iteration assertion', () => {
  it('should treat { done, value } objects as iterations', () => {
    const iteration = { done: false, value: null };

    expect(iteration).to.be.an.iteration;
  });

  it('should not treat other values as iterations', () => {
    expect(null).not.to.be.an.iteration;
    expect(undefined).not.to.be.an.iteration;
    expect(false).not.to.be.an.iteration;

    expect({ done: true }).not.to.be.an.iteration;
  });
});
