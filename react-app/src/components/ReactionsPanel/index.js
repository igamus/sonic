import './ReactionsPanel.css'
import sanitizeHtml from 'sanitize-html';
import ReactionSelector from '../ReactionSelector';
import OpenModalButton from '../OpenModalButton';

function ReactionsPanel({ message, userId, channelId, socket }) {
    const reactions = message.reactions;
    const reducedReactions = reactions.reduce((acc, cv) => {
        let ind = -1;
        acc.forEach((e, i) => {
            if (e.emoji === cv.emoji) ind = i;
        });

        if (ind >= 0) {
            acc[ind].frequency += 1;
            acc[ind].ownerIds.push(cv.ownerId);
            acc[ind].ownerUsernames.push(cv.ownerUsername);
        } else {
            acc.push({
                emoji: cv.emoji,
                ownerIds: [cv.ownerId],
                ownerUsernames: [cv.ownerUsername],
                frequency: 1
            });
        }

        return acc;
    }, []);

    return reducedReactions.length ? (
        <div className='reactions-panel'>
            {reducedReactions.map(reaction => {
                let className = "reaction";
                const val = "&#x" + reaction.emoji + ";"
                if (reaction.ownerIds.indexOf(userId) >= 0) {
                    className += " your-reaction"
                }
                return (
                        <button title={reaction.ownerUsernames.join("\n")} dangerouslySetInnerHTML={{__html: sanitizeHtml(val) + " " + reaction.frequency}} className={className} value={reaction.emoji} onClick={(e) => {
                            if (e.target.className.includes("your-reaction")) {
                                socket.emit("delete_reaction", {"message_id": parseInt(message.id), "owner_id": parseInt(userId), emoji: reaction.emoji})
                            } else {
                                socket.emit("react", {owner_id: parseInt(userId), message_id: parseInt(message.id), emoji: reaction.emoji})
                            }
                        }} />
                )
            }
            )}
            <div style={{position: "sticky"}}>
                <OpenModalButton buttonText={<span className='add-reaction-button'><i className="fas fa-smile"></i> +</span>} className="reaction add-reaction" modalComponent={<ReactionSelector message={message} userId={userId} channelId={channelId} socket={socket} />} />
                <div className='add-title'><div className='popper-text'>Add Reaction</div></div>
            </div>
        </div>
    ) : null;
};

export default ReactionsPanel;
