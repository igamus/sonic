import "./MessageCard.css";
import OpenModalButton from "../OpenModalButton";
import DeleteModal from "../DeleteModal";
import ReactionsPanel from "../ReactionsPanel";

function MessageCard({ message, userId }) {
    return (
        <div>
            <h4>{message.user.username}</h4>
            <p>{message.text}</p>
            <ReactionsPanel message={message} userId={userId} />
        </div>
    )
};

export default MessageCard;
