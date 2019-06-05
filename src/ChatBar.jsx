import React, {Component} from 'react';

function ChatBar (props) {
		return (
			<form onSubmit={props.newMessage}>
			<footer className="chatbar">
			  <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={props.username} name="username"/>
			  <input className="chatbar-message" placeholder="Type a message and hit ENTER" name="newMessage"/>
				<button type="submit">Send</button>
			</footer>
			</form> );
}

export default ChatBar;