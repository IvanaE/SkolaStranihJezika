import React, {useContext, useEffect, useState} from 'react'
import {useHistory, useLocation} from "react-router-dom";
import translate from "../functions/translate";
import API from '../api'
import cnRS from '../constants.json'
import cnENG from '../constantsEng.json'
import AppContext from '../context/AppContext'
import Select from "react-select";
import LoadingSpinner from "../template/LoadingSpinner";

function AddUser() {
    const cn = localStorage.getItem('lang') === 'eng' ? cnENG : cnRS;

    const location = useLocation();
    const history = useHistory();
    const preload = location.state ? location.state.preload : false;
    const preloadData = location.state ? location.state.data : null;
    const roleOptions = [{value: 0, label: "ROLE_USER"}, {value: 1, label: "ROLE_ADMIN"}];
    const [title, setTitle] = useState(cn.navigation.add.user);
    const [context] = useContext(AppContext);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [oldUsername, setOldUsername] = useState("");
    const [filijala, setFilijala] = useState({});
    const [role, setRole] = useState(preload ? {
        value: roleOptions.findIndex(val => val.label === preloadData.uloge[0]),
        label: preloadData.uloge[0]
    } : null);
    const [selectedFilijala, setSelectedFilijala] = useState({value: -1, label: cn.home.select});
    const [selectOptions, setSelectOptions] = useState([]);
    const [filijale, setFilijale] = useState([]);
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        if (preload) setTitle(translate(title));
        else setTitle(cn.navigation.add.user);
        API.get(cn.path.api.filijale).then(res => {
            setFilijale(res.data);
        }).catch(err => {
            context.toast(cn.home.error.title, cn.filijala.info.fetchErrFil + "\n" + err, 'danger');
        }).finally(() => setLoading(false));
    }, [location.state])

    useEffect(() => {
        if (preload) {
            setFirstName(preloadData.first_name);
            setLastName(preloadData.last_name);
            setPhone(preloadData.phone);
            setAddress(preloadData.address);
            setEmail(preloadData.email);
            setUsername(preloadData.username);
            setOldUsername(preloadData.username);
            setPassword("");
            setPassword2("");
            preloadData.filijala && setFilijala(preloadData.filijala);
            preloadData.filijala && setSelectedFilijala({
                value: preloadData.filijala.id,
                label: preloadData.filijala.name + ', ' + preloadData.filijala.address + ', ' + preloadData.filijala.city
            });
            setRole({
                value: roleOptions.findIndex(val => val.label === preloadData.uloge[0]),
                label: preloadData.uloge[0]
            });
        }

        let selectOptionsArray = [];
        for (const f of filijale) {
            selectOptionsArray.push({value: f.id, label: f.name + ', ' + f.address + ', ' + f.city})
        }
        setSelectOptions(selectOptionsArray);
    }, [filijale])

    useEffect(() => {
        handleReset();
    }, [title])

    const handleFilijalaSelect = (e) => {
        const f = filijale.find(fil => fil.id===e.value);
        setFilijala(f);
        setSelectedFilijala({value: f.id, label: f.name + ', ' + f.address + ', ' + f.city});
    }

    const handleReset = () => {
        setFirstName("");
        setLastName("");
        setPhone("");
        setAddress("");
        setEmail("");
        setUsername("");
        setPassword("");
        setPassword2("");
        setSelectedFilijala({value: -1, label: cn.home.select});
        setFilijala({});
        setRole(null);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        if (selectedFilijala.value === -1) {
            context.toast(cn.home.error.title, cn.user.info.addErr, 'danger');
            setLoading(false);
            return;
        }
        let pass = "";
        pass = password;
        if (preload && !pass) pass = context.user.password;
        if (password !== password2) {
            context.toast(cn.home.error.title, cn.user.info.passMatchErr, 'danger');
            setLoading(false);
            return;
        }
        const bodyAdd = {
            "first_name": firstName,
            "last_name": lastName,
            "username": username,
            "password": pass,
            "email": email,
            "address": address,
            "phone": phone,
            "filijala": filijala,
            "sendRole": role.label,
            "enabled": true,
            "oldUsername": oldUsername
        }
        const url = preload ? cn.path.api.users : cn.path.api.auth.root + cn.path.api.auth.signup;
        const body = !preload ? bodyAdd : {id: preloadData.id, ...bodyAdd};
        API.post(url, body).then(res => {
            context.toast(cn.home.info.title, !preload ? cn.user.info.addSucc : cn.user.info.updateSucc, 'info');
            handleReset();
            if (preload) history.push(cn.path.list.users);
        }).catch(err => {
            context.toast(cn.home.error.title, (!preload ? cn.user.info.addErr : cn.user.info.updateErr) + "\n" + err, 'danger');
        }).finally(() => setLoading(false));
    }

    return (
        <>
            {loading && <LoadingSpinner/>}
            <div className="card m-3 p-3">
                <b>{title}</b>
                <form className="mt-3" onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label className="form-label">{cn.user.fName}</label>
                        <input type="text" className="form-control" value={firstName}
                               minLength="3" onChange={e => setFirstName(e.target.value)} required/>
                    </div>
                    <div className="mb-2">
                        <label className="form-label">{cn.user.lName}</label>
                        <input type="text" className="form-control" value={lastName}
                               minLength="3" onChange={e => setLastName(e.target.value)} required/>
                    </div>
                    <div className="mb-2">
                        <label className="form-label">{cn.user.address}</label>
                        <input type="text" className="form-control" value={address}
                               minLength="10" onChange={e => setAddress(e.target.value)} required/>
                    </div>
                    <div className="mb-2">
                        <label className="form-label">{cn.user.phone}</label>
                        <input type="text" className="form-control" value={phone}
                               onChange={e => setPhone(e.target.value)}
                               minLength="10" required/>
                    </div>
                    <div className="mb-2">
                        <label className="form-label">{cn.user.email}</label>
                        <input type="email" className="form-control" value={email}
                               onChange={e => setEmail(e.target.value)}
                               minLength="8" required/>
                    </div>
                    <div className="mb-2">
                        <label className="form-label">{cn.user.username}</label>
                        <input type="text" className="form-control" value={username}
                               minLength="5" onChange={e => setUsername(e.target.value)} required/>
                    </div>
                    <div className="mb-2">
                        <label className="form-label">{cn.user.filijala}</label>
                        <Select className='react-select-container' classNamePrefix="react-select"
                                value={selectedFilijala}
                                options={selectOptions} placeholder={cn.home.select} onChange={handleFilijalaSelect}/>

                    </div>
                    <div className="mb-2">
                        <label className="form-label">{cn.user.role}</label>
                        <Select className='react-select-container' classNamePrefix="react-select" required value={role}
                                defaultValue={role}
                                options={roleOptions}
                                placeholder={cn.home.select}
                                onChange={(e) => setRole(roleOptions[e.value])}
                        />

                    </div>
                    <div className="mb-2">
                        <label className="form-label">{cn.user.password}</label>
                        <input type="password" className="form-control" value={password}
                               minLength="4" onChange={e => setPassword(e.target.value)} required={!preload}/>
                    </div>
                    <div className="mb-2">
                        <label className="form-label">{cn.user.password2}</label>
                        <input type="password" className="form-control" value={password2}
                               minLength="4" onChange={e => setPassword2(e.target.value)} required={!preload}/>
                    </div>
                    <div className="mt-3">
                        <button type="submit"
                                className="btn btn-primary me-2">{preload ? cn.home.update : cn.home.submitAdd}</button>
                        <button type="reset" className="btn btn-warning text-white"
                                onClick={handleReset}>{cn.home.cancel}</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddUser
