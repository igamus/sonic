import './ChannelForm.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createChannelThunk, updateChannelThunk } from '../../store/channels';
import { useModal } from '../../context/Modal';

function ChannelForm({ type, formData }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [name, setName] = useState(formData.name);
    const [description, setDescription] = useState(formData.description);
    const [errors, setErrors] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();

        const submission = {
            name,
            description
        }

        const updatedErrors = {};
        if (!name.length) updatedErrors.name = "Must include a name";
        if (Object.values(updatedErrors).length) {
            setErrors(updatedErrors);
            return;
        }

        if (type === "create") {
            submission.serverId = formData.serverId;
            try {
                dispatch(createChannelThunk(submission))
                closeModal()
            } catch (e) {
                console.log(e);
            }
        } else {
            submission.channelId = formData.id;
            try {
                dispatch(updateChannelThunk(submission))
                closeModal()
            } catch (e) {
                console.log(e)
            }
        }
    };

    return (
        <div>
            <h1>{type === "create" ? "Add Channel" : "Update Channel"}</h1>
            {Object.values(errors).map(e => (<p className='error'>{e}</p>))}
            <form id="channel-form" onSubmit={handleSubmit}>
                <label htmlFor="channel-name">
                    New Channel Name
                </label>
                <input
                    id="channel-name"
                    placeholder="What would you like to call this channel?"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />

                <label htmlFor="description">
                    Describe This Channel
                </label>
                <input
                    id="description"
                    placeholder="Topic to be discussed in this channel..."
                    type="text"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />

                <button type="submit">{type === "create" ? "Create Channel" : "Update Channel"}</button>
            </form>
        </div>
    );
};

export default ChannelForm;
