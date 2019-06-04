import React, {Component} from 'react';

function ChatBar (props) {
		return (
			<footer className="chatbar">
			  <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={props.username} />
			  <input className="chatbar-message" placeholder="Type a message and hit ENTER"/>
			</footer> );
}

export default ChatBar;