import "./ReactionSelector.css";
import { useEffect } from "react";
import { emojiList } from "../../utils/emojiList";
import sanitizeHtml from "sanitize-html";
import { useModal } from "../../context/Modal";
import { io } from "socket.io-client";
import { loadChannelMessagesThunk } from "../../store/messages";
import { useDispatch } from "react-redux";

let socket;

function ReactionSelector({ channelId, userId, messageId }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    useEffect(() => {
        socket = io();
        console.log("connected (reaction selector)")
        socket.on("react", (react) => dispatch(loadChannelMessagesThunk(channelId))); // take in channelId, message
        return (() => {
            setTimeout(() => {
                console.log("disconnected (reaction selector)");
                socket.disconnect();
            }, 60000)
        })
    }, [dispatch, channelId]);

    const handleClick = (e, emoji) => {
        e.preventDefault();
        console.log("emit an emoji", emoji);
        console.log("for message:", messageId)
        socket.emit("react", {owner_id: userId, message_id: messageId, emoji: emoji})
        closeModal();
    };
    return (
        <div>
            {emojiList.map(emoji => {
                const val = "&#x" + emoji + ";"
                return (<span className="panel-reaction" onClick={(e) => handleClick(e, emoji)} value={`${emoji}`} dangerouslySetInnerHTML={{__html: sanitizeHtml(val)}} />)
            })}
        </div>
    );
};

export default ReactionSelector;
