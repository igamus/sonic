import "./MessageCard.css";
import ReactionsPanel from "../ReactionsPanel";
import OpenModalButton from "../OpenModalButton";
import ReactionSelector from "../ReactionSelector";

function MessageCard({ message, userId, channelId, socket }) {
    const deleteMessage = (e) => {
        e.preventDefault();
        socket.emit("delete_message", {"message_id": parseInt(e.target.id)})
    }

    return (
        <div className="message-card">
            <div className="user-row">
                <h4 className="message-username">{message.user.username}</h4>
                <div className="features">
                    {message.owner_id === userId ? <i title="Delete message" onClick={deleteMessage} id={message.id} value={message.id} className="fas fa-trash-alt delete-message-button"></i> : null}
                    <OpenModalButton buttonText={<span title="Add reaction"><i className="fas fa-smile"></i> +</span>} modalComponent={<ReactionSelector message={message} userId={userId} socket={socket} />} className="reaction-panel-button" />
                </div>
            </div>
            <p className="message-text">{message.text}</p>
            <ReactionsPanel message={message} userId={userId} channelId={channelId} socket={socket} />
        </div>
    )
};

export default MessageCard;
