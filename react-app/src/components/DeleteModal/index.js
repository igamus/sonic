import './DeleteModal.css';
import { useModal } from '../../context/Modal';
import { deleteChannelThunk } from '../../store/channels';
import { deleteMessageThunk } from '../../store/messages';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

function DeleteModal({ type, id }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState("");

    const deleter = () => {
        try {
            if (type === "channel") {
                dispatch(deleteChannelThunk(id));
            } else {
                dispatch(deleteMessageThunk(id));
            }
            return closeModal();
        } catch (e) {
            console.log(e);
            return setErrorMessage("There was a problem deleting your channel. Please refresh the page");
        }
    };

    return (
        <div>
            <h2>Are you sure you want to delete this {type === "channel" ? "channel" : "message"}?</h2>
            <p>{errorMessage}</p>
            <button onClick={deleter}>Yes</button>
            <button onClick={closeModal}>No</button>
        </div>
    );
};

export default DeleteModal;
