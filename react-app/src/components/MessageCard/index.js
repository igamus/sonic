import "./MessageCard.css";
import ReactionsPanel from "../ReactionsPanel";

function MessageCard({ message, userId, channelId }) {
    return (
        <div className="message-card">
            <h4 className="message-username">{message.user.username}</h4>
            <p className="message-card">{message.text}</p>
            <ReactionsPanel message={message} userId={userId} channelId={channelId} />
        </div>
    )
};

export default MessageCard;
