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
        <div>
            <h2>Are you sure you want to delete this {type === "channel" ? "channel" : "server"}?</h2>
            <p>{errorMessage}</p>
            <button onClick={deleter}>Yes</button>
            <button onClick={closeModal}>No</button>
        </div>
    );
};

export default DeleteModal;
