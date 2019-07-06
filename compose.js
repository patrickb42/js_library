(() => {
  /*
   * this function is designed to take any number of functions and call them from right
   * to left; this curries the data. The return from the far right will be the argument
   * off the function that is to its left.
   */
  function compose(...fns) {
    return value => fns.reduceRight(
      (acc, curr) => curr(acc),
      value,
    );
  }
  // less readable version of the preceding function
  // function compose(...fns) {
  //   return value => fns.reduceRight((acc, curr) => curr(acc), value);
  // }

  // another way to do this, but has drawbacks compared to above versions
  // function compose(...fns) {
  //   return fns.reduceRight((acc, curr) => {
  //     return (value) => {
  //       return curr(acc(value));
  //     };
  //   });
  // }
  // less readable version of the preceding implementation
  // function compose(...fns) {
  //   return fns.reduceRight((acc, curr) => value => curr(acc(value)));
  // }


  // example functions
  function adderFactory(adder) {
    return subject => subject + adder;
  }
  function multiplierFactory(multiplier) {
    return subject => subject * multiplier;
  }


  const composedFunction = compose(adderFactory(1),
    multiplierFactory(2),
    adderFactory(-3)
  );

  // the same as doing console.log(adderFactory(1)(multiplierFactory(2)(adderFactory(-3)(100))));
  console.log(composedFunction(100));
})();
