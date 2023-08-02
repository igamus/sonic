import './MessagePane.css';
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from 'socket.io-client';
import { loadChannelMessagesThunk } from "../../store/messages";
let socket;

const Chat = ({ channelId }) => {
    console.log("channelId:", channelId);
    const dispatch = useDispatch();
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [isSending, setisSending]= useState(false);
    const [savedChannelId, setSavedChannelId] = useState(0);
    const [channelFlip, setChannelFlip] = useState(false);

    if (channelId !== savedChannelId) {
        setChatInput("");
        console.log("component start DISPATCH FROM channelId:", channelId)
        dispatch(loadChannelMessagesThunk(channelId))
        setSavedChannelId(channelId);
    };

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
        // dispatch(loadChannelMessagesThunk(channelId));
        socket.on("chat", (chat) => {
            // emit comes from here which isn't necessarily updating when you changge the channel -- wait, maybbe not
            console.log("emit DISPATCH FROM savedchannelId:", channelId)
            let msg = dispatch(loadChannelMessagesThunk(channelId)); // was savedchannel
            let msgArr = Object.values(msg)
            setMessages([...msgArr]);
        })

        return (() => {
            console.log('disconnect');
            socket.disconnect()
        })
    }, [channelId])

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
