import './ReactionsPanel.css'
// need to install sanitizing package if we get approved

function ReactionsPanel({ message, userId }) {
    const reactions = message.reactions;
    console.log('reactions:', reactions)
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

    return (
        <div>
            {reducedReactions.map(reaction => {
                let className = "";
                const val = "&#x" + reaction.emoji + ";"
                if (reaction.ownerId === userId) {
                    className += 'your-reaction'
                }
                return (
                    <span>
                        <button dangerouslySetInnerHTML={{__html: val}} className={className} onClick={removeEmoji} />
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