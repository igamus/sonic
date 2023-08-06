import './ExploreServer.css'

import { joinServerThunk } from '../../../store/servers';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
const ExploreServer = ({ server }) => {
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch()
    const [isMember, setIsMember] = useState('')
    const join = () => {
        dispatch(joinServerThunk(server.id))
        setIsMember('hide-explore-server-join')
    }

    useEffect(() => {

    }, [isMember])

    for (let member of server.users) {
        //console.log(member.id, user.id)
        if (member.id === user.id && isMember != 'hide-explore-server-join') {
            setIsMember('hide-explore-server-join');
        }
    }


    return (<div key={server.id} className="server">
        <Link to={`/servers/${server.id}`}>
            <h2>{server.name}</h2>
            <img src={server.bannerImage} alt="Server Banner" />
            <p>{server.description}</p>
            <img src={server.serverImage} alt="Server Image" />
        </Link>
        <button class={isMember} onClick={join}>Join Server</button>
    </div>)
}

export default ExploreServer