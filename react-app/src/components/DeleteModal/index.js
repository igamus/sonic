import './DeleteModal.css';
import { useModal } from '../../context/Modal';
import { deleteChannelThunk } from '../../store/channels';
import { deleteServerThunk } from '../../store/servers';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function DeleteModal({ type, id }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState("");

    const deleter = () => {
        try {
            if (type === "channel") {
                dispatch(deleteChannelThunk(id));
            }
            if (type === "server") {
                dispatch(deleteServerThunk(id)).then(() => history.push("/me"));
            }
            // can else some other type
            return closeModal();
        } catch (e) {
            console.log(e);
            return setErrorMessage("There was a problem deleting your channel. Please refresh the page"); // can use ternary to make the text "your channel" dynamic
        }
    };

    return (
        <div id="delete-modal">
            <h2 id="delete-header">Are you sure you want to delete this {type === "channel" ? "channel" : "server"}?</h2>
            <h2 id="warning">This cannot be undone</h2>
            <p id="error">{errorMessage}</p>
            <div>
                <button onClick={deleter} className='deleter-button'>Lol, kill it (Yes)</button>
                <button onClick={closeModal} className='simple-button'>No, whoa, I do not want to do this</button>
            </div>
        </div>
    );
};

export default DeleteModal;
