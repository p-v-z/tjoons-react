import React from 'react';
import { Query } from 'react-apollo';
import { listUsers } from '../graphql/queries';
import { onCreateUser } from '../graphql/subscriptions';
import gql from 'graphql-tag';
import UserList from './User';

class DisplayUsers extends React.Component {
	subsCribeNewPosts = subscribeToMore => {
		// subscribeToMore: it is invoked whenever the Post component is mounted
		// to the dom and listen for the new posts added to our graphql API.
		return subscribeToMore({
			document: gql(onCreateUser),

			// updateQuery: the updateQuery function is used to merge
			// the previous data and current data.
			updateQuery: (prev, { subscriptionData }) => {
				if (!subscriptionData.data) return prev;
				const newPostData = subscriptionData.data.onCreateUser;
				return Object.assign({}, prev, {
					listUsers: {
						...prev.listUsers,
						items: [...prev.listUsers.items, newPostData]
					}
				});
			}
		});
	};

	render() {
		return (
			<div className="posts">
				<Query query={gql(listUsers)}>
					{({ loading, data, error, subscribeToMore }) => {
						if (loading) return <p>loading...</p>;
						if (error) return <p>{error.message}</p>;
						return <UserList data={data} subscribeToMore={() => this.subsCribeNewPosts(subscribeToMore)} />;
					}}
				</Query>
			</div>
		);
	}
}

export default DisplayUsers;
