import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync'; // <--------- use this instead of Apollo Client
import aws_config from './aws-exports';
import { ApolloProvider } from 'react-apollo';

// import { createStore } from 'redux';
// import reducer from './store/reducers';

// AWS Amplify
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import { createHttpLink } from 'apollo-link-http';
Amplify.configure(awsconfig);

// AWS AppSync

const client = new AWSAppSyncClient({
    url: aws_config.aws_appsync_graphqlEndpoint,
    region: aws_config.aws_appsync_region,
    auth: {
        type: AUTH_TYPE.API_KEY,
		apiKey: aws_config.aws_appsync_apiKey,
        // type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
		// jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken()
    }
});

// const conflictResolver = ({ mutation, mutationName, variables, data, retries }) => {
//     switch (mutationName) {
//         case 'UpdatePostMutation':
//             return {
//                 ...variables,
//                 expectedVersion: data.version,
//             };
//         default:
//             return false;
//     }
// }

// const store = createStore(reducer)


ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
