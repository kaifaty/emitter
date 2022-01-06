export class EventEmitter {
    constructor() {
        this._events = new Map();
        this._once = new Map();
        this._onceData = new Map();
    }
    on(event, listner) {
        const existEvent = this._events.get(event);
        if (existEvent) {
            existEvent.push(listner);
        }
        else {
            this._events.set(event, [listner]);
        }
    }
    off(event, listner) {
        const existEvent = this._events.get(event);
        if (existEvent) {
            const index = existEvent.indexOf(listner);
            if (~index) {
                existEvent.splice(index, 1);
            }
        }
    }
    offOnce(event, listner) {
        const existEvent = this._once.get(event);
        if (existEvent) {
            const index = existEvent.indexOf(listner);
            if (~index) {
                existEvent.splice(index, 1);
            }
        }
    }
    onceData(event, listner, data) {
        const existEvent = this._onceData.get(event);
        if (existEvent) {
            existEvent.push({ data, listner });
        }
        else {
            this._onceData.set(event, [{ data, listner }]);
        }
    }
    offOnceData(event, listner, data) {
        const existEvent = this._onceData.get(event);
        if (existEvent) {
            const index = existEvent.findIndex(it => it.listner === listner && it.data === data);
            if (~index) {
                existEvent.splice(index, 1);
            }
        }
    }
    once(event, listner) {
        const existEvent = this._once.get(event);
        if (existEvent) {
            existEvent.push(listner);
        }
        else {
            this._once.set(event, [listner]);
        }
    }
    addEventListener(event, listner) {
        return this.on(event, listner);
    }
    dispatch(event, params, data) {
        if (localStorage.debugEmitter) {
            console.log('dispatch', event, params);
        }
        return Promise.resolve().then(r => this.emit(event, params, data));
    }
    emit(event, params, data) {
        const listners = this._events.get(event);
        if (listners) {
            listners.forEach(l => l(params));
        }
        const onceListners = this._once.get(event);
        if (onceListners) {
            onceListners.forEach(l => l(params));
            this._once.delete(event);
        }
        const onceDataListners = this._onceData.get(event);
        if (onceDataListners) {
            onceDataListners.filter(item => item.data === data)
                .forEach(it => it.listner(params));
            this._onceData.set(event, onceDataListners.filter(item => item.data !== data));
        }
    }
}
