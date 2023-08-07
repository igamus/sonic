import './ReactionsPanel.css'
import sanitizeHtml from 'sanitize-html';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { loadChannelMessagesThunk } from "../../store/messages";

let socket;

function ReactionsPanel({ message, userId, channelId }) {
    const dispatch = useDispatch();

    const reactions = message.reactions;
    const reducedReactions = reactions.reduce((acc, cv) => {
        let ind = -1;
        acc.forEach((e, i) => {
            if (e.emoji === cv.emoji) ind = i;
        });

        if (ind >= 0) {
            acc[ind].frequency += 1;
            acc[ind].ownerIds.push(cv.ownerId);
        } else {
            acc.push({
                emoji: cv.emoji,
                ownerIds: [cv.ownerId],
                frequency: 1
            });
        }

        return acc;
    }, []);

    return (
        <div className='reactions-panel'>
            {reducedReactions.map(reaction => {
                let className = "reaction";
                const val = "&#x" + reaction.emoji + ";"
                if (reaction.ownerIds.indexOf(userId) >= 0) {
                    className += " your-reaction"
                }
                return (
                    <span>
                        <button dangerouslySetInnerHTML={{__html: sanitizeHtml(val)}} className={className} value={reaction.emoji} />
                        {reaction.frequency}
                    </span>
                )
            }
            )}
        </div>
    );
};

export default ReactionsPanel;
