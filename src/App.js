import React, { useReducer, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { FaFacebook, FaGoogle, FaEnvelope, FaSignOutAlt } from 'react-icons/fa';


import Form from './Form'
import Header from './Header'
import Buttons from './Buttons'
import Dashboard from './Dashboard'

// AWS Amplify
import { Hub, Auth } from 'aws-amplify';

// TODO: Spotify 
// https://levelup.gitconnected.com/how-to-build-a-spotify-player-with-react-in-15-minutes-7e01991bc4b6
// react-spotify project

const initialUserState = { user: null, loading: true };

function reducer(state, action) {
	switch (action.type) {
		case 'setUser':
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
		console.log('user: ', user);
		dispatch({ type: 'setUser', user });
	} catch (err) {
		console.log('err: ', err);
		dispatch({ type: 'loaded' });
	}
}

function signOut() {
	Auth.signOut()
		.then(data => console.log(data))
		.catch(err => console.log(err));
}

function App() {
	const [userState, dispatch] = useReducer(reducer, initialUserState);
	const [formState, updateFormState] = useState('base');

	useEffect(() => {
		// set listener for auth events
		Hub.listen('auth', data => {
			const { payload } = data;
			console.log(payload.event);
			
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
						Welcome {userState.user.signInUserSession.idToken.payload.email}
					</h4>

					<Dashboard />

					<button onClick={signOut}>
						<FaSignOutAlt color="white" />
						<p>Sign Out</p>
					</button>
				</div>
			)}
		</div>
	);
}

// Wrapp App in authenticator to restrict access
// export default withAuthenticator(App, true);
export default App;
