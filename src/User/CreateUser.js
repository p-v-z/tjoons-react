import React from 'react';
import { Mutation } from 'react-apollo';
import { createUser } from '../graphql/mutations';
import gql from 'graphql-tag';

class CreateUser extends React.Component {
	handleSubmit = (e, createUser) => {
		e.preventDefault();
		createUser({
			variables: {
				input: {
					cognitoId: 324,
					id: 523,
					username: 'awe2',
					ProfileImageUrl: '123'
				}
			}
		}).then(res => {
			console.log(res);
		});
	};

	render() {
		return (
			<div>
				<Mutation mutation={gql(createUser)}>
					{(createUser, { data, loading }) => {
						return (
							<div>
								<form className="add-post" onSubmit={e => this.handleSubmit(e, createUser)}>
									<button>{loading ? 'Yes boss...' : 'Create User'}</button>
								</form>
								{/* {error && <p>{error.message}</p>} */}
							</div>
						);
					}}
				</Mutation>
			</div>
		);
	}
}

export default CreateUser;
