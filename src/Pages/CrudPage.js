import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import AsicCrudComponent from '../Components/AsicCrudComponent';
import MessageContext from '../Context/MessageContext';

const CrudPage = ({ action }) => {
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
  const { apiHost, addMessage } = useContext(MessageContext);

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
    <AsicCrudComponent action={action} asicData={asicData} />
  );
}

export default CrudPage;