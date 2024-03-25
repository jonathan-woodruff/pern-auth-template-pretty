import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';
//import { GoogleOAuthProvider } from '@react-oauth/google';
//import { getGoogleClientId } from './api/auth';

//const response = await getGoogleClientId();
//const googleClientId = response.data.googleClientId;
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  //<GoogleOAuthProvider clientId={ googleClientId }>
    <Provider store={store}>
      <App />
    </Provider>
  //</GoogleOAuthProvider>
);

