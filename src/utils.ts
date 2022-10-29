import type {BaseName, BaseListener} from './types'

export const warn = (method: string, data: {
    event?: BaseName | number
    listener?: BaseListener
}) => {
    let warn = `[EventEmitter] method: ${method}`
    if(data.event){
        warn += `; Event - ${data.event.toString()}`
    }
    if(data.listener){
        warn += `; Event - ${data.listener}`
    }
    console.warn(warn)
}
