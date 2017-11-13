const ActionDispatcher = (() => {
  let __subscribers = [];

  function subscribe(eventName, callback) {
    __subscribers.push({ eventName, callback });
  }

  function dispatch(eventName, ...args) {
    __subscribers
      .filter((subscriber) => subscriber.eventName === eventName)
      .forEach(({ callback }) => callback(...args));
  }

  return { subscribe, dispatch };
})();

export default ActionDispatcher;
