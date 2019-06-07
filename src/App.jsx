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
	    const msg = messageInput.value;
		  // const chatbarUser = document.getElementById('chatbar-username');
		  const username = this.state.currentUser;
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

	// getUsers = () => {
	// 	const count = JSON.parse(this.state.size);
	// 	this.setState({size: count});
	// }

	componentDidMount() {
		this.socket = new WebSocket('ws://localhost:3001');
		this.socket.onopen = () => {
			console.log("Connected to server");
		};
		this.socket.onmessage = e => {
	  	console.log(e.data)
		  const data = JSON.parse(e.data);
			if (data.type === "incomingMessage") {
			  const oldMessages = this.state.messages;
			  const newText = {
				  	username: data.username,
				  	content: data.content
				};
				const newMessage = [...oldMessages, newText];
				this.setState({...this.state, messages: newMessage});
				return;
			}
	  	
			if (data.type === "counter") {
				this.setState({size: data.size});
				return;
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
