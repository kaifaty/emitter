import { warn } from './utils';
export class EventEmitter {
    constructor(debug = false) {
        this.isDebug = false;
        this.events = {};
        this.onceEvents = {};
        this.onceDataEvents = {};
        this.dispatch = this.emit;
        this.addListener = this.on;
        this.removeListener = this.off;
        this.isDebug = debug;
    }
    getListeners(store, event) {
        if (!store[event]) {
            store[event] = [];
        }
        return store[event];
    }
    emit(event, params, data) {
        var _a;
        this.getListeners(this.events, event).forEach(listner => listner(...params));
        this.getListeners(this.onceEvents, event).forEach(listener => listener(...params));
        this.onceEvents[event] = [];
        this.onceDataEvents[event] = (_a = this.onceDataEvents[event]) === null || _a === void 0 ? void 0 : _a.filter(item => {
            if (item.data === data) {
                item.listener(...params);
                return false;
            }
            return true;
        });
        if (this.isDebug) {
            console.log(`Emit event: ${event.toString()}, data:`, data);
        }
    }
    on(event, listener) {
        this.getListeners(this.events, event).push(listener);
    }
    off(event, listener) {
        const listeners = this.getListeners(this.events, event);
        const index = listeners.indexOf(listener);
        if (index < 0) {
            warn('off', { event, listener });
            return;
        }
        listeners.splice(index, 1);
    }
    once(event, listener) {
        this.getListeners(this.onceEvents, event).push(listener);
    }
    onceData(event, listener, data) {
        if (!this.onceDataEvents[event]) {
            this.onceDataEvents[event] = [];
        }
        this.onceDataEvents[event].push({
            data,
            listener
        });
    }
    getListenersCount(event) {
        var _a;
        const eventsLen = this.getListeners(this.events, event).length;
        const onceLen = this.getListeners(this.onceEvents, event).length;
        const onceDataLen = ((_a = this.onceDataEvents[event]) === null || _a === void 0 ? void 0 : _a.length) || 0;
        return eventsLen + onceDataLen + onceLen;
    }
}
