import CreateChannel from "./CreateChannel";

function CreateChannelModal({ serverId }) {
  const formData = { name: "", description: "", serverId };
  return <CreateChannel type="create" formData={formData} />;
}

export default CreateChannelModal;
