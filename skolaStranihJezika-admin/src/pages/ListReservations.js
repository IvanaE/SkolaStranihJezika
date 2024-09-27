import React, {useContext, useEffect, useState} from 'react'
import cnRS from '../constants.json'
import cnENG from '../constantsEng.json';
import AppContext, {isAdmin} from "../context/AppContext";
import ReservationModalComponent from "../template/ReservationModalComponent";
import API from "../api";
import LoadingSpinner from "../template/LoadingSpinner";

function ListReservations() {
    const cn = localStorage.getItem('lang') === 'eng' ? cnENG : cnRS;

    const [rezervacije, setRezervacije] = useState([]);
    const [selectedReservation, setSelectedReservation] = useState(null);
    const [context] = useContext(AppContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        API.get(cn.path.api.reservations + cn.path.api.rezNew).then(res => {
            setRezervacije(res.data);
        }).catch(err => {
            context.toast(cn.home.error.title, cn.reservation.info.fetchErr + "\n" + err, 'danger');

        }).finally(() => setLoading(false));
    }, []);

    return (
        <>
            {loading && <LoadingSpinner/>}
            <ReservationModalComponent res={selectedReservation}/>
            <div className="card m-3 p-3">
                <b>{cn.navigation.list.reservations}</b>
                <table className="table table-stripped table-hover mt-3">
                    <thead>
                    <tr>
                        <th scope="col">{cn.reservation.nastavnik}</th>
                        <th scope="col">{cn.reservation.termin}</th>
                        <th scope="col">{cn.reservation.date}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        rezervacije.map((rezervacija, i) => {
                            return (
                                <tr className={`out ${(!isAdmin(context) && context.user.filijala.id===rezervacija.termin.nastavnik.filijala.id) && 'fw-bold'}`} role="button"
                                    id={cn.reservation.id + cn.home.idSeparator + rezervacija.id}
                                    key={cn.reservation.id + cn.home.idSeparator + rezervacija.id}
                                    data-bs-target="#reservationModal" data-bs-toggle="modal"
                                    onClick={() => setSelectedReservation(rezervacija)}>
                                    <td className="cell">
                                        <img src={rezervacija.termin.nastavnik.picture} width="70px" alt=''/>
                                        {" " + rezervacija.termin.nastavnik.filijala.name}, {rezervacija.termin.nastavnik.name} - {rezervacija.termin.nastavnik.nivoi.map(val => val.name + ' ')}
                                    </td>
                                    <td className="cell">{new Date(rezervacija.termin.terminVreme).toLocaleString('sr-RS')}</td>
                                    <td className="cell">{new Date(rezervacija.rezervacijaDatum).toLocaleString('sr-RS')}</td>
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

export default ListReservations
