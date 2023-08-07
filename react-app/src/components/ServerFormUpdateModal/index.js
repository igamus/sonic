import './ServerFormUpdateModal.css'
import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'
import { useState } from 'react'
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('update prep', name, description, serverImage, serverBannerImage, 'x')
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

    return (
        <div className='backgundgreyyy'>
             <div className='wrapchanel'>
            <div>
                <h1>Update Server</h1>
            <form className='specialchanform sol-box' onSubmit={handleSubmit} encType='multipart/form-data'>
            <label htmlFor="channel-server">
                    New Server Name
                </label>
                <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
                <label htmlFor="server-description">
                    New Server Name
                </label>
                <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
                <input type='text' value={serverImage} onChange={(e) => setServerImage(e.target.value)} accept='image/*' />
                <input type='text' value={serverBannerImage} onChange={(e) => setServerBannerImage(e.target.value)} accept='image/*' />
                <button type='submit'>
                    Update Server
                </button>
            </form>
              </div>
              </div>
        </div>
    )
}
