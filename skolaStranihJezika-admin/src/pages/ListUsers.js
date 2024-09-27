import React, {useContext, useEffect, useState} from 'react'
import {useHistory} from "react-router-dom";
import API from '../api'
import cnRS from '../constants.json'
import cnENG from '../constantsEng.json'
import AppContext from "../context/AppContext";
import LoadingSpinner from "../template/LoadingSpinner";

function ListUsers() {
    const cn = localStorage.getItem('lang') === 'eng' ? cnENG : cnRS;

    let history = useHistory();

    const [users, setUsers] = useState([]);
    const [context] = useContext(AppContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        API.get(cn.path.api.users).then(res => {
            setUsers(res.data);
        }).catch(err => {
            context.toast(cn.home.error.title, cn.user.info.fetchErrUser + "\n" + err, 'danger');

        }).finally(() => setLoading(false));
    }, []);

    const handleUpdate = (data) => {
        history.push(cn.path.add.users, {preload: true, data: data});
    }

    const handleDelete = (id) => {
        setLoading(true);
        API.delete(cn.path.api.users + cn.path.root + id).then(res => {
            document.getElementById(cn.user.id + cn.home.idSeparator + id).remove();
            context.toast(cn.home.info.title, cn.user.info.delSucc, 'info');
        }).catch(err => {
            context.toast(cn.home.error.title, cn.user.info.delErr + "\n" + err, 'danger');

        }).finally(() => setLoading(false));
    }

    return (
        <>
            {loading && <LoadingSpinner/>}
            <div className="card m-3 p-3">
                <b>{cn.navigation.list.user}</b>
                <table className="table table-stripped table-hover mt-3">
                    <thead>
                    <tr>
                        <th scope="col">{cn.user.name}</th>
                        <th scope="col">{cn.user.username}</th>
                        <th scope="col">{cn.user.email}</th>
                        <th scope="col">{cn.user.address}</th>
                        <th scope="col">{cn.user.phone}</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        users.map((user, i) => {
                            return (
                                <tr className="out" id={cn.user.id + cn.home.idSeparator + user.id} key={i}>
                                    <td className="cell">{user.first_name} {user.last_name}</td>
                                    <td className="cell">{user.username}</td>
                                    <td className="cell">{user.email}</td>
                                    <td className="cell">{user.address}</td>
                                    <td className="cell">{user.phone}</td>
                                    <td className="button">
                                        <button type="button" onClick={() => handleUpdate(user)}
                                                className="btn btn-warning text-white">{cn.home.update}</button>
                                    </td>
                                    <td className="button">
                                        <button type="button" onClick={() => handleDelete(user.id)}
                                                className="btn btn-danger text-white">{cn.home.delete}</button>
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

export default ListUsers
