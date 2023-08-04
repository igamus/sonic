import CreateChannel from '../Create/CreateChannel';


function UpdateChannelModal({ channel }) {
    return (
        <CreateChannel type="update" formData={channel} />
    );
};

export default UpdateChannelModal;
