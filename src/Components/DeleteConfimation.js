import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Grid, Header, Segment, Image, Button } from 'semantic-ui-react';
import MessageContext from "../Context/MessageContext";

const DeleteConfimation = () => {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const params = useParams();
	const { apiHost, addMessage } = useContext(MessageContext);

	const handleYesButton = () => {
		setLoading(true);

		fetch(apiHost + '/delete_asic/' + params.asicID, {
			method: 'POST',
		})
			.then(response => response.json())
			.then((data) => {

				if (!(data['detail'])) { addMessage('success', 'Deleted successfully') }
				else { addMessage('warning', 'Error during deleting: ' + data['detail']) }
			})
			.catch((error) => {
				addMessage('warning', 'Error during deletin: ' + error)
			})
			.finally(() => {
				setLoading(false);
			});

		setTimeout(() => { navigate('/') }, 1000);
	}

	return (
		<Grid textAlign='center' style={{ padding: '10em 5em 5em 5em' }}>
			<Grid.Column style={{ maxWidth: '50%' }}>
				<Segment loading={loading}>
					<Header as='h1' textAlign='center'>Uh-oh... You're trying to delete an entry</Header>
					<Header as='h2' textAlign='center'>Are you sure about it?</Header>
					<Image src='/delete_confirmation.jpeg' style={{ padding: '1em 0em 3em 0em' }} centered />
					<Grid textAlign='center' style={{ padding: '2em 0em 2em 0em' }}>
						<Button onClick={handleYesButton} negative>Yes, delete it</Button>
						<Button onClick={() => navigate('/')} positive>No, take me back</Button>
					</Grid>
				</Segment>
			</Grid.Column>
		</Grid>
	);
}

export default DeleteConfimation;