import './MessagePane.css';
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from 'socket.io-client';
import { loadChannelMessagesThunk } from "../../store/messages";
import MessageCard from '../MessageCard';

let socket;

const Chat = ({ channel }) => {
    const dispatch = useDispatch();
    const endRef = useRef(null);
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [messagesLoaded, setMessagesLoaded] = useState(false);
    const [isSending, setisSending]= useState(false);
    const [savedChannelId, setSavedChannelId] = useState(0);
    const [disableButton, setDisableButton] = useState(false);
    const [inputClassName, setInputClassName] = useState("");
    const [enterWarning, setEnterWarning] = useState(false);

    if (channel.id !== savedChannelId) {
        setChatInput("");
        dispatch(loadChannelMessagesThunk(channel.id)).then(() => setMessagesLoaded(true));
        setSavedChannelId(channel.id);
    };

    const user = useSelector(state => state.session.user)
    const channelMessages = useSelector(state => Object.values(state.messages))
    let msgList;
    if (channelMessages.length) msgList = [...channelMessages];

    const scrollDown = () => {
        endRef.current?.scrollIntoView({behavior: "smooth"})
    };

    useEffect(() => {
        scrollDown();
    }, [msgList]);

    useEffect(() => {
        socket = io();
        socket.on("chat", (chat) => {
            let msg = dispatch(loadChannelMessagesThunk(channel.id));
            let msgArr = Object.values(msg)
            setMessages([...msgArr]);
        })

        socket.on("react", (react) => dispatch(loadChannelMessagesThunk(channel.id)));

        return (() => {
            socket.disconnect()
        })
    }, [channel.id]);

    useEffect(() => {
        setDisableButton(false);
        setEnterWarning(false)
        setInputClassName("")

        if (chatInput.length > 500) {
            setDisableButton(true);
            setInputClassName("yes-error");
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
        if (!(chatInput.trim().length === 0)) {
            setisSending(true);
            socket.emit("chat", { owner_id: user.id, text: chatInput, channel_id: channel.id });
            setisSending(false);
            setChatInput("")
        }
    }

    const handleEnter = (e) => {
        e.preventDefault();
        if (e.shiftKey) {
            return setEnterWarning(true);
        }
        if (e.key === "Enter" && !disableButton) {
            sendChat(e);
        } else return;
    }

    return (setMessagesLoaded && (
        <>
            <h2 className='message-header'><i className="fas fa-hashtag"></i> {channel.name}</h2>
            <div className='message-main'>
                {
                    channelMessages && msgList?.length > 0
                        ?
                    <>{msgList.map((message, ind) => (
                        <MessageCard key={ind} message={message} userId={user.id} channelId={channel.id} socket={socket} />
                    ))}</>
                        :
                    <p>Be the first to say something!</p>
                }
                <div ref={endRef} />
            </div>
            <form className='message-form' onSubmit={sendChat}>
                <textarea
                    rows={1}
                    className='chatbox'
                    placeholder={`Message #${channel.name}`}
                    value={chatInput}
                    onChange={updateChatInput}
                    onKeyUp={(e) => handleEnter(e)}
                />
                {disableButton ? <p className='chat-error'>Messages must be less than 500 characters ({chatInput.length}/500)</p> : null}
                {/* {enterWarning ? <p className='chat-error'> Note: Line breaks are not preserved</p> : null} */}
                <p className={inputClassName + " message-input"}>Character count: {chatInput.length}/500</p>
            </form>
        </>
    )
    )
};


export default Chat;
