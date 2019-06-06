import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
	constructor(props) {
    super(props);
    this.state = {
    	loading: true,
    	currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
		  messages: []
    };
  }


handleMessageKeyPress = (event) => {
  if(event.key == 'Enter'){
    var messageInput = document.getElementById('chatbar-msg');
    var msg = messageInput.value;

	  var chatbarUser = document.getElementById('chatbar-username');
	  var username = chatbarUser.value;
	  const oldMessages = this.state.messages;

	  const newText = {
	  	username: username,
	  	content: msg
	  };

	  const newMessage = [...oldMessages, newText];

    this.socket.send(JSON.stringify(newText));
    this.setState({ messages: newMessage });

    // this.socket.send(JSON.parse(newText));
    messageInput.value = "";
  }
}

componentDidMount() {

	this.socket = new WebSocket('ws://localhost:3001');

	this.socket.onopen = () => {
		console.log("Welcome to Chatty");
  	// this.socket.send('Welcome To Chatty!');
	};
	this.socket.onmessage = e => {
  console.log(e.data)
  const parsed = JSON.parse(e.data);
  const oldMessages = this.state.messages;
  const newText = {
	  	username: parsed.username,
	  	content: parsed.content
	  };

  const newMessage = [...oldMessages, newText];
	// this.socket.(e.data);
	this.setState({...this.state, messages: newMessage});
	}
};

render() {
    return (
    	<div>
    	<MessageList messages={this.state.messages}/>
	  	<ChatBar username={this.state.currentUser.name} handleMessageKeyPress={this.handleMessageKeyPress}/> 
    	</div>
    );
  }
}
export default App;
