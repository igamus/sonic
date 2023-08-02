import './MessagePane.css';
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from 'socket.io-client';
import { loadChannelMessagesThunk } from "../../store/messages";
let socket;

const Chat = ({ channelId }) => {
    // let channelId = 4; // temp hardcode 4 testing; this channel has messages. how should things work in the front & back when there are no messages in a channel?
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
        console.log('connect');
        dispatch(loadChannelMessagesThunk(channelId));
        socket.on("chat", (chat) => {
            let msg = dispatch(loadChannelMessagesThunk(channelId));
            let msgArr = Object.values(msg)
            setMessages([...msgArr]);
        })

        return (() => {
            console.log('disconnect');
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
                {
                    channelMessages && msgList?.length > 0
                        ?
                    <>{msgList.map((message, ind) => (
                        <>
                            <div key={ind}>{`${message.user.username}: ${message.text}`}</div>
                        </>
                    ))}</>
                        :
                        <p>Be the first to say something!</p>
                }
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
