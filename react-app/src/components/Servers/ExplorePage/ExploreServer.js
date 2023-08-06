import { joinServerThunk } from '../../../store/servers';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

import { useDispatch } from 'react-redux';
const ExploreServer = ({ server }) => {
    const dispatch = useDispatch()
    const join = () => {
        dispatch(joinServerThunk(server.id))
    }
    return (<div key={server.id} className="server">
        <Link to={`/servers/${server.id}`}>
            <h2>{server.name}</h2>
            <img src={server.bannerImage} alt="Server Banner" />
            <p>{server.description}</p>
            <img src={server.serverImage} alt="Server Image" />
        </Link>
        <button onClick={join}>Join Server</button>
    </div>)
}

export default ExploreServer