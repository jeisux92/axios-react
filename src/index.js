import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

//axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';


axios.interceptors.request.use(request => {
    return request;
}, error => {
    console.log(error)
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    return response;
}, error => {
    console.log(error)
    return Promise.reject(error);
});


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
