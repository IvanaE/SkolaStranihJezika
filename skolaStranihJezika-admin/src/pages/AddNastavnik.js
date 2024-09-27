import React, {useContext, useEffect, useState} from 'react'
import {useHistory, useLocation} from "react-router-dom";
import translate from "../functions/translate";
import API from '../api'
import cnRS from '../constants.json'
import cnENG from '../constantsEng.json'
import Select from 'react-select'
import AppContext from "../context/AppContext";
import LoadingSpinner from "../template/LoadingSpinner";

function AddNastavnik() {
    const cn = localStorage.getItem('lang') === 'eng' ? cnENG : cnRS;

    const location = useLocation();
    const history = useHistory();
    const preload = location.state ? location.state.preload : false;
    const preloadData = location.state ? location.state.data : null;
    const [title, setTitle] = useState(cn.navigation.add.nastavnik);
    const [price, setPrice] = useState("");
    const [name, setName] = useState("");
    const [about, setAbout] = useState("");
    const [sertifikati, setSertifikati] = useState("");
    const [picture, setPicture] = useState("");
    const [filijala, setFilijala] = useState({});
    const [selectedFilijala, setSelectedFilijala] = useState({value: -1, label: cn.home.select});
    const [filijale, setFilijale] = useState("");
    const [nivoi, setNivoi] = useState([]);
    const [filterValue, setFilterValue] = useState([]);
    const [filterOptions, setFilterOptions] = useState([]);
    const [selectOptions, setSelectOptions] = useState([]);
    const [context] = useContext(AppContext);
    const [loading, setLoading] = useState(false);


    const handleReset = () => {
        setPrice("");
        setPicture("");
        setFilijala({});
        setFilterValue([]);
        setName("");
        setAbout("");
        setSertifikati("");
        setSelectedFilijala({value: -1, label: cn.home.select});
    }

    useEffect(() => {
        setLoading(true);
        API.get(cn.path.api.nivoi).then(res => {
            const nivoiFetch = res.data;
            let options = [];
            for (const nivo of nivoiFetch) {
                if (!nivoi.some(val => val.id === nivo.id)) options.push({
                    value: nivo,
                    label: nivo.name
                })
            }
            setFilterOptions(options);
        }).catch(err => {
            context.toast(cn.home.error.title, cn.nastavnik.info.fetchErrLvl + "\n" + err, 'danger');

        }).finally(() => setLoading(false));
    }, [filterValue]);

    useEffect(() => {
        setLoading(true);
        if (preload) setTitle(translate(title));
        else setTitle(cn.navigation.add.nastavnik);
        API.get(cn.path.api.filijale).then(res => {
            setFilijale(res.data);
        }).catch(err => {
            context.toast(cn.home.error.title, cn.nastavnik.info.fetchErrFil + "\n" + err, 'danger');
        }).finally(() => setLoading(false));
    }, [location.state])

    useEffect(() => {
        handleReset();
    }, [title])

    useEffect(() => {
        if (preload) {
            setPrice(preloadData.price);
            setPicture(preloadData.picture);
            setFilijala(preloadData.filijala);
            setSelectedFilijala({
                value: preloadData.filijala.id,
                label: preloadData.filijala.name + ', ' + preloadData.filijala.address + ', ' + preloadData.filijala.city
            });
            setNivoi(preloadData.nivoi);
            setFilterValue(preloadData.nivoi.map(nivo => {
                return {value: nivo, label: nivo.name}
            }));
            setName(preloadData.name);
            setAbout(preloadData.about);
            setSertifikati(preloadData.sertifikati)
        }


        let selectOptionsArray = [];
        for (const f of filijale) {
            selectOptionsArray.push({value: f.id, label: f.name + ', ' + f.address + ', ' + f.city})
        }
        setSelectOptions(selectOptionsArray);
    }, [filijale])

    const handleSelect = (e) => {
        setNivoi(e.map(m => m.value));
        setFilterValue(e);
    }

    const handleFilijalaSelect = (e) => {
        const f = filijale.find(fil => fil.id===e.value);
        setFilijala(f);
        setSelectedFilijala({value: f.id, label: f.name + ', ' + f.address + ', ' + f.city});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        if (selectedFilijala.value === -1) {
            context.toast(cn.home.error.title, !cn.nastavnik.info.addErr, 'danger');
            setLoading(false);
            return;
        }
        const bodyAdd = {
            price: price,
            picture: picture,
            filijala: filijala,
            nivoi: nivoi,
            name: name,
            about: about,
            sertifikati: sertifikati
        }
        const body = !preload ? bodyAdd : {id: preloadData.id, ...bodyAdd};

        API.post(cn.path.api.nastavnici, body).then(res => {
            context.toast(cn.home.info.title, !preload ? cn.nastavnik.info.addSucc : cn.nastavnik.info.updateSucc, 'info');
            handleReset();
            if (preload) history.push(cn.path.list.nastavnici);
        }).catch(err => {
            context.toast(cn.home.error.title, !preload ? cn.nastavnik.info.addErr : cn.nastavnik.info.updateErr + "\n" + err, 'danger');
        }).finally(() => setLoading(false));
    }

    return (
        <>
            {loading && <LoadingSpinner/>}
            <div className="card m-3 p-3">
                <b>{title}</b>
                <form className="mt-3"
                      onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label className="form-label">{cn.nastavnik.price}</label>
                        <input type="number"
                               min="1"
                               className="form-control"
                               value={price}
                               onChange={e => setPrice(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label className="form-label">{cn.nastavnik.picture}</label>
                        <input type="text"
                               className="form-control"
                               value={picture}
                               onChange={e => setPicture(e.target.value)}
                               required/>
                    </div>
                    <div className="mb-2">
                        <label className="form-label">{cn.nastavnik.name}</label>
                        <input type="text"
                               className="form-control"
                               value={name}
                               minLength="3"
                               onChange={e => setName(e.target.value)}
                               required/>
                    </div>
                    <div className="mb-2">
                        <label className="form-label">{cn.nastavnik.nivoi}</label>
                        <Select
                            isMulti
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={handleSelect}
                            options={filterOptions}
                            value={filterValue}
                            placeholder={cn.home.select}
                        />
                    </div>
                    <div className="mb-2">
                        <label className="form-label">{cn.nastavnik.filijala}</label>
                        <Select className='react-select-container'
                                classNamePrefix="react-select"
                                value={selectedFilijala}
                                options={selectOptions}
                                placeholder={cn.home.select}
                                onChange={handleFilijalaSelect}/>
                    </div>
                    <div className="mb-2">
                        <label className="form-label">{cn.nastavnik.about}</label>
                        <input type="text"
                               className="form-control"
                               value={about}
                               minLength="3"
                               onChange={e => setAbout(e.target.value)}
                               required/>
                    </div>
                    <div className="mb-2">
                        <label className="form-label">{cn.nastavnik.sertifikati}</label>
                        <input type="text"
                               className="form-control"
                               value={sertifikati}
                               minLength="3"
                               onChange={e => setSertifikati(e.target.value)}
                               required/>
                    </div>
                    <div className="mt-3">
                        <button type="submit"
                                className="btn btn-primary me-2">{preload ? cn.home.update : cn.home.submitAdd}</button>
                        <button type="reset"
                                className="btn btn-warning text-white"
                                onClick={handleReset}>{cn.home.cancel}</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddNastavnik
