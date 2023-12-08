import './ReactionsPanel.css'
import sanitizeHtml from 'sanitize-html';
import ReactionSelector from '../ReactionSelector';
import OpenModalButton from '../OpenModalButton';

function ReactionsPanel({ message, user, channelId, socket }) {
    const reactions = message.reactions;
    const reducedReactions = reactions.reduce((acc, cv) => {
        let ind = -1;
        acc.forEach((e, i) => {
            if (e.emoji === cv.emoji) ind = i;
        });

        if (ind >= 0) {
            acc[ind].ownerUsernames.push(cv.ownerUsername);
        } else {
            acc.push({
                emoji: cv.emoji,
                ownerUsernames: [cv.ownerUsername],
            });
        }

        return acc;
    }, []);

    return reducedReactions.length ? (
        <div className='reactions-panel'>
            {reducedReactions.map(reaction => {
                let className = "reaction";
                const val = "&#x" + reaction.emoji + ";"
                if (reaction.ownerUsernames.includes(user.username)) { // usernames must be unique
                    className += " your-reaction"
                }
                return (
                        <button title={reaction.ownerUsernames.join("\n")} dangerouslySetInnerHTML={{__html: sanitizeHtml(val) + " " + reaction.ownerUsernames.length}} className={className} value={reaction.emoji} onClick={(e) => {
                            if (e.target.className.includes("your-reaction")) {
                                socket.emit("delete_reaction", {"message_id": parseInt(message.id), "owner_id": parseInt(user.id), emoji: reaction.emoji})
                            } else {
                                socket.emit("react", {owner_id: parseInt(user.id), message_id: parseInt(message.id), emoji: reaction.emoji})
                            }
                        }} />
                )
            }
            )}
            <div style={{position: "sticky"}}>
                <OpenModalButton buttonText={<span className='add-reaction-button'><i className="fas fa-smile"></i> +</span>} className="reaction add-reaction" modalComponent={<ReactionSelector message={message} userId={user.id} channelId={channelId} socket={socket} />} />
                <div className='add-title'><div className='popper-text'>Add Reaction</div></div>
            </div>
        </div>
    ) : null;
};

export default ReactionsPanel;
