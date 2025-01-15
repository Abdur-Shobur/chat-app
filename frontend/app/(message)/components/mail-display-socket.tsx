'use client';
// MessageComponent.tsx
import { socket } from '@/lib';
import React, { useEffect, useState } from 'react';

const MessageComponent: React.FC = () => {
	const [messages, setMessages] = useState([]);
	const [messageText, setMessageText] = useState('');
	const userId = 'USER_ID'; // Replace with the actual user ID
	const receiverId = 'RECEIVER_ID'; // Replace with the receiver's user ID

	useEffect(() => {
		// Fetch initial messages
		socket.emit('getMessages', userId);

		// Listen for fetched messages
		socket.on('messages', (data) => {
			setMessages(data);
		});

		// Listen for new incoming messages
		socket.on('receiveMessage', (newMessage) => {
			setMessages((prevMessages) => [...prevMessages, newMessage]);
		});

		return () => {
			socket.off('messages');
			socket.off('receiveMessage');
		};
	}, [userId]);

	const sendMessage = () => {
		const message = {
			sender: userId,
			receiver: receiverId,
			text: messageText,
		};

		// Emit the message to the server
		socket.emit('sendMessage', message);

		// Optionally, update the local state for immediate feedback
		setMessages((prevMessages) => [
			...prevMessages,
			{ ...message, _id: Date.now() },
		]);
		setMessageText('');
	};

	return (
		<div>
			<div>
				<h3>Messages</h3>
				<ul>
					{messages.map((msg: any) => (
						<li key={msg._id}>
							<strong>{msg.sender === userId ? 'You' : 'Them'}:</strong>{' '}
							{msg.text}
						</li>
					))}
				</ul>
			</div>
			<div>
				<textarea
					value={messageText}
					onChange={(e) => setMessageText(e.target.value)}
					placeholder="Type your message here"
				/>
				<button onClick={sendMessage}>Send</button>
			</div>
		</div>
	);
};

export default MessageComponent;
