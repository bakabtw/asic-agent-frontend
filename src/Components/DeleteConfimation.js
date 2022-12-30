import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Grid, Header, Segment, Image, Button } from 'semantic-ui-react';
import AppMessages from "./AppMessages";

const DeleteConfimation = ({ apiHost, addMessage, deleteMessage, messageQueue }) => {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const params = useParams();

	const handleYesButton = () => {
		setLoading(true);

		fetch(apiHost + '/delete_asic/' + params.asicID, {
			method: 'POST',
		})
			.then(response => response.json())
			.then((data) => {

				if (!(data['detail'])) { addMessage('success', 'Submitted power data successfully') }
				else { addMessage('warning', 'Error submitting data: ' + data['detail']) }
			})
			.catch((error) => {
				addMessage('warning', 'Error submitting data: ' + error)
			})
			.finally(() =>{
				setLoading(false);
			});

		setTimeout(() => { navigate('/') }, 1000);
	}

	return (
		<Grid textAlign='center' style={{ padding: '10em 5em 5em 5em' }}>
			<Grid.Column style={{ maxWidth: '50%' }}>
				<Segment loading={loading}>
					<Header as='h1' textAlign='center' floated>Uh-oh... You're trying to delete an entry</Header>
					<Header as='h2' textAlign='center'>Are you sure about it?</Header>
					<Image src='/delete_confirmation.jpeg' style={{ padding: '1em 0em 3em 0em' }} centered />
					<Grid textAlign='center' style={{ padding: '2em 0em 2em 0em' }}>
						<Button onClick={handleYesButton} negative>Yes, delete it</Button>
						<Button onClick={() => navigate('/')} positive>No, take me back</Button>
					</Grid>
				</Segment>
				<AppMessages queue={messageQueue} deleteMessage={deleteMessage} />
			</Grid.Column>
		</Grid>
	);
}

export default DeleteConfimation;