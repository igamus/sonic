import './ChannelForm.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createChannelThunk } from '../../store/channels';
import { useModal } from '../../context/Modal';

function ChannelForm({ type, formData }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [name, setName] = useState(formData.name);
    const [description, setDescription] = useState(formData.description);
    const [errors, setErrors] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();
        console.log("button pushed")

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
                console.log(errors);
            }
       } else {
            // TODO: Update
            return console.log("SOMETHING HAPPENED!");
       }
    };

    return (
        <div>
            <h1>Add Channel</h1>
            {Object.values(errors).map(e => (<p className='error'>{e}</p>))}
            <p>type: {type}</p>
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

                <button type="submit">Create Channel</button>
            </form>
        </div>
    );
};

export default ChannelForm;
