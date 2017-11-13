function StoreService({
  props: { initialState },
  callbacks: {
    CALLBACK_COMMAND_CONTEXT = () => ({}),
  } = {}
}) {
  let __state       = initialState;
  let __subscribers = [];

  function commit(commitFunc, ...args) {
    console.warn(commitFunc.name, args);

    trigger('beforeCommit', __state, commitFunc, args);

    __state = commitFunc(__state, ...args);

    trigger('afterCommit', __state, commitFunc, args);
  }

  function runCommand(commandFunc, ...args) {
    console.warn(commandFunc.name, args);

    return commandFunc({
      ...CALLBACK_COMMAND_CONTEXT(),
      store: { commit, runCommand, getState }
    }, ...args);
  }

  function receiveSignal(signalFunc, ...args) {
    console.warn(signalFunc.name, args);

    signalFunc({
      store: { commit, runCommand, getState }
    }, ...args);
  }

  function getState() {
    return __state;
  }

  function on(eventName, callback) {
    __subscribers.push({ eventName, callback });
  }

  function trigger(eventName, ...args) {
    __subscribers
      .filter((subscriber) => subscriber.eventName == eventName)
      .forEach(({ callback }) => callback(...args))
  }

  return { commit, runCommand, receiveSignal, getState, on };
}

export default StoreService;
