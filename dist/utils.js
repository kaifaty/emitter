export const warn = (method, data) => {
    let warn = `[EventEmitter] method: ${method}`;
    if (data.event) {
        warn += `; Event - ${data.event.toString()}`;
    }
    if (data.listener) {
        warn += `; Event - ${data.listener}`;
    }
    console.warn(warn);
};
