import './DeleteChannelModal.css';
import { useModal } from '../../context/Modal';
import { deleteChannelThunk } from '../../store/channels';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function DeleteChannelModal({ channelId }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState("");

    const deleteChannel  = () => {
        try {
            dispatch(deleteChannelThunk(channelId));
            return closeModal();
        } catch (e) {
            console.log(e);
            return setErrorMessage("There was a problem deleting your channel. Please refresh the page");
        }
    };

    return (
        <div>
            <h2>Are you sure you want to delete this channel?</h2>
            <p>{errorMessage}</p>
            <button onClick={deleteChannel}>Yes</button>
            <button onClick={closeModal}>No</button>
        </div>
    );
};

export default DeleteChannelModal;
