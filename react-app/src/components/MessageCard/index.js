import "./MessageCard.css";
import ReactionsPanel from "../ReactionsPanel";
import OpenModalButton from "../OpenModalButton";
import ReactionSelector from "../ReactionSelector";

function MessageCard({ message, userId, channelId }) {
    return (
        <div className="message-card">
            <div className="user-row">
                <h4 className="message-username">{message.user.username}</h4>
                <OpenModalButton buttonText={"React +"} modalComponent={<ReactionSelector channelId={channelId} message={message} userId={userId} />} className="react-button" />
            </div>
            <p className="message-text">{message.text}</p>
            <ReactionsPanel message={message} userId={userId} channelId={channelId} />
        </div>
    )
};

export default MessageCard;
