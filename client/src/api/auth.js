/* This file sends requests to the server using axios for token-based requests */

import axios from 'axios';
axios.defaults.withCredentials = true; //send the cookie back to the server with token

export async function onRegistration(registrationData) {
    return await axios.post('http://localhost:8000/api/register', registrationData);
};

export async function onLogin(loginData) {
    return await axios.post('http://localhost:8000/api/login', loginData);
};

/*export async function onRequestReset(emailData) {
    return await axios.post('http://localhost:8000/api/request-reset', emailData);
};*/

export async function onLogout() {
    return await axios.get('http://localhost:8000/api/logout');
};

export async function fetchProtectedInfo() {
    return await axios.get('http://localhost:8000/api/protected');
};