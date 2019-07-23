// the prevent TypeScript from yelling at you for providing an async function as an argument
function wrapAnAsync(callback) {
  return (args...) => {
    callback(args);
  };
}
