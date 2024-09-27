import React, {useContext, useEffect, useState} from 'react'
import API from '../api'
import cnRS from '../constants.json'
import cnENG from '../constantsEng.json'
import {useHistory} from "react-router-dom";
import AppContext, {isAdmin} from "../context/AppContext";
import LoadingSpinner from "../template/LoadingSpinner";


function ListNivo() {
    const cn = localStorage.getItem('lang') === 'eng' ? cnENG : cnRS;

    const [nivoi, setNivoi] = useState([]);
    const [context] = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    let history = useHistory();

    useEffect(() => {
        setLoading(true);
        API.get(cn.path.api.nivoi).then(res => {
            setNivoi(res.data);
        }).catch(err => {
            context.toast(cn.home.error.title, cn.nivo.info.fetchErr + "\n" + err, 'danger');
        }).finally(() => setLoading(false));
    }, []);

    const handleDelete = (id) => {
        setLoading(true);
        API.delete(cn.path.api.nivoi + cn.path.root + id).then(res => {
            document.getElementById(cn.nivo.id + cn.home.idSeparator + id).remove();
            context.toast(cn.home.info.title, cn.nivo.info.delSucc, 'info');
        }).catch(err => {
            context.toast(cn.home.error.title, cn.nivo.info.delErr + "\n" + err, 'danger');
        }).finally(() => setLoading(false));
    }

    const handleUpdate = (val) => {
        history.push(cn.path.add.nivoi, {preload: true, data: val});
    }

    return (
        <>
            {loading && <LoadingSpinner/>}
            <div className="card m-3 p-3">
                <b>{cn.navigation.list.nivo}</b>
                <table className="table table-stripped table-hover mt-3">
                    <thead>
                    <tr>
                        <th scope="col">{cn.nivo.ime}</th>
                        {isAdmin(context) && <th scope="col"></th>}
                        {isAdmin(context) && <th scope="col"></th>}
                    </tr>
                    </thead>
                    <tbody>
                    {
                        nivoi.map((nivo, i) => {
                            return (
                                <tr className="out" id={cn.nivo.id + cn.home.idSeparator + nivo.id}
                                    key={cn.nivo.id + cn.home.idSeparator + nivo.id}>
                                    <td className="cell">{nivo.name}</td>
                                    {isAdmin(context) && <td className="button">
                                        <button type="button" onClick={() => handleUpdate(nivo)}
                                                className="btn btn-warning text-white">{cn.home.update}</button>
                                    </td>}
                                    {isAdmin(context) && <td className="button">
                                        <button type="button" onClick={() => handleDelete(nivo.id)}
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

export default ListNivo
