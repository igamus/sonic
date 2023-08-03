import "./MessageCard.css";
import OpenModalButton from "../OpenModalButton";
import DeleteModal from "../DeleteModal";
import ReactionsPanel from "../ReactionsPanel";

function MessageCard({ message, userId }) {
    return (
        <div>
            <div>
                <h4>{message.user.username}</h4>
                {message.user.id === userId ? <OpenModalButton buttonText={"Delete"} modalComponent={<DeleteModal type={"message"} id={message.id} />} /> : null}
            </div>
            <p>{message.text}</p>
            <ReactionsPanel message={message} userId={userId} />
        </div>
    )
};

export default MessageCard;
