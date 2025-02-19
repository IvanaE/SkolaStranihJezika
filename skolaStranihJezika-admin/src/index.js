import React from 'react';
import ReactDOM from 'react-dom';
import App from './template/App';
import './index.scss'
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import {AppContextProvider} from './context/AppContext';

ReactDOM.render(
    <React.StrictMode>
        <AppContextProvider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </AppContextProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
