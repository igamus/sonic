import './CreateChannelFormModal.css';
import ChannelForm from '../ChannelForm';

function CreateChannelFormModal({ serverId }) {
    const formData = {name: "", description: "", serverId}
    return (
        <ChannelForm type="create" formData={formData} />
    );
};

export default CreateChannelFormModal;
