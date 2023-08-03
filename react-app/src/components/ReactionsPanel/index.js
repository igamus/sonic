import './ReactionsPanel.css'
import sanitizeHtml from 'sanitize-html';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react";
import { io } from "socket.io-client";
import { loadChannelMessagesThunk } from "../../store/messages";

let socket;

function ReactionsPanel({ message, userId }) {
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
            // dispatch(findAspo(spotId)) // => reloads the spot, so we'll want to reload the message/reactions
            loadChannelMessagesThunk() // channelId -- maybe you need to update the thunk to rerender the reactions
        })

        return (() => {
            console.log("disconnected (reactions)");
            socket.disconnect();
        })
    }, []);

    const addSmileEmoji = (e) => {
        e.preventDefault();
        socket.emit("reaction", {owner_id: userId, message_id: message.id, emoji: "1F600" });
    }

    const removeSmileEmoji = (e) => {
        e.preventDefault();
        //
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
            +
            {/* Button to open something to add to emojis */}
        </div>
    );
};

export default ReactionsPanel;
