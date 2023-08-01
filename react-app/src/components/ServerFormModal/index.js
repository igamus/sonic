import './ServerFormModal.css'
import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'
import { useState } from 'react'
import { createServerThunk } from '../../store/servers'
import { useHistory } from 'react-router-dom'

export default function ServerFormModal({}) {
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

        dispatch(createServerThunk(form)).then((responseData) => {
            if (responseData.error) {
                setError(responseData.error)
            } else {
                history.push(`/channels/${responseData.general_channel_id}`)
                closeModal();
            }
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type='text' value={name} onChange={(e) => setName(e.target.value)}/>
                <input type='text' value={description} onChange={(e) => setDescription(e.target.value)}/>
                <input type='file'  onChange={(e) => setServerImage(e.target.files[0])} accept='image/*'/>
                <input type='file'  onChange={(e) => setServerBannerImage(e.target.files[0])} accept='image/*'/>
                <button type='submit'>
                    Create Form
                </button>
            </form>
        </div>
    )
}