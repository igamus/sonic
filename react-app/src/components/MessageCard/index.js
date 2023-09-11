import "./MessageCard.css";
import ReactionsPanel from "../ReactionsPanel";
import OpenModalButton from "../OpenModalButton";
import ReactionSelector from "../ReactionSelector";

function MessageCard({ message, userId, channelId, socket }) {
    return (
        <div className="message-card">
            <div className="user-row">
                <h4 className="message-username">{message.user.username}</h4>
                <OpenModalButton buttonText={"Add Reaction"} modalComponent={<ReactionSelector message={message} userId={userId} socket={socket} />} className="reaction-panel-button" />
            </div>
            <p className="message-text">{message.text}</p>
            <ReactionsPanel message={message} userId={userId} channelId={channelId} socket={socket} />
        </div>
    )
};

export default MessageCard;
