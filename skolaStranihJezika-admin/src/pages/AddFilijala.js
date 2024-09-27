import React, {useContext, useEffect, useState} from 'react'
import {useHistory, useLocation} from "react-router-dom";
import translate from "../functions/translate";
import API from '../api'
import cnRS from '../constants.json'
import cnENG from '../constantsEng.json'
import AppContext from "../context/AppContext";
import LoadingSpinner from "../template/LoadingSpinner";


function AddFilijala() {
    const cn = localStorage.getItem('lang') === 'eng' ? cnENG : cnRS;

    const location = useLocation();
    const history = useHistory();
    const preload = location.state ? location.state.preload : false;
    const preloadData = location.state ? location.state.data : null;
    const [title, setTitle] = useState(cn.navigation.add.filijala);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [context] = useContext(AppContext);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (preload) setTitle(translate(title));
        else setTitle(cn.navigation.add.filijala);
    }, [location.state]);

    useEffect(() => {
        handleReset();
        if (preload) {
            setName(preloadData.name);
            setAddress(preloadData.address);
            setPhone(preloadData.phone);
            setCity(preloadData.city);
        }
    }, [title]);

    const handleReset = () => {
        setName("");
        setAddress("");
        setPhone("");
        setCity("");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const bodyAdd = {
            name: name,
            city: city,
            address: address,
            phone: phone
        }
        const body = !preload ? bodyAdd : {id: preloadData.id, ...bodyAdd};
        API.post(cn.path.api.filijale, body).then(res => {
            context.toast(cn.home.info.title, !preload ? cn.filijala.info.addSucc : cn.filijala.info.updateSucc, 'info');
            handleReset();
            if (preload) history.push(cn.path.list.filijale);
        }).catch(err => {
            context.toast(cn.home.error.title, (!preload ? cn.filijala.info.addErr : cn.filijala.info.updateErr) + "\n" + err, 'danger');
        }).finally(() => setLoading(false));
    }

    return (
        <>
            {loading && <LoadingSpinner/>}
            <div className="card m-3 p-3">
                <b>{title}</b>
                <form className="mt-3" onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label className="form-label">{cn.filijala.name}</label>
                        <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)}
                               minLength="5" required/>
                    </div>
                    <div className="mb-2">
                        <label className="form-label">{cn.filijala.city}</label>
                        <input type="text" className="form-control" value={city} onChange={e => setCity(e.target.value)}
                               minLength="5" required/>
                    </div>
                    <div className="mb-2">
                        <label className="form-label">{cn.filijala.address}</label>
                        <input type="text" className="form-control" value={address}
                               minLength="10" onChange={e => setAddress(e.target.value)} required/>
                    </div>
                    <div className="mb-2">
                        <label className="form-label">{cn.filijala.phone}</label>
                        <input type="text" className="form-control" value={phone}
                               onChange={e => setPhone(e.target.value)}
                               minLength="10" required/>
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

export default AddFilijala
