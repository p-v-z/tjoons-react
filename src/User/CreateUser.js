import React from 'react';
import { Mutation } from 'react-apollo';
import { createUser } from '../graphql/mutations';
import gql from 'graphql-tag';
import { API, graphqlOperation } from 'aws-amplify'

import moment from 'moment';

import { Connect } from "aws-amplify-react";
import AWSAppSyncClient from 'aws-appsync';

class CreateUser extends React.Component {

	handleSubmit = (e, createUser) => {
		e.preventDefault();
	
		let user = this.props.user;
		console.log(user);
		
		const input = {						
			// id: 111,
			username: user.username,
			email: user.attributes.email,
			createdAt: moment().toDate().toISOString(),
			profileImageUrl: 'https://cdn0.iconfinder.com/data/icons/users-44/100/Human_headphones-512.png'	
		}

		console.log('Creating user');




		createUser({variables: {input}}).then(res => {
			console.log('%cNew user created:', 'background: teal; color: white');
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
