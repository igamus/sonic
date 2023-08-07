import './MessagePane.css';
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from 'socket.io-client';
import { loadChannelMessagesThunk } from "../../store/messages";
import MessageCard from '../MessageCard';

let socket;

const Chat = ({ channelId }) => {
    const dispatch = useDispatch();
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [isSending, setisSending]= useState(false);
    const [savedChannelId, setSavedChannelId] = useState(0);
    const [disableButton, setDisableButton] = useState(false);
    const [inputClassName, setInputClassName] = useState("");
    const [enterWarning, setEnterWarning] = useState(false);

    if (channelId !== savedChannelId) {
        setChatInput("");
        dispatch(loadChannelMessagesThunk(channelId))
        setSavedChannelId(channelId);
    };

    const user = useSelector(state => state.session.user)
    const channelMessages = useSelector(state => Object.values(state.messages))
    let msgList;
    if (channelMessages.length) msgList = [...channelMessages];

    useEffect(() => {
        socket = io();
        console.log('connect (chat)');
        socket.on("chat", (chat) => {
            let msg = dispatch(loadChannelMessagesThunk(channelId));
            let msgArr = Object.values(msg)
            setMessages([...msgArr]);
        })

        return (() => {
            console.log('disconnect (chat)');
            socket.disconnect()
        })
    }, [channelId]);

    useEffect(() => {
        setDisableButton(false);
        setEnterWarning(false)
        setInputClassName("")

        if (chatInput.length > 500) {
            setDisableButton(true);
            setInputClassName("chat-error");
        }

        if (chatInput.indexOf("\n") > 0) {
            setEnterWarning(true);
        }
    }, [chatInput]);

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

    const deleteMessage = (e) => {
        e.preventDefault();
        socket.emit("delete_message", {"message_id": parseInt(e.target.value)})
    }

    const handleEnter = (e) => {
        e.preventDefault();
        if (e.shiftKey) {
            return setEnterWarning(true);
        }
        if (e.key === "Enter" && !disableButton) {
            console.log("keypress is Enter")
            sendChat(e);
        }
    }

    return (messages && (
        <div className='message-main'>
            <div>
                {
                    channelMessages && msgList?.length > 0
                        ?
                    <>{msgList.map((message, ind) => (
                        <div key={`message-container-${ind}`}>
                            <MessageCard key={ind} message={message} userId={user.id} channelId={channelId} />
                            {message.owner_id === user.id ? <button onClick={deleteMessage} value={message.id} className="delete-message-button">Pretend this never happened (Delete)</button> : null}
                        </div>
                    ))}</>
                        :
                    <p>Be the first to say something!</p>
                }
            </div>
            <form className='message-form' onSubmit={sendChat}>
                <textarea
                    rows={3}
                    className='chatbox'
                    value={chatInput}
                    onChange={updateChatInput}
                    onKeyUp={(e) => handleEnter(e)}
                />
                <button className='chat-button' disabled={!!disableButton} type="submit">Send</button>
                {disableButton ? <p className='chat-error'>Messages must be less than 500 characters.</p> : null}
                {enterWarning ? <p className='chat-error'> Note: Line breaks are not preserved</p> : null}
                <p className={inputClassName + " message-input"}>Character count: {chatInput.length}/500</p>
            </form>
        </div>
    )
    )
};


export default Chat;
