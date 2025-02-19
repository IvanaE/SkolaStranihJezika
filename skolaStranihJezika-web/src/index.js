import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {AppContextProvider} from './context/AppContext';
import {BrowserRouter} from 'react-router-dom';

import 'bootstrap/dist/js/bootstrap.bundle';
import './index.scss';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <AppContextProvider>
                <App/>
            </AppContextProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
