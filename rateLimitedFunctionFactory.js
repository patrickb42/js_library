/*
 * This is a function that can take a function, like one that you would apply
 * add to an event listener, and return a function that wraps your logic in a rate-limiter.
 *
 * It has a default value of 300ms, but you can change how often it fires.
 *
 * On top of all of that, because the actual function being added to the event listener is a stored value,
 * and not an IIFE, you are able to remove the event listener later.
 */

// This the ability to add a function that runs if the event is triggered while it is locked out.
(() => {
  function rateLimitedFunctionFactory({ sideEffect, triggeredWhileLockedEffect, timeout = 300 }) {
    let locked = false;

    return () => {
      if (!locked) {
        locked = true;
        setTimeout(() => {
          locked = false;
          sideEffect();
        }, timeout);
      } else if (triggeredWhileLockedEffect) {
        triggeredWhileLockedEffect();
      }
    };
  }

  const exampleFunction = rateLimitedFunctionFactory({
    sideEffect: () => console.log('side effect'),
    triggeredWhileLockedEffect: () => console.log('triggered while side effect locked'), // optional but needs to be light-weight
    timeout: 500, // optional timeout override
  });

  window.addEventListener('resize', exampleFunction);
})();
