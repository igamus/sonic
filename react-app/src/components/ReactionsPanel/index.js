import './ReactionsPanel.css'
import sanitizeHtml from 'sanitize-html';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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

    const removeEmoji = () => {}; // handler for removing emoji
    // need a handler for adding emoji

    // make this websockets
    useEffect(() => {
        socket = io();
        console.log("connected (reactions)");
        socket.on("react", (react) => {
            dispatch(loadChannelMessagesThunk(channelId)) // channelId -- maybe you need to update the thunk to rerender the reactions
        })

        return (() => {
            console.log("disconnected (reactions)");
            socket.disconnect();
        })
    }, []); // reactId? Won't fix the fact that it doesn't send

    const addSmileEmoji = (e) => {
        e.preventDefault();
        console.log("Yeah, you're sending this")
        console.log("Hey:", {owner_id: userId, message_id: message.id, emoji: "1F600"})
        socket.emit("react", {owner_id: userId, message_id: message.id, emoji: "1F600" });
    }

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
            <button onClick={e => addSmileEmoji(e)}>Add smiley face</button>
        </div>
    );
};

export default ReactionsPanel;
