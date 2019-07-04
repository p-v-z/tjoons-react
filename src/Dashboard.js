import React from 'react';

// GraphQL Implementation
// https://www.apollographql.com/docs/react/essentials/queries/
import CreateUser from './User/CreateUser';
import DisplayUsers from './User/DisplayUsers';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { getUser } from './graphql/queries';
// import User from './User/User';

function Dashbaord(props) {
	// Get email
	let userEmail = props.user.attributes.email;
	// Check if it exists
	if (!userEmail) return (<p>No User Email</p>)
	
	console.log('searching user with email: ' + userEmail);
	return (
		<div>
			<h1>Dashboard</h1>

			<h2>Users</h2>
			<Query 
				query={gql(getUser)} 
				variables={{email: userEmail}}
			>
				{({ loading, data, error, subscribeToMore }) => {
					if (loading) return <p>loading...</p>;
					if (error) return <p>{error.message}</p>;
					
					console.log(data);
					if (!data.getUser) {
						let ss = 
						<div>
							<p>no user</p>
							<CreateUser user={props.user}/>
						</div>

						return ss;
					} else {
						return <p>hi {data.getUser.username}</p>;
					}
				}}
			</Query>
			
			<DisplayUsers />
		</div>
	);
}

export default Dashbaord;
