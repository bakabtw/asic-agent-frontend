import AsicCrudComponent from '../Components/AsicCrudComponent';

const CrudPage = ({apiHost, addMessage, deleteMessage, messageQueue}) => {
  return (
    <AsicCrudComponent apiHost={apiHost} addMessage={addMessage} deleteMessage={deleteMessage} messageQueue={messageQueue} />
  );
}

export default CrudPage;