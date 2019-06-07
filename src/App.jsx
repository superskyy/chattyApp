import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
	constructor(props) {
    super(props);
    this.state = {
    	loading: true,
    	currentUser: "Anonymous",
		  messages: []
    };
  }

	CreateNewName = (event) => {
		if(event.key == 'Enter') {
			const nameInput = event.target.value;
			const newMessage = (this.state.currentUser + " changed the username to " + nameInput);
			const newText = {
		  	type: "postNotification",
		  	content: newMessage
		  };
		  this.socket.send(JSON.stringify(newText));
			this.setState({ currentUser: nameInput });
		}
	}

	handleMessageKeyPress = (event) => {
	  if(event.key == 'Enter'){
	    const messageInput = event.target.value;
		  const username = this.state.currentUser;
		  const oldMessages = this.state.messages;
		  const newText = {
		  	type: "postMessage",
		  	username: username,
		  	content: messageInput
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
		};
		this.socket.onmessage = e => {
		  const data = JSON.parse(e.data);
			if (data.type === "incomingMessage" || data.type === "incomingNotification") {
			  const oldMessages = this.state.messages;
			  const newText = {
			  		id: data.id,
				  	username: data.username,
				  	content: data.content
				};
				const newMessage = [...oldMessages, newText];
				this.setState({...this.state, messages: newMessage});
			}
			if (data.type === "counter" ) {
				this.setState({size: data.size});
			}
			}
	};
	render() {
	  return (
	  	<div>
	    	<nav className="navbar">
					<a href="/" className="navbar-brand">Chatty</a>
					<p className="users-online">{this.state.size} Users Online</p>
				</nav>
	    	<MessageList messages={this.state.messages}/>
		  	<ChatBar username={this.state.currentUser} CreateNewName={this.CreateNewName} handleMessageKeyPress={this.handleMessageKeyPress}/> 
	  	</div>
	  );
	}
}
export default App;
