import "./ReactionSelector.css";
import { emojiList } from "../../utils/emojiList";
import sanitizeHtml from "sanitize-html";
import { useModal } from "../../context/Modal";


function ReactionSelector({ userId, message, socket }) {
    const { closeModal } = useModal();

    console.log("message", message);
    const userReactions = message.reactions.filter(reaction => reaction.ownerId === userId).map(reaction => reaction.emoji)
    console.log("userReactions:", userReactions)

    const handleClick = (e, emoji) => {
        e.preventDefault();
        console.log("for message:", message.id)
        if (userReactions.includes(emoji)) {
            console.log("remove an emoji", emoji);
            socket.emit("delete_reaction", {"message_id": parseInt(message.id), "owner_id": parseInt(userId), emoji: emoji})
        } else {
            console.log("emit an emoji", emoji);
            socket.emit("react", {owner_id: parseInt(userId), message_id: parseInt(message.id), emoji: emoji})
        }
        closeModal();
    };
    return (
        <div className="panel-selector">
            {emojiList.map(emoji => {
                let className = "panel-reaction";
                if (userReactions.includes(emoji)) className += " user-owns";
                const val = "&#x" + emoji + ";"
                return (<span key={`emoji-panel-${emoji}`} className={className} onClick={(e) => handleClick(e, emoji)} value={`${emoji}`} dangerouslySetInnerHTML={{__html: sanitizeHtml(val)}} />)
            })}
        </div>
    );
};

export default ReactionSelector;
