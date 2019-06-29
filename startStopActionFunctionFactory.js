(() => {
  function startStopActionFunctionFactory({
    startedEffect,
    durringEffect, // this should probably be a rate-limiting wrapper function
    stoppedEffect,
    timeout = 500,
  }) {
    let startedEffectLocked = false;
    let lastRunTimeStampInMs;

    return () => {
      lastRunTimeStampInMs = Date.now();
      const currentInstanceTimeStampInMs = lastRunTimeStampInMs;

      if (!startedEffectLocked) {
        startedEffectLocked = true;
        if (startedEffect) startedEffect();
      }
      if (durringEffect) durringEffect();
      setTimeout(() => {
        if (lastRunTimeStampInMs === currentInstanceTimeStampInMs
            && Date.now() - lastRunTimeStampInMs >= timeout) {
          startedEffectLocked = false;
          if (stoppedEffect) stoppedEffect();
        }
      }, timeout);
    };
  }

  const exampleFunction = startStopActionFunctionFactory({
    startedEffect: () => console.log('started'), // optional
    durringEffect: () => console.log('durring'), // optional
    stoppedEffect: () => console.log('ended'),   // optional
    timeout: 1000, // optional timeout override
  });

  window.addEventListener('resize', exampleFunction);
})();
