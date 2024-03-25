/* This file sends requests to the server using axios for token-based requests */

import axios from 'axios';
axios.defaults.withCredentials = true; //send the cookie back to the server with token

export async function onRegistration(registrationData) {
    return await axios.post('http://localhost:8000/auth/register', registrationData);
};

export async function onLogin(loginData) {
    return await axios.post('http://localhost:8000/auth/login', loginData);
};

/*export async function onRequestReset(emailData) {
    return await axios.post('http://localhost:8000/api/request-reset', emailData);
};*/

export async function onLogout() {
    return await axios.get('http://localhost:8000/auth/logout');
};

export async function fetchProtectedInfo() {
    return await axios.get('http://localhost:8000/auth/protected');
};

export async function fetchProtectedInfoSSO() {
    return await axios.get('http://localhost:8000/auth/protected-sso');
};

export async function onSSOSuccess() {
    return await axios.get('http://localhost:8000/auth/login/success');
};

/*export async function getGoogleClientId() {
    return await axios.get('http://localhost:8000/api/google-client-id');
}*/

/*export async function onSSO(ssoData) {
    return await axios.post('http://localhost:8000/api/sso', ssoData);
};*/