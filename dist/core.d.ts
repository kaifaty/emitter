import type { BaseMap, EventName, EventListener, EventArgs } from './types';
export declare class EventEmitter<T extends BaseMap = BaseMap> {
    private isDebug;
    private events;
    private onceEvents;
    private onceDataEvents;
    protected dispatch: (event: EventName<T>, params: EventArgs<T>, data?: unknown) => void;
    protected addListener: (event: EventName<T>, listener: EventListener<T>) => void;
    protected removeListener: (event: EventName<T>, listener: EventListener<T>) => void;
    private getListeners;
    constructor(debug?: boolean);
    emit(event: EventName<T>, params: EventArgs<T>, data?: unknown): void;
    on(event: EventName<T>, listener: EventListener<T>): void;
    off(event: EventName<T>, listener: EventListener<T>): void;
    once(event: EventName<T>, listener: EventListener<T>): void;
    onceData(event: EventName<T>, listener: EventListener<T>, data: unknown): void;
    getListenersCount(event: EventName<T>): number;
}
