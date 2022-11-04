export type BaseListener = (...args: any[]) => void
export type BaseName = string | symbol
export type BaseMap = {[key: BaseName]: BaseListener}


export type Events<T extends BaseMap> = keyof T
export type Listeners<T extends BaseMap> = T[Events<T>]

export type Listener<T extends BaseMap, Event extends Events<T>> = T[Event]
export type ListnerArgs<T extends BaseMap, Event extends Events<T>> = Parameters<Listener<T, Event>>

export type Store<T extends BaseMap> = Record<Events<T>, Array<Listeners<T>>>
export type StoreWithData<T extends BaseMap> = Record<Events<T>, Array<{
    data: unknown,
    listener: Listeners<T>
}>>

