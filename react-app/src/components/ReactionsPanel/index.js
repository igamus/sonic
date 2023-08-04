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

    const removeEmoji = () => {}; // handler for removing emoji
    // need a handler for adding emoji

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

    const removeSmileEmoji = (e) => {
        e.preventDefault();
        // need to id the emoji
        // need to emit to the socket to remove it
        // need, like, a factory to generate for each emoji
        // do you need to redo everything to give each react a value?
        // do you just need the values pertinent to the user?
    }

    return (
        <div>
            {reducedReactions.map(reaction => {
                let className = "";
                const val = "&#x" + reaction.emoji + ";"
                if (reaction.ownerIds.indexOf(userId) >= 0) {
                    className += 'your-reaction'
                }
                return (
                    <span>
                        <button dangerouslySetInnerHTML={{__html: sanitizeHtml(val)}} className={className} onClick={removeEmoji} />
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
