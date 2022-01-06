
type TListner = (...args: any[]) => void


export class EventEmitter {
    private _events: Map<string, [TListner]> = new Map();
    private _once: Map<string, [TListner]> = new Map();
    private _onceData: Map<string, {data: unknown, listner: TListner}[]> = new Map();

    on(event: string , listner: TListner){
        const existEvent = this._events.get(event);
        if(existEvent){
            existEvent.push(listner);
        }
        else{
            this._events.set(event, [listner]);
        }
    }
    off(event: string, listner: TListner){
        const existEvent = this._events.get(event);
        if(existEvent){
            const index = existEvent.indexOf(listner);
            if(~index){
                existEvent.splice(index, 1);
            }
        }
    }
    offOnce(event: string, listner: TListner){
        const existEvent = this._once.get(event);
        if(existEvent){
            const index = existEvent.indexOf(listner);
            if(~index){
                existEvent.splice(index, 1);
            }
        }
    }
    onceData(event: string, listner: TListner, data: unknown){
        const existEvent = this._onceData.get(event);
        if(existEvent){
            existEvent.push({data, listner});
        }
        else{
            this._onceData.set(event, [{data, listner}]);
        }
    }
    offOnceData(event: string, listner: TListner, data: unknown){
        const existEvent = this._onceData.get(event);
        if(existEvent){
            const index = existEvent.findIndex( it => it.listner === listner && it.data === data);
            if(~index){
                existEvent.splice(index, 1);
            }
        }
    }

    once(event: string, listner: TListner){
        const existEvent = this._once.get(event);
        if(existEvent){
            existEvent.push(listner);
        }
        else{
            this._once.set(event, [listner]);
        }
    }
    addEventListener(event: string, listner: TListner){
        return this.on(event, listner);
    }
    dispatch(event: string, params?: any, data?: unknown){
        if(localStorage.debugEmitter){
            console.log('dispatch', event, params)
        }
        return Promise.resolve().then(r => this.emit(event, params, data));
    }
    emit(event: string, params: any, data?: unknown){
        const listners = this._events.get(event);
        if(listners){
            listners.forEach(l => l(params));
        }
        const onceListners = this._once.get(event);
        if(onceListners){
            onceListners.forEach(l => l(params));
            this._once.delete(event);
        }
        const onceDataListners = this._onceData.get(event);
        if(onceDataListners){
            onceDataListners.filter(item => item.data === data)
                            .forEach(it => it.listner(params));
            this._onceData.set(event, onceDataListners.filter(item => item.data !== data))
        }
    }
}