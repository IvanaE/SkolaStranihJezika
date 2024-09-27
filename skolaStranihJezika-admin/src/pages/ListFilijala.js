import React, {useContext, useEffect, useState} from 'react'
import {useHistory} from "react-router-dom";
import API from '../api'
import cnRS from '../constants.json'
import cnENG from '../constantsEng.json'
import AppContext, {isAdmin} from "../context/AppContext";
import LoadingSpinner from "../template/LoadingSpinner";

function ListFilijala() {
    const cn = localStorage.getItem('lang') === 'eng' ? cnENG : cnRS;

    const [filijale, setFilijale] = useState([]);
    const [context] = useContext(AppContext);
    let history = useHistory();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        API.get(cn.path.api.filijale).then(res => {
            setFilijale(res.data);
        }).catch(err => {
            context.toast(cn.home.error.title, cn.filijala.info.fetchErrFil + "\n" + err, 'danger');
        }).finally(() => setLoading(false));
    }, []);

    const handleUpdate = (data) => {
        history.push(cn.path.add.filijale, {preload: true, data: data});
    }

    const handleDelete = (id) => {
        setLoading(true);
        API.delete(cn.path.api.filijale + cn.path.root + id).then(res => {
            document.getElementById(cn.filijala.id + cn.home.idSeparator + id).remove();
            context.toast(cn.home.info.title, cn.filijala.info.delSucc, 'info');
        }).catch(err => {
            context.toast(cn.home.error.title, cn.filijala.info.delErr + "\n" + err, 'danger');
        }).finally(() => setLoading(false));
    }

    return (
        <>
            {loading && <LoadingSpinner/>}
            <div className="card m-3 p-3">
                <b>{cn.navigation.list.filijala}</b>
                <table className="table table-stripped table-hover mt-3">
                    <thead>
                    <tr id={cn.filijala.id}>
                        <th scope="col">{cn.filijala.name}</th>
                        <th scope="col">{cn.filijala.address}</th>
                        <th scope="col">{cn.filijala.city}</th>
                        <th scope="col">{cn.filijala.phone}</th>
                        {isAdmin(context) && <th scope="col"></th>}
                        {isAdmin(context) && <th scope="col"></th>}
                    </tr>
                    </thead>
                    <tbody>
                    {
                        filijale.map((filijala, i) => {
                            return (
                                <tr className="out" id={cn.filijala.id + cn.home.idSeparator + filijala.id}
                                    key={cn.filijala.id + cn.home.idSeparator + filijala.id}>
                                    <td className="cell">{filijala.name}</td>
                                    <td className="cell">{filijala.address}</td>
                                    <td className="cell">{filijala.city}</td>
                                    <td className="cell">{filijala.phone}</td>
                                    {isAdmin(context) && <td className="button">
                                        <button type="button" onClick={() => handleUpdate(filijala)}
                                                className="btn btn-warning text-white">{cn.home.update}</button>
                                    </td>}
                                    {isAdmin(context) && <td className="button">
                                        <button type="button" onClick={() => handleDelete(filijala.id)}
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

export default ListFilijala
