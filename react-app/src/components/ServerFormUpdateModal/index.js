import './ServerFormUpdateModal.css'
import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'
import { useState, useEffect } from 'react'
import { updateServerThunk } from '../../store/servers'
import { useHistory } from 'react-router-dom'

export default function ServerFormUpdateModal({ server }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal()
    const [name, setName] = useState(server.name)
    const [description, setDescription] = useState(server.description)
    const [serverImage, setServerImage] = useState('')
    const [serverBannerImage, setServerBannerImage] = useState('')
    const [error, setError] = useState(null);
    const [disableButton, setDisableButton] = useState(true);
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('update prep', name, description, serverImage, serverBannerImage, 'x')

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
        form.append('serverImage', serverImage)
        form.append('bannerImage', serverBannerImage)
        form.append('id', server.id)
        console.log('update name', name)
        console.log(form);
        dispatch(updateServerThunk(form)).then((responseData) => {
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
        <div className='backgundgreyyy'>
            <div className='wrapchanel'>
                <div>
                    <h1>Update Server</h1>
                    <form className='specialchanform sol-box' onSubmit={handleSubmit} encType='multipart/form-data'>
                        <label htmlFor="server-description">
                            New Server Name
                        </label>
                        <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
                        <label htmlFor="server-description">
                            New Server Description
                        </label>
                        <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
                        <label htmlFor="server-image">
                            New Server Image
                        </label>
                        <input type='file' onChange={(e) => setServerImage(e.target.files[0])} accept='image/*' />
                        <label htmlFor="banner-image">
                            New Banner Image
                        </label>
                        <input type='file' onChange={(e) => setServerBannerImage(e.target.files[0])} accept='image/*' />
                        <button className='signupbbtn' type='submit' disabled={disableButton}>
                            Update Server
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
