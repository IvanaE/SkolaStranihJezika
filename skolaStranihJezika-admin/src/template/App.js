import React, {useContext, useEffect, useState} from 'react'
import {Route, Switch,} from "react-router-dom";
import Dashboard from './Dashboard';
import Login from './Login';
import cnENG from "../constantsEng.json";
import cnRS from "../constants.json";
import ToastComponent from "./ToastComponent";
import AppContext from "../context/AppContext";

function App() {
    const cn = localStorage.getItem('lang') === 'eng' ? cnENG : cnRS;
    const [toast, setToast] = useState(false);
    const [toastTitle, setToastTitle] = useState('');
    const [toastText, setToastText] = useState('');
    const [toastType, setToastType] = useState('');
    const [context, setContext] = useContext(AppContext);
    const [mounted] = useState(true);

    useEffect(() => {
        setContext({...context, toast: showToast});
    }, []);

    const showToast = (title, text, type) => {
        setToastTitle(title);
        setToastText(text);
        setToastType(type);
        setToast(() => true);
    }

    const hideToast = () => {
        setToast(() => false);
    }

    const getToast = () => {
        return toast;
    }

    const addEventListener = () => {
        const toastElement = document.getElementById('toast')
        toastElement.addEventListener('hidden.bs.toast', () => {
            setToastTitle(() => "");
            setToastText(() => "");
            setToastType(() => "");
        })
        return <></>
    }

    return (
        <>
            {mounted && <ToastComponent getToast={getToast} hideToast={hideToast} text={toastText} title={toastTitle}
                                        type={toastType} eventListener={addEventListener}/>}
            <Switch>
                <Route path={cn.path.login.root} component={Login}/>
                <Route path={cn.path.root} component={Dashboard}/>
            </Switch>
        </>
    )
}

export default App

