import "./ReactionSelector.css";
import normalizedEmojis from "../../utils/normalizedEmojis.json";
import sanitizeHtml from "sanitize-html";
import { useModal } from "../../context/Modal";


function ReactionSelector({ userId, message, socket }) {
    const { closeModal } = useModal();

    const userReactions = message.reactions.filter(reaction => reaction.ownerId === userId).map(reaction => reaction.emoji)

    const handleClick = (e, emoji) => {
        e.preventDefault();
        if (userReactions.includes(emoji)) {
            socket.emit("delete_reaction", {"message_id": parseInt(message.id), "owner_id": parseInt(userId), emoji: emoji})
        } else {
            socket.emit("react", {owner_id: parseInt(userId), message_id: parseInt(message.id), emoji: emoji})
        }
        closeModal();
    };

    const emojiGroups = Object.keys(normalizedEmojis);

    return (
        <div className="panel-selector">
            {emojiGroups.map(group => (
                <>
                    <section key={group} className="reaction-group">
                        <h2 key={`${group}-header`} className="reaction-group-header">{group.toUpperCase()}</h2>
                        <div key={`${group}-container`} className="reaction-group-container">
                            {Object.values(normalizedEmojis[group]).map(emoji => {
                                let className = "panel-reaction";
                                if (userReactions.includes(emoji.code)) className += " user-owns";
                                const val = "&#x" + emoji.code + ";"
                                return (<span key={`emoji-panel-${emoji.code}`} title={emoji.name} className={className} onClick={(e) => handleClick(e, emoji.code)} value={`${emoji.code}`} dangerouslySetInnerHTML={{__html: sanitizeHtml(val)}} />)
                            })}
                        </div>
                    </section>
                </>
            ))}
        </div>
    );
};

export default ReactionSelector;
