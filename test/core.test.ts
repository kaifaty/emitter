import { EventEmitter } from "../src/core"

type Test = {
    login: (name: string, password: string) => void
}


test('Test "on" method', () => {
    const emitter = new EventEmitter<Test>()
    let user = ''
    let pass = ''
    emitter.on('login', (name, password) => {
        console.log(name, password)
        user = name 
        pass = password
    })
    emitter.emit('login', ['user', '123'])
    expect(user).toBe('user')
    expect(pass).toBe('123')
})

test('Test "off" method', () => {
    const emitter = new EventEmitter<Test>()
    const listner = () => {}
    emitter.on('login', listner)
    emitter.off('login', listner)
    expect(emitter.getListenersCount('login')).toBe(0)
})

test('Test "once" method', () => {
    const emitter = new EventEmitter<Test>()
    const listner = () => {}
    emitter.once('login', listner)
    emitter.emit('login', ['name', 'pass'])
    expect(emitter.getListenersCount('login')).toBe(0)
})

test('Test "onceData" method event remove', () => {
    const emitter = new EventEmitter<Test>()
    const listner = () => {}
    emitter.onceData('login', listner, 'token')
    emitter.emit('login', ['name', 'pass'], 'token')
    expect(emitter.getListenersCount('login')).toBe(0)
})

test('Test "onceData" method don\'t remove if wrong data in emit', () => {
    const emitter = new EventEmitter<Test>()
    const listner = () => {}
    emitter.onceData('login', listner, 'token')
    emitter.emit('login', ['name', 'pass'], 'token1')
    expect(emitter.getListenersCount('login')).toBe(1)
})
