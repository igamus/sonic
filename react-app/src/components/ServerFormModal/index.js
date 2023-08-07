import './ServerFormModal.css'
import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'
import { useState } from 'react'
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
    const [error, setError] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData()
        form.append('name', name);
        form.append('description', description)
        form.append('server_image', serverImage)
        form.append('banner_image', serverBannerImage)
        console.log(form);
        console.log('create form')
        dispatch(createServerThunk(form)).then((responseData) => {
            if (responseData.error) {
                setError(responseData.error)
            } else {
                history.push(`/me`)
                closeModal();
            }
        })
    }

    return (
        <div id='server-form-container'>
            <form id='server-form' onSubmit={handleSubmit} encType='multipart/form-data'>
                <div id='server-form-text-row'>
                    <input
                        id='server-form-text-field'
                        type='text'
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                        placeholder="What would you like to call this server?" />
                    <input
                        id='server-form-text-field'
                        type='text'
                        value={description}
                        required
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Please describe this server." />
                </div>
                <div>
                    <label for='server-form-server-image'>Choose a Server Image</label>
                    <input
                        type='text'
                        id='server-form-server-image'
                        name='server-form-server-image'
                        required
                        value={serverImage}
                        onChange={(e) => setServerImage(e.target.value)}
                    />
                </div>
                <div>
                    <label for='server-form-banner-image'>Choose a Banner Image</label>
                    <input
                        id='server-form-banner-image'
                        name='server-form-banner-image'
                        type='text'
                        required
                        value={serverBannerImage}
                        onChange={(e) => setServerBannerImage(e.target.value)}
                    />
                </div>
                <button id='server-form-submit-button' type='submit'>
                    Create Server
                </button>
            </form>
        </div>
    )
}