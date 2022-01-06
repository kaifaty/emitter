declare type TListner = (...args: any[]) => void;
export declare class EventEmitter {
    private _events;
    private _once;
    private _onceData;
    on(event: string, listner: TListner): void;
    off(event: string, listner: TListner): void;
    offOnce(event: string, listner: TListner): void;
    onceData(event: string, listner: TListner, data: unknown): void;
    offOnceData(event: string, listner: TListner, data: unknown): void;
    once(event: string, listner: TListner): void;
    addEventListener(event: string, listner: TListner): void;
    dispatch(event: string, params?: any, data?: unknown): Promise<void>;
    emit(event: string, params: any, data?: unknown): void;
}
export {};
