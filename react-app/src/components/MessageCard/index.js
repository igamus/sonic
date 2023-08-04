import "./MessageCard.css";
import ReactionsPanel from "../ReactionsPanel";

function MessageCard({ message, userId, channelId }) {
    return (
        <div>
            <h4>{message.user.username}</h4>
            <p>{message.text}</p>
            <ReactionsPanel message={message} userId={userId} channelId={channelId} />
        </div>
    )
};

export default MessageCard;
