import "./ExploreServer.css";

import { joinServerThunk } from "../../../store/servers";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ExploreServer = ({ server }) => {
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const join = () => {
      try {
        dispatch(joinServerThunk(server.id));
      } finally {
        history.push(`/servers/${server.id}`);
      }
    };

    let memberFlag = false;
    for (let member of server.users) {
        console.log("server ", server.id, "member ", member.id, "current user ", user.id)
        if (member.id === user.id) {
            console.log('hiding server join for ', server.id)
            memberFlag = true;
        }
    }

    const [isMember, setIsMember] = useState(memberFlag ? "hide-explore-server-join" : "");
    useEffect(() => { }, [isMember]);

    return (
        <div className='greyyy'>
            <div key={server.id} className="server" id="explore-server-container" onClick={join}>
                <NavLink to={`/servers/${server.id}`}>
                    <h2>{server.name}</h2>
                    <img
                        id="explore-server-banner"
                        src={server.bannerImage}
                        alt="Server Banner"
                    />
                    <div id="explore-server-below-banner">
                        <img
                            id="explore-server-icon"
                            src={server.serverImage}
                            alt="Server Image"
                        />
                        <p id="explore-server-description">{server.description}</p>
                    </div>
                </NavLink>
            </div>
        </div>
    );
};

export default ExploreServer;
