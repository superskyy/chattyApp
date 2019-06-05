import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
	constructor(props) {
    super(props);
    this.state = {
    	loading: true,
    	currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
		  messages: [
		    {
		    	id: 1,
		      username: "Bob",
		      content: "Has anyone seen my marbles?",
		    },
		    {
		    	id: 2,
		      username: "Anonymous",
		      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
		    }
		  ]
    };
  }


handleMessageKeyPress = (event) => {
  if(event.key == 'Enter'){
    var messageInput = document.getElementById('chatbar-msg');
    var msg = messageInput.value;

	  var chatbarUser = document.getElementById('chatbar-username');
	  var username = chatbarUser.value;
	  const oldMessages = this.state.messages;
	    const newMessage = [
	      ...oldMessages,
	      {
	        username: username,
	        content: msg
	      }
	    ];
	    
	    this.setState({ messages: newMessage });
	    messageInput.value = "";
  }
}

componentDidMount() {
  const url = 'wss://0.0.0.0:3001';
	const connection = new WebSocket(url);
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
