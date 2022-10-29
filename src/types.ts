export type BaseListener = (...args: any[]) => void
export type BaseName = string | symbol
export type BaseMap = Record<BaseName, BaseListener>


export type EventName<T extends BaseMap> = keyof T
export type EventListener<T extends BaseMap> = T[EventName<T>]
export type EventArgs<T extends BaseMap> = Parameters<EventListener<T>>
export type EventStore<T extends BaseMap> = Record<EventName<T>, Array<EventListener<T>>>
export type EventWithDataStore<T extends BaseMap> = Record<EventName<T>, Array<{
    data: unknown,
    listener: EventListener<T>
}>>

