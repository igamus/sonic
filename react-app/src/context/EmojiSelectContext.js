import { createContext, useContext, useState } from "react";

export const EmojiSelectContext = createContext();

export const useEmojiSelect = () => useContext(EmojiSelectContext);

export default function EmojiSelectProvider({ children }) {
    const [emojiSelect, setEmojiSelect] = useState("");

    return <EmojiSelectContext.Provider value={{ emojiSelect, setEmojiSelect }}>{children}</EmojiSelectContext.Provider>
};
