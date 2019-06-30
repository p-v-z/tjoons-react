import React from 'react';

// GraphQL Implementation
// https://dashbird.io/blog/serverless-react-graphql/
import CreateUser from './User/CreateUser';
import DisplayUsers from './User/DisplayUsers';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { getUser } from './graphql/queries';
import User from './User/User';

class Dashbaord extends React.Component {
	// componentDidMount() {
		// this.props.subscribeToMore();
	// }

	render() {
		// const items = this.props.data.listUsers.items;

		return (
			<div>
				<h1>Dashboard</h1>

				<h2>Users</h2>
				<CreateUser />
				<DisplayUsers />
				
				Fetch:
				<Query query={gql(getUser)}>
					{({ loading, data, error, subscribeToMore }) => {
						if (loading) return <p>loading...</p>;
						if (error) return <p>{error.message}</p>;

						return <User data={data} subscribeToMore={() => this.subsCribeNewPosts(subscribeToMore)} />;
					}}
				</Query>
			</div>
		);
	}
}

export default Dashbaord;
