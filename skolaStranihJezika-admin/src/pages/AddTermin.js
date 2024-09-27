import React, {useContext, useEffect, useState} from 'react'
import API from '../api'
import cnRS from '../constants.json'
import cnENG from '../constantsEng.json'
import AppContext, {isAdmin} from "../context/AppContext";
import LoadingSpinner from "../template/LoadingSpinner";

function AddTermin() {
    const cn = localStorage.getItem('lang') === 'eng' ? cnENG : cnRS;

    const [nastavnik, setNastavnik] = useState({});
    const [days, setDays] = useState(1);
    const [nastavnici, setnastavnici] = useState([]);
    const [date, setDate] = useState(new Date(new Date().getTime()).toISOString().slice(0,-8));
    const [context] = useContext(AppContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        API.get(cn.path.api.nastavnici+cn.path.api.nastavniciFilijale+context.user.filijala.id).then(res => {
            setnastavnici(res.data);
            setNastavnik(res.data[0]);
        }).catch(err => {
            context.toast(cn.home.error.title, cn.termin.info.fetchErr + "\n" + err, 'danger');
        }).finally(() => setLoading(false));
    }, []);

    const handleReset = () => {
        setDays(1);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        var termini = [];
        for (var i = 0; i < days; i++) {
            termini.push({
                nastavnik: nastavnik,
                terminVreme: new Date(new Date(date).getTime() + Number(i) * 86400000).toISOString()
            })
        }

        API.post(cn.path.api.termini, termini).then(res => {
            context.toast(cn.home.info.title, cn.termin.info.addSucc, 'info');
            handleReset();
        }).catch(err => {
            context.toast(cn.home.error.title, cn.termin.info.addErr + "\n" + err, 'danger');
        }).finally(() => setLoading(false));
    }

    return (
        <>
            {loading && <LoadingSpinner/>}
            <div className="card m-3 p-3">
                <b>{cn.navigation.add.termin}</b>
                <form className="mt-3" onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label className="form-label">{cn.termin.nastavnik}</label>
                        <select className="form-control" onChange={e => setNastavnik(nastavnici[e.target.value])} required>
                            {
                                nastavnici.map((h, i) => (
                                    (isAdmin(context) || context.user.filijala.id === h.filijala.id) &&
                                    <option key={i}
                                            value={i}>{h.filijala.name}, {h.name} - {h.nivoi.map(val => val.name + ' ')}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="mb-2">
                        <label className="form-label">{cn.termin.datum}</label>
                        <input type="datetime-local" className="form-control" value={date}
                               onChange={e => setDate(e.target.value)} min={new Date().toISOString().slice(0, -8)}
                               required/>
                    </div>
                    <div className="mb-2">
                        <label className="form-label">{cn.termin.repeat}</label>
                        <input type="number" min="1" max="30" className="form-control" value={days}
                               onChange={e => setDays(e.target.value)} required/>
                    </div>
                    <div className="mt-3">
                        <button type="submit" className="btn btn-primary me-2">{cn.home.submitAdd}</button>
                        <button type="reset" className="btn btn-warning text-white"
                                onClick={handleReset}>{cn.home.cancel}</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddTermin
