import React, { useReducer, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

// Redux
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';

import { FaSignOutAlt } from 'react-icons/fa';


import Form from './Form'
import Header from './Header'
import Buttons from './Buttons'
import Dashboard from './Dashboard'

// AWS Amplify
import { Hub, Auth } from 'aws-amplify';
import { Authenticator, withAuthenticator } from 'aws-amplify-react';

// TODO: Spotify 
// https://levelup.gitconnected.com/how-to-build-a-spotify-player-with-react-in-15-minutes-7e01991bc4b6
// react-spotify project

const initialUserState = { user: null, loading: true };

function reducer(state, action) {

	// console.log(action);

	switch (action.type) {
		case 'setUser':
			if (action.user) {
				console.log('%cUser signed in: ', 'background: lime; color: black;');
				console.log(action.user);
			} else {
				console.log('%cUser signed Out ', 'background: maroon; color: white;');
			}
			return { ...state, user: action.user, loading: false };
		case 'loaded':
			return { ...state, loading: false };
		default:
			return state;
	}
}

async function checkUser(dispatch) {
	try {
		const user = await Auth.currentAuthenticatedUser();
		// console.log('user: ', user);
		dispatch({ type: 'setUser', user });
	} catch (err) {
		// console.log('err: ', err);
		dispatch({ type: 'loaded' });
	}
}

function signOut() {
	Auth.signOut()
		.then(data => console.log('sign out success'))
		.catch(err => console.log(err));
}

function App() {
	const [userState, dispatch] = useReducer(reducer, initialUserState);
	const [formState, updateFormState] = useState('base');

	useEffect(() => {
		// set listener for auth events
		Hub.listen('auth', data => {
			const { payload } = data;
			// console.log(payload.event);
			
			if (payload.event === 'signIn') {
				setImmediate(() => dispatch({ type: 'setUser', user: payload.data }));
				updateFormState('base');
			}
			// this listener is needed for form sign ups since the OAuth will redirect & reload
			if (payload.event === 'signOut') {
				setTimeout(() => dispatch({ type: 'setUser', user: null }), 350);
			}
		});
		// we check for the current user unless there is a redirect to ?signedIn=true
		if (!window.location.search.includes('?signedin=true')) {
			checkUser(dispatch);
		}
	}, []);

	// This renders the custom form
	let signUp = (formState === 'email') ? <Form /> : <Buttons updateFormState={updateFormState} />;

	console.log(userState);

	return (
		<div className="App">

			{/* Loading Indicator */}
			{userState.loading && (
				<div>
					<p>Loading...</p>
					<img src={logo} className="App-logo" alt="logo" />
				</div>
			)}

			{/* Sign In Buttons */}
			{!userState.user && !userState.loading && (
				<div>{signUp}</div>
			)}

			{/* User Panel */}		
			{userState.user && userState.user.signInUserSession && (<Header />)}
			{userState.user && userState.user.signInUserSession && (
				<div>
					<h4>
						Welcome {userState.user.attributes.email}
						
					</h4>

					<Dashboard user={userState.user}/>

					<button onClick={signOut}>
						<FaSignOutAlt color="white" />
						<p>Sign Out</p>
					</button>
				</div>
			)}
		</div>
	);
}

// https://dev.to/dabit3/graphql-api-authentication-authorization-with-the-aws-amplify-graphql-transform-library-3gn1
const myCustomTheme = {
	container: {
		color: '#ff0000',
	}
}

// Wrapp App in authenticator to restrict access
export default withAuthenticator(App, {
	// Render a sign out button once logged in
	// includeGreetings: true, 
	// Show only certain components
	// authenticatorComponents: [Buttons],
	// display federation/social provider buttons 
	// federated: {myFederatedConfig}, 
	// customize the UI/styling
	theme: {myCustomTheme}}
);

// App.propTypes = {
// 	// token: PropTypes.string,
// 	// fetchUser: PropTypes.func,
// 	// setToken: PropTypes.func,
// 	// pauseSong: PropTypes.func,
// 	// playSong: PropTypes.func,
// 	// stopSong: PropTypes.func,
// 	// resumeSong: PropTypes.func,
// 	// volume: PropTypes.number
//   };
  
//   const mapStateToProps = (state) => {

// 	return {
// 	//   token: state.tokenReducer.token,
// 	//   volume: state.soundReducer.volume
// 	};
  
//   };
  
//   const mapDispatchToProps = dispatch => {
// 	return bindActionCreators({
// 	//   fetchUser,
// 	//   setToken,
// 	//   playSong,
// 	//   stopSong,
// 	//   pauseSong,
// 	//   resumeSong
// 	},dispatch);
  
//   };
  
//   export default connect(mapStateToProps, mapDispatchToProps)(App);