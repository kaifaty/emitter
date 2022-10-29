import type {
    BaseMap,
    EventStore,
    EventName,
    EventListener,
    EventArgs,
    EventWithDataStore,
} from './types'
import { warn } from './utils'


export class EventEmitter<T extends BaseMap = BaseMap> {
    private isDebug = false
    private events = {} as EventStore<T>
    private onceEvents = {} as EventStore<T>
    private onceDataEvents = {} as EventWithDataStore<T>

    protected dispatch = this.emit
    protected addListener = this.on
    protected removeListener = this.off

    private getListeners(store: EventStore<T>, event: EventName<T>): Array<EventListener<T>> {
        if(!store[event]){
            store[event] = []
        }
        return store[event]
    }
    constructor(debug = false){
        this.isDebug = debug
    }
    emit(event: EventName<T>, params: EventArgs<T>, data?: unknown) {
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
    on(event: EventName<T>, listener: EventListener<T>) {
        this.getListeners(this.events, event).push(listener)
    }
    off(event: EventName<T>, listener: EventListener<T>) {
        const listeners = this.getListeners(this.events, event)
        const index = listeners.indexOf(listener)
        if(index < 0){
            warn('off', {event, listener})
            return
        }
        listeners.splice(index, 1)
    }
    once(event: EventName<T>, listener: EventListener<T>) {
        this.getListeners(this.onceEvents, event).push(listener)
    }
    onceData(event: EventName<T>, listener: EventListener<T>, data: unknown) {
        if(!this.onceDataEvents[event]){
            this.onceDataEvents[event] = []
        }
        this.onceDataEvents[event].push({
            data,
            listener
        })
    }
    
    getListenersCount(event: EventName<T>){
        const eventsLen = this.getListeners(this.events, event).length
        const onceLen = this.getListeners(this.onceEvents, event).length
        const onceDataLen = this.onceDataEvents[event]?.length || 0

        return eventsLen + onceDataLen + onceLen
    }

}
