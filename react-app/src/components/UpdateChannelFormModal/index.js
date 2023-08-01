import ChannelForm from '../ChannelForm';
import './UpdateChannelFormModal.css';

function UpdateChannelFormModal({ channel }) {
    return (
        <ChannelForm type="update" formData={channel} />
    );
};

export default UpdateChannelFormModal;
