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
  render() {
    return (
    	<div>
    	<MessageList messages={this.state.messages}/>
    	<ChatBar username={this.state.currentUser.name} />
    	</div>
    );
  }
}
export default App;
