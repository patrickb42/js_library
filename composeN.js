(() => {
  /*
   * this function is designed to take any number of functions and call them from right
   * to left; this curries the data. The return from the far right will be the argument
   * off the function that is to its left.
   */
  function composeN(...fns) {
    return fns.reduceRight((acc, curr) => {
      return (value) => {
        return curr(acc(value));
      };
    });
  }

  function adderFactory(adder) {
    return subject => subject + adder;
  }

  function multiplierFactory(multiplier) {
    return subject => subject * multiplier;
  }

  const composedFunction = composeN(adderFactory(1),
    multiplierFactory(2),
    adderFactory(-3));

  // the same as doing console.log(adderFactory(1)(multiplierFactory(2)(adderFactory(-3)(100))));
  console.log(composedFunction(100));
})();
