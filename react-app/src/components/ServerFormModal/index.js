import './ServerFormModal.css'
import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'
import { useState, useEffect } from 'react'
import { createServerThunk } from '../../store/servers'
import { useHistory } from 'react-router-dom'

export default function ServerFormModal({ }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [serverImage, setServerImage] = useState('')
    const [serverBannerImage, setServerBannerImage] = useState('')
    const [error, setError] = useState({});
    const [disableButton, setDisableButton] = useState(true);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = [];

        if (!name.length || name.length > 255) newErrors.push("Name must be between 1 and 255 characters");
        if (!description.length || description.length > 255) newErrors.push("Name must be between 1 and 255 characters");
        if (newErrors.length) {
            setError(newErrors);
            setDisableButton(true);
            return;
        };



        const form = new FormData()
        form.append('name', name);
        form.append('description', description)
        if (serverImage.length > 0) {
            form.append('server_image', serverImage)
        }
        if (serverBannerImage.length > 0) {
            form.append('banner_image', serverBannerImage)
        }
        dispatch(createServerThunk(form)).then((responseData) => {
            if (responseData.error) {
                setError(responseData.error)
            } else {
                history.push(`/me`)
                closeModal();
            }
        })
    }

    useEffect(() => {
        setDisableButton(false);
        const newErrors = [];
        if (!name.length || name.length > 255) newErrors.push("Name must be between 1 and 255 characters");
        if (!description.length || description.length > 255) newErrors.push("Description must be between 1 and 255 characters");
        if (newErrors.length) setDisableButton(true);
    }, [name, description]);

    return (
        <div className='servercreateback' id='server-form-container'>
            <div className='wrapchanel'>
                <h1>Create a server</h1>

                {error.length ? error.map(e => <p className="create-error">{e}</p>) : null}
                <form className='specialchanform sol-box' id='server-form' onSubmit={handleSubmit} encType='multipart/form-data'>

                    <label htmlFor="server-create-name">
                        Server Name
                    </label>
                    <input
                        id='server-form-text-field'
                        type='text'
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                        placeholder="What would you like to call this server?" />
                    <label htmlFor="server-create-name">
                        Server Description
                    </label>
                    <input
                        id='server-form-text-field'
                        type='text'
                        value={description}
                        required
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Please describe this server." />


                    <label for='server-form-server-image'>Enter a Server Image Url</label>
                    <input
                        type='file'
                        id='server-form-server-image'
                        name='server-form-server-image'
                        required
                        onChange={(e) => setServerImage(e.target.files[0])}
                        accept='image/*'
                    />


                    <label for='server-form-banner-image'>Enter a Banner Image Url</label>
                    <input
                        id='server-form-banner-image'
                        name='server-form-banner-image'
                        type='file'
                        required
                        onChange={(e) => setServerBannerImage(e.target.files[0])}
                        accept='image/*'
                    />

                    <button className='signupbbtn' id='server-form-submit-button' type='submit' disabled={disableButton}>
                        Create Server
                    </button>
                </form>
            </div>
        </div>
    )
}
