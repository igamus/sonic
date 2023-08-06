import './ExploreServer.css'

import { joinServerThunk } from '../../../store/servers';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useDispatch } from 'react-redux';
const ExploreServer = ({ server }) => {
    let isMember = 'false';
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch()
    const join = () => {
        dispatch(joinServerThunk(server.id))
    }
    console.log(server.users)
    for (let member of server.users) {
        //console.log(member.id, user.id)
        if (member.id === user.id) {
            isMember = 'hide-explore-server-join';
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