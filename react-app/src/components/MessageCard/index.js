import "./MessageCard.css";
import OpenModalButton from "../OpenModalButton";
import DeleteModal from "../DeleteModal";

function MessageCard({ message, userId }) {
    return (
        <div>
            <div>
                <h4>{message.user.username}</h4>
                {message.user.id === userId ? <OpenModalButton buttonText={"Delete"} modalComponent={<DeleteModal type={"message"} id={message.id} />} /> : null}
            </div>
            <p>{message.text}</p>
        </div>
    )
};

export default MessageCard;
