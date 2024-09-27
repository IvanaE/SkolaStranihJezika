import React, {useContext, useState} from 'react'
import API from '../api'
import AppContext from '../context/AppContext'
import {useHistory} from 'react-router-dom';
import rs from '../images/rs.png'
import eng from '../images/eng.png'
import cnENG from "../constantsEng.json";
import cnRS from "../constants.json";
import LoadingSpinner from "./LoadingSpinner";

function Login() {
    const cn = localStorage.getItem('lang') === 'eng' ? cnENG : cnRS;
    const lang = localStorage.getItem('lang') === 'eng' ? 'eng' : 'rs';

    let history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [language, setLanguage] = useState(lang);
    const [context, setContext] = useContext(AppContext);
    const [loading, setLoading] = useState(false);

    const handleLanguageChange = (e) => {
        setLanguage(e.target.id);
        localStorage.setItem('lang', e.target.id);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        API.post(cn.path.api.auth.root + cn.path.api.auth.signin, {username, password}).then(res => {
            API.defaults.headers.common['Authorization'] = res.data.token;
            setContext({...context, user: res.data.user, token: res.data.token});
            var date = new Date();
            date.setMinutes(date.getMinutes() + 30);
            localStorage.setItem("timestamp", date);
            history.push(cn.path.list.reservations);
        }).catch(err => {
            context.toast(cn.home.error.title, cn.home.error.cred + "\n" + err, 'danger');
        }).finally(() => setLoading(false));
    }

    return (
        <>
            {loading && <LoadingSpinner/>}
            <div id="login-wrapper">
                <form className="form-signin text-center" onSubmit={handleSubmit}>
                    <h1 className="h3 mb-3 font-weight-normal">{cn.signin.title}</h1>
                    <div className="mb-2">
                        <input type="text" className="form-control" placeholder={cn.signin.username} required
                               value={username} onChange={e => setUsername(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <input type="password" className="form-control" placeholder={cn.signin.password} required
                               value={password} onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <div className="mb-3 d-grid">
                        <button className="btn btn-primary" type="submit">{cn.signin.title}</button>
                    </div>
                    <p className="text-muted">{cn.footer.title}</p>
                </form>
                <p>{cn.language.title}</p>
                <div className="btn-group" role="group">
                    <input type="radio" className="btn-check" name="btnradio" id={cn.language.rsId} autoComplete="off"
                           onChange={handleLanguageChange} checked={language === 'rs'}/>
                    <label className="btn btn-outline-primary" htmlFor={cn.language.rsId}>{cn.language.rs} <img src={rs}
                                                                                                                alt=''/>
                    </label>

                    <input type="radio" className="btn-check" name="btnradio" id={cn.language.engId} autoComplete="off"
                           onChange={handleLanguageChange} checked={language === 'eng'}/>
                    <label className="btn btn-outline-primary" htmlFor={cn.language.engId}>{cn.language.eng}
                        <img src={eng} alt=''/>
                    </label>
                </div>
            </div>
        </>
    )
}

export default Login
