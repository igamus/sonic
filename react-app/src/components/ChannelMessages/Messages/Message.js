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
    const [isSending, setisSending]= useState(false);

    const user = useSelector(state => state.session.user)
    const channelMessages = useSelector(state => Object.values(state.messages))
    console.log('channelMessages:', channelMessages);
    let msgList;
    if (channelMessages.length) msgList = [...channelMessages];

    useEffect(() => {
        // open socket connection
        // create websocket
        socket = io();
        dispatch(loadChannelMessagesThunk(channelId));
        socket.on("chat", (chat) => {
            let msg = dispatch(loadChannelMessagesThunk(channelId));
            console.log('chat', chat);
            let msgArr = Object.values(msg)
            setMessages([...msgArr]);
            console.log('messages:', messages);
        })

        // if (channelMessages.length) setMessages([...channelMessages]);
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
                {channelMessages && msgList?.length > 0 && msgList.map((message, ind) => (
                    <>
                        {console.log('a message:', message)}
                        <div key={ind}>{`${message.user.username}: ${message.text}`}</div>
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
