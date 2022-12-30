import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AsicCrudComponent from '../Components/AsicCrudComponent';

const CrudPage = ({ action, apiHost, addMessage, deleteMessage, messageQueue }) => {
  const params = useParams();
  const [asicData, setAsicData] = useState({
    'id': 0,
    'ip': '',
    'port': '',
    'username': '',
    'password': '',
    'type': '',
    'power': '',
    'phase': ''
  });

  useEffect(() => {
    if (action === 'edit') {
      fetch(apiHost + '/get_asic/' + params.asicID)
        .then(response => response.json())
        .then((data) => {

          if (data) { setAsicData(data); }
          else {
            addMessage('warning', 'Error fetching data: ' + data['detail']);
          }

        })
        .catch((error) => {
          addMessage('warning', 'Error fetching data: ' + error)
        })
    }
  }, []);

  return (
    <AsicCrudComponent action={action} asicData={asicData} apiHost={apiHost} addMessage={addMessage} deleteMessage={deleteMessage} messageQueue={messageQueue} />
  );
}

export default CrudPage;