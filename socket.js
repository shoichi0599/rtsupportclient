import {EventEmitter} from 'events';

class Socket {
    constructor(ws = new WebSocket(), ee = new EventEmitter()) {
        this.ws = ws;
        this.ee = ee;
        ws.onmessage = this.message.bind(this);
        ws.onopen = this.open.bind(this);
        ws.onclose = this.close.bind(this);
    }
    on(name, fn) {
        this.ee.on(name, fn);
    }
    off(name, fn) {
        this.ee.removeListener(name, fn);
    }
    emit(name, data) {
        const message = JSON.stringify({name, data});
        this.ws.send(message);
    }
    message(e) {
        // const event = JSON.parse(e.data);
        // if (event.name === "channel add") {
        //     this.newChannel(event.data);
        // }
        try {
            const message = JSON.parse(e.data);
            this.ee.emit(message.name, message.data);
        } catch (e) {
            this.ee.emit('error', e)
        }
    }
    open(e) {
        // this.setState({connected: true});
        this.ee.emit('connect');
    }
    close(e) {
        // this.setState({connected: false});
        this.ee.emit('disconnect');
    }
}

export default Socket