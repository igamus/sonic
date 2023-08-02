import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from 'socket.io-client';
import { loadChannelMessagesThunk } from "../../../store/messages";
let socket;

const Chat = () => { // pull channel id in?
    let channelId = 4; // temp hardcode 4 testing; this channel has messages. how should things work in the front & back when there are no messages in a channel?
    const dispatch = useDispatch();
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [isSending, setisSending]= useState(false)

    const user = useSelector(state => state.session.user)
    const channelMessages = useSelector(state => Object.values(state.messages))
    if (channelMessages.length) setMessages([...channelMessages]);
    useEffect(() => {
        // open socket connection
        // create websocket
        socket = io();
        // const dbMessages = dispatch(loadChannelMessagesThunk(channelId));
        // if (dbMessages.length) setMessages([...dbMessages]);

        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, [])

    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    };

    const sendChat = (e) => {
        e.preventDefault()
        setisSending(true);
        socket.emit("chat", { owner_id: user.id, text: chatInput, channel_id: channelId });
        setisSending(false);
        setChatInput("")
    }

    return (messages && (
        <div>
            <div>
                {/* Each message will be a 'Message' component */}
                {messages.map((message, ind) => (
                    <>
                        {console.log(message)}
                        <div key={ind}>{`${message.user}: ${message.text}`}</div>
                    </>
                ))}
            </div>
            <form onSubmit={sendChat}>
                <input
                    value={chatInput}
                    onChange={updateChatInput}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    )
    )
};


export default Chat;
