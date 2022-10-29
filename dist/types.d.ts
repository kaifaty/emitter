export declare type BaseListener = (...args: any[]) => void;
export declare type BaseName = string | symbol;
export declare type BaseMap = Record<BaseName, BaseListener>;
export declare type EventName<T extends BaseMap> = keyof T;
export declare type EventListener<T extends BaseMap> = T[EventName<T>];
export declare type EventArgs<T extends BaseMap> = Parameters<EventListener<T>>;
export declare type EventStore<T extends BaseMap> = Record<EventName<T>, Array<EventListener<T>>>;
export declare type EventWithDataStore<T extends BaseMap> = Record<EventName<T>, Array<{
    data: unknown;
    listener: EventListener<T>;
}>>;
