(() => {
  function rateLimitedFunctionFactory({ sideEffect, timeout = 300, triggeredWhileLockedEffect }) {
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

  function newMenuButton({ menuBtnElement }) {
    const _nav = document.querySelector('nav');
    const _maxMobileWidth = 500;

    const toggleNav = () => {
      _nav.classList.toggle('menu--open');
    };

    const conditionallyCloseMenu = rateLimitedFunctionFactory({
      sideEffect: () => {
        if (parseInt(window.innerWidth, 10) > _maxMobileWidth) {
          _nav.classList.remove('menu--open');
        }
      },
      // optionally change the default timeout duration
      // timeout: 250,
      // optionally add a function that runs when the event is triggered but locked
      // triggeredWhileLockedEffect: () => alert('locked out'),
    });

    menuBtnElement.addEventListener('click', toggleNav);
    window.addEventListener('resize', conditionallyCloseMenu);
  }


  newMenuButton({ menuBtnElement: document.querySelector('.menu-btn') });
})();
