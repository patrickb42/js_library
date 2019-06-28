# rateLimitedFunctionFactory
This a function that can take a function, like one that you would apply add to an event listener, and return a function that wraps your logic in a rate-limiter.

It has a default value of 300ms, but you can change how often it fires.

It also make is to that the function will run if the event was triggered when the function was in a locked state.

On top of all of that, because the actual function being added to the event listener is a stored value, and not an IIFE, you are able to remove the event listener later.
