import React, {Component} from 'react';
import ChannelSection from './channels/ChannelSection.jsx';
import UserSection from './users/UserSection.jsx';
import MessageSection from "./messages/MessageSection.jsx";
import Socket from '../socket.js'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            channels: [],
            users: [],
            messages: [],
            activeChannel: {name: "Select A Channel"},
            connected: false
        };
    }
    componentDidMount() {
        let ws = this.ws = new WebSocket("ws://localhost:4000");
        let socket = this.socket = new Socket(ws);
        socket.on('connect', this.onConnect.bind(this));
        socket.on('disconnect', this.onDisconnect.bind(this));
        socket.on('channel add', this.onAddChannel.bind(this));
        socket.on('user add', this.onAddUser.bind(this));
        socket.on('user edit', this.onEditUser.bind(this));
        socket.on('user remove', this.onRemoveUser.bind(this));
        socket.on('message add', this.onMessageAdd.bind(this));
        // let ws = this.ws = new WebSocket("ws://echo.websocket.org");
        // Event handlers
        // ws.onmessage = this.message.bind(this);
        // ws.onopen = this.open.bind(this);
        // ws.onclose = this.close.bind(this);
    }
    onConnect() {
        this.setState({connected: true});
        this.socket.emit('channel subscribe');
        this.socket.emit('user subscribe');
    }
    onDisconnect() {
        this.setState({connected: false});
    }
    onAddChannel(channel) {
        let {channels} = this.state;
        channels.push(channel);
        this.setState({channels});
    }
    onAddUser(user) {
        let {users} = this.state;
        users.push(user);
        this.setState({users});
    }
    onEditUser(editUser) {
        let {users} = this.state;
        users = users.map(user => {
            if (editUser.id === user.id) {
                return editUser;
            }
            return user;
        });
        this.setState({users});
    }
    onRemoveUser(removeUser) {
        let {users} = this.state;
        users = users.filter(user => {
            return user.id !== removeUser.id;
        });
        this.setState({users});
    }
    onMessageAdd(message) {
        let {messages} = this.state;
        messages.push(message);
        this.setState({messages});
    }
    // message(e) {
    //     const event = JSON.parse(e.data);
    //     if (event.name === "channel add") {
    //         this.newChannel(event.data);
    //     }
    // }
    // open(e) {
    //     this.setState({connected: true});
    // }
    // close(e) {
    //     this.setState({connected: false});
    // }
    addChannel(name) {
        // let {channels} = this.state;
        // // channels.push({id: channels.length, name});
        // // this.setState({channels});
        // // TODO: Send to server
        // let msg = {
        //     name: "channel add",
        //     data: {
        //         id: channels.length,
        //         name
        //     }
        // };
        // this.ws.send(JSON.stringify(msg));
        this.socket.emit('channel add', {name});
    }
    setChannel(activeChannel) {
        this.setState({activeChannel});
        // TODO: Get Channels Messages
        this.socket.emit('message unsubscribe');
        this.setState({message: []});
        this.socket.emit('message subscribe', {channelId: activeChannel.id});
    }
    setUserName(name) {
        let {users} = this.state;
        users.push({id: users.length, name});
        this.setState({users});
        // TODO: Send to server
        this.socket.emit('user edit', {name});
    }
    addMessage(body) {
        // let {messages, users} = this.state;
        // let createdAt = new Date;
        // let author = user.length > 0 ? users[0].name : 'anonymous';
        // messages.push({id: messages.length, body, createdAt, author});
        // this.setState({messages});
        // TODO: Send to server
        let {activeChannel} = this.state;
        this.socket.emit('message add', {channelId: activeChannel.id, body});
    }
    render() {
        return (
            <div className="app">
                <div className="nav">
                    <ChannelSection
                        {...this.state}
                        addChannel={this.addChannel.bind(this)}
                        setChannel={this.setChannel.bind(this)}
                    />
                    <UserSection
                        {...this.state}
                        setUserName={this.setUserName.bind(this)}
                    />
                </div>
                <MessageSection
                    {...this.state}
                    addMessage={this.addMessage.bind(this)}
                />
            </div>
        )
    }
}

export default App