import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

const Msg = {
  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
    {
      username: "Bob",
      content: "Has anyone seen my marbles?",
    },
    {
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    }
  ]
};


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

	componentDidMount() {
	  console.log("componentDidMount <App />");
	  setTimeout(() => {
	    console.log("Simulating incoming message");
	    // Add a new message to the list of messages in the data store
	    const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
	    const messages = this.state.messages.concat(newMessage)
	    // Update the state of the app component.
	    // Calling setState will trigger a call to render() in App and all child components.
	    this.setState({messages: messages})
	  }, 3000);
	}

	onSubmit = evt => {
    evt.preventDefault();
    const messageInput = evt.target.elements.newMessage;
    const username = evt.target.elements.username;
    const oldMessages = this.state.messages;
    const newMessage = [
      ...oldMessages,
      {
        username: username.value,
        content: messageInput.value
      }
    ];
    this.setState({ messages: newMessage });
    messageInput.value = "";
  };



  render() {
    return (
    	<div>
    	<MessageList messages={this.state.messages}/>
	  	<ChatBar username={this.state.currentUser.name} newMessage={this.onSubmit} /> 
    	</div>
    );
  }
}
export default App;
