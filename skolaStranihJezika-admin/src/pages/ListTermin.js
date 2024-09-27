import React, {useContext, useEffect, useState} from 'react'
import API from '../api'
import cnRS from '../constants.json'
import cnENG from '../constantsEng.json'
import AppContext, {isAdmin} from "../context/AppContext";
import LoadingSpinner from "../template/LoadingSpinner";


function ListTermin() {
    const cn = localStorage.getItem('lang') === 'eng' ? cnENG : cnRS;

    const [termini, setTermini] = useState([]);
    const [zauzetiId, setZauzetiId] = useState([]);
    const [cekanjeId, setCekanjeId] = useState([]);
    const [loading, setLoading] = useState(false);
    const [context] = useContext(AppContext);

    useEffect(() => {
        setLoading(true);
        API.get(cn.path.api.termini).then(res => {
            setTermini(res.data);
        }).catch(err => {
            context.toast(cn.home.error.title, cn.termin.info.fetchErrTer + "\n" + err, 'danger');
        }).then(
            API.get(cn.path.api.termini+"/zauzeti").then(res => {
                setZauzetiId(res.data);
            }).catch(err => {
                context.toast(cn.home.error.title, cn.termin.info.fetchErrTer + "\n" + err, 'danger');
            }).then(
                API.get(cn.path.api.termini+"/cekanje").then(res => {
                    setCekanjeId(res.data);
                }).catch(err => {
                    context.toast(cn.home.error.title, cn.termin.info.fetchErrTer + "\n" + err, 'danger');
                })
            )
        ).finally(() => setLoading(false));
    }, []);

    const handleDelete = (termin) => {
        if (isAdmin(context) || context.user.filijala.id === termin.nastavnik.filijala.id) {
            setLoading(true);
            API.delete(cn.path.api.termini + cn.path.root + termin.id).then(res => {
                document.getElementById(cn.termin.id + cn.home.idSeparator + termin.id).remove();
                context.toast(cn.home.info.title, cn.termin.info.delSucc, 'info');
            }).catch(err => {
                context.toast(cn.home.error.title, cn.termin.info.delErr + "\n" + err, 'danger');
            }).finally(() => setLoading(false));
        }
    }

    const getColor = (t) => {
        if(zauzetiId.some(value => value===t.id)) return ' text-primary';
        let color = '';
        if(cekanjeId.some(value => value===t.id)) color+=' fw-bold';
        if(new Date().toISOString() > t.terminVreme) color+=' text-danger'
        return color;

    }

    return (
        <>
            {loading && <LoadingSpinner/>}
            <div className="card m-3 p-3">
                <b>{cn.navigation.list.termin}</b>
                <table className="table table-stripped table-hover mt-3">
                    <thead>
                    <tr>
                        <th scope="col">{cn.nastavnik.pic}</th>
                        <th scope="col">{cn.termin.nastavnik}</th>
                        <th scope="col">{cn.termin.datum}</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        termini.map((termin, i) => {
                            return (
                                <tr className={`out${getColor(termin)}`} id={cn.termin.id + cn.home.idSeparator + termin.id}
                                    key={cn.termin.id + cn.home.idSeparator + termin.id}>
                                    <td className="cell"><img src={termin.nastavnik.picture} width="70px" alt=''/></td>
                                    <td className="cell">{termin.nastavnik.filijala.name}, {termin.nastavnik.name} - {termin.nastavnik.nivoi.map(val => val.name + ' ')}</td>
                                    <td className="cell">{new Date(termin.terminVreme).toLocaleString('sr-RS')}</td>
                                    <td className="button">
                                        {(isAdmin(context) || context.user.filijala.id === termin.nastavnik.filijala.id) &&
                                            <button type="button" onClick={() => handleDelete(termin)}
                                                    className="btn btn-danger text-white">{cn.home.delete}</button>}
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ListTermin