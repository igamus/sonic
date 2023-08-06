import "./ServerManagerModal.css";
import DeleteModal from '../../DeleteModal';
import OpenModalButton from "../../OpenModalButton";
import CreateChannelModal from "../../Channel/Create/CreateChannelModal";
import ServerFormUpdateModal from "../../ServerFormUpdateModal";

function ServerManagerModal({ server }) {
    return (
    <div className="manage-modal">
        <h1 className="manage-header">Manage {server.name}</h1>
        <div className="modal-section">
            <h2>Manage This Server:</h2>
            <OpenModalButton className="server-button" buttonText='Update Server' modalComponent={<ServerFormUpdateModal title='Update Server' server={server} />} />
            <OpenModalButton className="server-button" id="delete" buttonText="Delete Server"  modalComponent={<DeleteModal type="server" id={server.id} />} />
        </div>
        <div className="modal-section">
            <h2>Manage This Server's Channels:</h2>
            <OpenModalButton className="server-button" buttonText="Create Channel" modalComponent={<CreateChannelModal serverId={server.id} />} />
        </div>
    </div>
    );
}

export default ServerManagerModal;
