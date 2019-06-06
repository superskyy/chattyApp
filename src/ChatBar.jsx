import React, {Component} from 'react';

function ChatBar (props) {
		return (
			<footer className="chatbar">
			  <input onKeyPress={props.CreateNewName} className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={props.username} name="username" id="chatbar-username"/>
			  <input onKeyPress={props.handleMessageKeyPress} className="chatbar-message" placeholder="Type a message and hit ENTER" name="newMessage" id="chatbar-msg"/>
			</footer>
			);
}

export default ChatBar;