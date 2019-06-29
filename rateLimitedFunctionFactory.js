(() => {
  function rateLimitedFunctionFactory({ sideEffect, triggeredWhileLockedEffect, timeout = 300 }) {
    let locked = false;
    let triggeredWhileLocked = false;

    return () => {
      if (!locked) {
        locked = true;
        sideEffect();
        setTimeout(() => {
          locked = false;
          if (triggeredWhileLocked) {
            triggeredWhileLocked = false;
            sideEffect();
          }
        }, timeout);
      } else {
        triggeredWhileLocked = true;
        if (triggeredWhileLockedEffect) triggeredWhileLockedEffect();
      }
    };
  }

  const exampleFunction = rateLimitedFunctionFactory({
    sideEffect: () => console.log('side effect'),
    triggeredWhileLockedEffect: () => console.log('triggered while side effect locked'), // optional
    timeout: 500, // optional timeout override
  });

  window.addEventListener('resize', exampleFunction);
})();
