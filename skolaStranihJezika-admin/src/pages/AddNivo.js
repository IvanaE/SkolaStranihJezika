import React, {useContext, useEffect, useState} from 'react'
import {useHistory, useLocation} from "react-router-dom";
import API from '../api'
import cnRS from '../constants.json'
import cnENG from '../constantsEng.json'
import translate from "../functions/translate";
import AppContext from "../context/AppContext";
import LoadingSpinner from "../template/LoadingSpinner";

function AddNivo() {
    const cn = localStorage.getItem('lang') === 'eng' ? cnENG : cnRS;

    const [name, setName] = useState("");
    const location = useLocation();
    const history = useHistory();
    const preload = location.state ? location.state.preload : false;
    const preloadData = location.state ? location.state.data : null;
    const [title, setTitle] = useState(cn.navigation.add.nivo);
    const [context] = useContext(AppContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (preload) {
            setTitle(translate(title));
        } else setTitle(cn.navigation.add.nivo);
        translate(title);
    }, [location.state]);

    useEffect(() => {
        handleReset();
        if (preload) {
            setName(preloadData.name)
        }
    }, [title]);

    const handleReset = () => {
        setName("");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const body = !preload ? {
            name: name
        } : {id: preloadData.id, name: name};
        API.post(cn.path.api.nivoi, body).then(res => {
            context.toast(cn.home.info.title, !preload ? cn.nivo.info.addSucc : cn.nivo.info.updateSucc, 'info');
            handleReset();
            if (preload) history.push(cn.path.list.nivoi);
        }).catch(err => {
            context.toast(cn.home.error.title, (!preload ? cn.nivo.info.addErr : cn.nivo.info.updateErr) + "\n" + err, 'danger');
        }).finally(() => setLoading(false));
    }

    return (
        <>
            {loading && <LoadingSpinner/>}
            <div className="card m-3 p-3">
                <b>{title}</b>
                <form className="mt-3" onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label className="form-label">{cn.nivo.ime}</label>
                        <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)}
                               required/>
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

export default AddNivo
