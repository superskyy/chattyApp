import React, {Component} from 'react';

function ChatBar (props) {
		return (
			// <form onSubmit={props.newMessage}>
			<footer className="chatbar">
			  <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={props.username} name="username" id="chatbar-username"/>
			  <input onKeyPress={props.handleMessageKeyPress} className="chatbar-message" placeholder="Type a message and hit ENTER" name="newMessage" id="chatbar-msg"/>

			</footer>
			// </form> 
			);
}

export default ChatBar;