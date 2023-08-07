import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../../context/Modal';
import { createChannelThunk,updateChannelThunk } from '../../../store/channels';
import './CreateChannel.css'
function CreateChannel({ type, formData }) {
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

        const updatedErrors = [];
        if (!name.length) updatedErrors.push("Must include a name");
        if (name.length > 255) updatedErrors.push(`Name exceeded maxiumum length (255 characters allowed. ${name.length} used.)`)
        if (description.length > 255) updatedErrors.push(`Description exceeded maxiumum length (255 characters allowed. ${description.length} used.)`)
        if (updatedErrors.length) {
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
        <div className='backgroundgreyyy'>
            <div className='wrapchanel'>
            <h1>{type === "create" ? "Add Channel" : "Update Channel"}</h1>
            {errors.length ? errors.map(e => (<p className='error'>{e}</p>)) : null}
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

                <button className='signupbbtn ' id='specialactchannel' type="submit">{type === "create" ? "Create Channel" : "Update Channel"}</button>
            </form>
            </div>
        </div>
    );
};

export default CreateChannel;
