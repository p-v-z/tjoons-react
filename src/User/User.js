import React from 'react';

class User extends React.Component {
	componentDidMount() {
		this.props.subscribeToMore();
	}

	render() {
		const items = this.props.data.listUsers.items;

		return items.map(user => {
			return (
				<div key={user.username}>
					<p>{user.username} {user.email} {user.createdAt}</p>
					{/* <time dateTime={user.createdAt}>{new Date(user.createdAt).toDateString()}</time> */}
					<br />
				</div>
			);
		});
	}
}

export default User;
