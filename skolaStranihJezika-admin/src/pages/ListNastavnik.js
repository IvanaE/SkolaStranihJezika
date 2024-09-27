import React, {useContext, useEffect, useState} from 'react'
import {useHistory} from "react-router-dom";
import API from '../api'
import cnRS from '../constants.json'
import cnENG from '../constantsEng.json'
import AppContext, {isAdmin} from "../context/AppContext";
import LoadingSpinner from "../template/LoadingSpinner";


function ListNastavnik() {
    const cn = localStorage.getItem('lang') === 'eng' ? cnENG : cnRS;

    const [nastavnici, setnastavnici] = useState([]);
    const [context] = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    let history = useHistory();


    useEffect(() => {
        setLoading(true);
        API.get(cn.path.api.nastavnici).then(res => {
            setnastavnici(res.data);
        }).catch(err => {
            context.toast(cn.home.error.title, cn.nastavnik.info.fetchErrNas + "\n" + err, 'danger');
        }).finally(() => setLoading(false));
    }, []);

    const handleUpdate = (data) => {
        history.push(cn.path.add.nastavnici, {preload: true, data: data});
    }

    const handleDelete = (id) => {
        setLoading(true);
        API.delete(cn.path.api.nastavnici + cn.path.root + id).then(res => {
            document.getElementById(cn.nastavnik.id + cn.home.idSeparator + id).remove();
            context.toast(cn.home.info.title, cn.nastavnik.info.delSucc, 'info');
        }).catch(err => {
            context.toast(cn.home.error.title, cn.nastavnik.info.delErr + "\n" + err, 'danger');
        }).finally(() => setLoading(false));
    }

    return (
        <>
            {loading && <LoadingSpinner/>}
            <div className="card m-3 p-3">
                <b>{cn.navigation.list.nastavnik}</b>
                <table className="table table-stripped table-hover mt-3">
                    <thead>
                    <tr id={cn.nastavnik.id}>
                        <th scope="col">{cn.nastavnik.pic}</th>
                        <th scope="col">{cn.nastavnik.name}</th>
                        <th scope="col">{cn.nastavnik.filijala}</th>
                        <th scope="col">{cn.nastavnik.nivoi}</th>
                        <th scope="col">{cn.nastavnik.about}</th>
                        <th scope="col">{cn.nastavnik.sertifikati}</th>
                        <th scope="col">{cn.nastavnik.price}</th>
                        {isAdmin(context) && <th scope="col"></th>}
                        {isAdmin(context) && <th scope="col"></th>}
                    </tr>
                    </thead>
                    <tbody>
                    {
                        nastavnici.map((nastavnik, i) => {
                            return (
                                <tr className="out"
                                    id={cn.nastavnik.id + cn.home.idSeparator + nastavnik.id}
                                    key={cn.nastavnik.id + cn.home.idSeparator + nastavnik.id}>
                                    <td className="cell"><img src={nastavnik.picture}
                                                              height="120"
                                                              width="90"
                                                              alt=''/></td>
                                    <td className="cell">{nastavnik.name}</td>
                                    <td className="cell">{nastavnik.filijala.name}</td>
                                    <td className="cell">{nastavnik.nivoi.map(val => val.name + ' ')}</td>
                                    <td className="cell">{nastavnik.about}</td>
                                    <td className="cell">{nastavnik.sertifikati}</td>
                                    <td className="cell">{nastavnik.price}</td>
                                    {isAdmin(context) && <td className="button">
                                        <button type="button"
                                                onClick={() => handleUpdate(nastavnik)}
                                                className="btn btn-warning text-white">{cn.home.update}</button>
                                    </td>}
                                    {isAdmin(context) && <td className="button">
                                        <button type="button"
                                                onClick={() => handleDelete(nastavnik.id)}
                                                className="btn btn-danger text-white">{cn.home.delete}</button>
                                    </td>}
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

export default ListNastavnik
