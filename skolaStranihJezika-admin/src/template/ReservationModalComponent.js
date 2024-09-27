import API from "../api";
import cnENG from "../constantsEng.json";
import cnRS from "../constants.json";
import React, {useContext, useState} from "react";
import AppContext, {isAdmin} from "../context/AppContext";
import LoadingSpinner from "./LoadingSpinner";

function ReservationModalComponent({res}) {
    const cn = localStorage.getItem('lang') === 'eng' ? cnENG : cnRS;
    const [context] = useContext(AppContext);
    const [loading, setLoading] = useState(false);

    const handleDelete = (rez) => {
        if (!isAdmin(context) && context.user.filijala.id !== rez.termin.nastavnik.filijala.id) return;
        setLoading(true);
        API.delete(cn.path.api.reservations + cn.path.root + rez.id).then(result => {
            document.getElementById(cn.reservation.id + cn.home.idSeparator + rez.id).remove();
            context.toast(cn.home.info.title, cn.reservation.info.delSucc, 'info');
        }).catch(err => {
            context.toast(cn.home.error.title, cn.reservation.info.delErr + "\n" + err, 'danger');
        }).finally(() => setLoading(false));
    }

    const handleConfirm = (rez) => {
        if (!isAdmin(context) && context.user.filijala.id !== res.termin.nastavnik.filijala.id) return;
        setLoading(true);
        const body = {
            korisnik: context.user,
            rezervacija: res,
            termin: res.termin,
            status: "POTVRDJEN"
        }

        API.post(cn.path.api.casovi, body).then(result => {
            document.getElementById(cn.reservation.id + cn.home.idSeparator + rez.id).remove();
            context.toast(cn.home.info.title, cn.reservation.info.addSucc, 'info');
        }).catch(err => {
            context.toast(cn.home.error.title, cn.reservation.info.addErr + "\n" + err, 'danger');
        }).finally(() => setLoading(false));
    }

    const listItem = (title, value) => {
        return <ul className="list-group list-group-horizontal border-bottom align-items-center">
            <li className="list-group-item border-0 fw-bolder">{title}</li>
            <li className="list-group-item flex-fill border-0 text-end">{value}</li>
        </ul>
    }

    return (
        <>
            {loading && <LoadingSpinner/>}
            <div className="py-2">
                <div className="modal" tabIndex="-1" id="reservationModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            {res && <div className="modal-header">
                                <h5 className="modal-title">{cn.reservation.modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                            </div>}
                            {res && <div className="modal-body">
                                {listItem(cn.reservation.nastavnik + ": ", " " + res.termin.nastavnik.filijala.name + ", " + res.termin.nastavnik.name + " - " + res.termin.nastavnik.nivoi.map(val => val.name + ' '))}
                                {listItem(cn.reservation.termin + ": ", new Date(res.termin.terminVreme).toLocaleString('sr-RS'))}
                                {listItem(cn.reservation.date + ": ", new Date(res.rezervacijaDatum).toLocaleString('sr-RS'))}
                                {listItem(cn.reservation.form.fname + ": ", res.first_name)}
                                {listItem(cn.reservation.form.lname + ": ", res.last_name)}
                                {listItem(cn.reservation.form.phone + ": ", res.phone)}
                                {listItem(cn.reservation.form.address + ": ", res.address)}
                                {listItem(cn.reservation.form.email + ": ", res.email)}
                                {listItem(cn.reservation.form.napomena + ": ", res.napomena)}
                                {listItem(cn.reservation.form.nivo + ": ", res.nivo)}
                            </div>}
                            {res && (isAdmin(context) || context.user.filijala.id === res.termin.nastavnik.filijala.id) &&
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger text-white" data-bs-dismiss="modal"
                                            onClick={() => handleDelete(res)}>{cn.home.delete}</button>
                                    <button type="button" className="btn btn-success text-white" data-bs-dismiss="modal"
                                            onClick={() => handleConfirm(res)}>{cn.home.confirm}</button>
                                </div>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReservationModalComponent