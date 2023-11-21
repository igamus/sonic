import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux"
import { logout } from "../../store/session"
import "./LoggedInUserDisplay.css"
const LoggedInUserDisplay = ({ user }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const logoutHelper = (e) => {
        e.preventDefault();
        dispatch(logout());
        history.push('/me');
    };
    return (
        <div id='logged-in-user-display'>
            <div>
                <img src={user.profilePic} id='logged-in-user-image' />
            </div>
            <div id='logged-in-user-info'>
                <p>{user.username}</p>
                <button onClick={logoutHelper}>Log Out</button>
            </div>
        </div>
    )
}

export default LoggedInUserDisplay;
