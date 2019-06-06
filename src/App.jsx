import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
	constructor(props) {
    super(props);
    this.state = {
    	loading: true,
    	currentUser: "Anonymous", // optional. if currentUser is not defined, it means the user is Anonymous
		  messages: []
    };
  }

	CreateNewName = (event) => {
		if(event.key == 'Enter') {
			const nameInput = document.getElementById('chatbar-username');
			const newUserName = nameInput.value;
			console.log(newUserName);

			const newMessage = (this.state.currentUser + " changed the username to " + newUserName);
			const newText = {
		  	type: "postNotification",
		  	content: newMessage
		  };
		  this.socket.send(JSON.stringify(newText));
			this.setState({ currentUser: newUserName });
	}
}

handleMessageKeyPress = (event) => {
  if(event.key == 'Enter'){
    const messageInput = document.getElementById('chatbar-msg');
    var msg = messageInput.value;
	  // var chatbarUser = document.getElementById('chatbar-username');
	  var username = this.state.currentUser;
	  const oldMessages = this.state.messages;
	  const newText = {
	  	type: "postMessage",
	  	username: username,
	  	content: msg
	  };
	  const newMessage = [...oldMessages, newText];
    this.socket.send(JSON.stringify(newText));
    messageInput.value = "";
  }
}

componentDidMount() {
	this.socket = new WebSocket('ws://localhost:3001');
	this.socket.onopen = () => {
		console.log("Connected to server");
  	// this.socket.send('Welcome To Chatty!');
	};
	this.socket.onmessage = e => {
  	console.log(e.data)
	  const data = JSON.parse(e.data);
	  const oldMessages = this.state.messages;
	  const newText = {
		  	username: data.username,
		  	content: data.content
		};

  	const newMessage = [...oldMessages, newText];
		// this.socket.(e.data);
		this.setState({...this.state, messages: newMessage});

		switch(data.type) {
      case "incomingMessage":
        // handle incoming message
        this.state.currentUser
        break;
      case "incomingNotification":
        // handle incoming notification
        break;
      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + data.type);
    }
	}
};

render() {
    return (
    	<div>
    	<MessageList messages={this.state.messages}/>
	  	<ChatBar username={this.state.currentUser} CreateNewName={this.CreateNewName} handleMessageKeyPress={this.handleMessageKeyPress}/> 
    	</div>
    );
  }
}
export default App;
