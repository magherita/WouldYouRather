const logger = (store) => (next) => (action) => {
    console.group(action.type);

    console.log("Action: ", action);

    const nxt = next(action);

    console.log("State: ", store.getState());

    console.groupEnd();

    return nxt;
};

export default logger;