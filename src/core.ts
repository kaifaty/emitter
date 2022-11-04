import type {
    BaseMap,
    Store,
    Events,
    Listener,
    ListnerArgs,
    StoreWithData,
} from './types'
import { warn } from './utils'


export class EventEmitter<T extends BaseMap = BaseMap> {
    private isDebug = false
    private events = {} as Store<T>
    private onceEvents = {} as Store<T>
    private onceDataEvents = {} as StoreWithData<T>

    protected dispatch = this.emit
    protected addListener = this.on
    protected removeListener = this.off

    getStore(){
        return this.events
    }
    private getListeners<E extends Events<T>>(store: Store<T>, event: E): Array<Listener<T, E>> {
        if(!store[event]){
            store[event] = []
        }
        return store[event] as Array<Listener<T, E>>
    }
    constructor(debug = false){
        this.isDebug = debug
    }
    emit<E extends Events<T>>(event: E, params: ListnerArgs<T, E>, data?: unknown) {
        this.getListeners(this.events, event).forEach(listner => listner(...params))
        this.getListeners(this.onceEvents, event).forEach(listener => listener(...params))
        this.onceEvents[event] = []
        this.onceDataEvents[event] = this.onceDataEvents[event]?.filter(item => {
            if(item.data === data){
                item.listener(...params)
                return false
            }
            return true
        })
        if(this.isDebug){
            console.log(`Emit event: ${event.toString()}, data:`, data)
        }
    }
    on<E extends Events<T>>(event: E, listener: Listener<T, E>) {
        this.getListeners(this.events, event).push(listener)
    }
    off<E extends Events<T>>(event: Events<T>, listener: Listener<T, E>) {
        const listeners = this.getListeners(this.events, event)
        const index = listeners.indexOf(listener)
        if(index < 0){
            warn('off', {event, listener})
            return
        }
        listeners.splice(index, 1)
    }
    once<E extends Events<T>>(event: Events<T>, listener: Listener<T, E>) {
        this.getListeners(this.onceEvents, event).push(listener)
    }
    onceData<E extends Events<T>>(event: Events<T>, listener: Listener<T, E>, data: unknown) {
        if(!this.onceDataEvents[event]){
            this.onceDataEvents[event] = []
        }
        this.onceDataEvents[event].push({
            data,
            listener
        })
    }
    
    getListenersCount(event: Events<T>){
        const eventsLen = this.getListeners(this.events, event).length
        const onceLen = this.getListeners(this.onceEvents, event).length
        const onceDataLen = this.onceDataEvents[event]?.length || 0

        return eventsLen + onceDataLen + onceLen
    }

}
