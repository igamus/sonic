import './ReactionsPanel.css'
import sanitizeHtml from 'sanitize-html';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { loadChannelMessagesThunk } from "../../store/messages";
import OpenModalButton from "../OpenModalButton"; // test the text set
import ReactionSelector from '../ReactionSelector';

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

    useEffect(() => {
        socket = io();
        console.log("connected (reactions)");
        socket.on("react", (react) => {
            dispatch(loadChannelMessagesThunk(channelId))
        })

        return (() => {
            console.log("disconnected (reactions)");
            socket.disconnect();
        })
    }, []); // reactId?

    const removeEmoji = (e) => {
        e.preventDefault();
        console.log(e.target.className)
        // only if userId == ownerId to reaction
        if (e.target.className === "your-reaction") {
            socket.emit("delete_reaction", {"message_id": parseInt(message.id), "owner_id": parseInt(userId), emoji: e.target.value})
        }
    }

    return (
        <div>
            {reducedReactions.map(reaction => {
                let className = "";
                const val = "&#x" + reaction.emoji + ";"
                if (reaction.ownerIds.indexOf(userId) >= 0) {
                    className += "your-reaction"
                }
                return (
                    <span>
                        <button dangerouslySetInnerHTML={{__html: sanitizeHtml(val)}} className={className} onClick={removeEmoji} value={reaction.emoji} />
                        {reaction.frequency}
                    </span>
                )
            }
            )}
            <OpenModalButton buttonText={"+"} modalComponent={<ReactionSelector channelId={channelId} messageId={message.id} userId={userId} />} />
        </div>
    );
};

export default ReactionsPanel;
