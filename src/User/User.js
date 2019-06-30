import React from 'react';

class User extends React.Component {
	componentDidMount() {
		this.props.subscribeToMore();
	}

	render() {
		const items = this.props.data.listUsers.items;

		return items.map(post => {
			return (
				<div>
					<h1>{post.id}</h1>
					<p>{post.username}</p>
					{/* <time dateTime={post.createdAt}>{new Date(post.createdAt).toDateString()}</time> */}
					<br />
				</div>
			);
		});
	}
}

export default User;
