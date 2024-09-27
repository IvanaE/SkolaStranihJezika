import API from "../api";
import cnENG from "../constantsEng.json";
import cnRS from "../constants.json";
import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
import AppContext from "../context/AppContext";
import Select from "react-select";
import {useHistory} from "react-router-dom";
import ReactToPrint from "react-to-print";
import refresh from "../functions/refresh";
import LoadingSpinner from "./LoadingSpinner";

function CasModalComponent({cas}) {
    const cn = localStorage.getItem('lang') === 'eng' ? cnENG : cnRS;

    const componentRef = useRef(null);
    const onBeforeGetContentResolve = useRef(null);
    const [context] = useContext(AppContext);
    const history = useHistory();
    const options = [{value: 0, label: "CAS_ODRZAN"}, {value: 1, label: "NIJE_SE_POJAVIO"}, {value: 2, label: "POTVRDJEN"}, {
        value: 3,
        label: "OTKAZAN"
    }];
    const [status, setStatus] = useState(cas ? {
        value: options.findIndex(val => val.label === cas.status),
        label: cas.status
    } : null);
    const [note, setNote] = useState("");
    const [loading, setLoading] = useState(false);
    let rezervacija = cas ? cas.rezervacija : null;

    useEffect(() => {
        reset();
    }, [cas])

    const handleDelete = (id, id2) => {
        setLoading(true);
        API.delete(cn.path.api.casovi + cn.path.root + id).then(res => {
            document.getElementById(cn.cas.id + cn.home.idSeparator + id).remove();
            context.toast(cn.home.info.title, cn.cas.info.delSucc, 'info');
            API.delete(cn.path.api.reservations + cn.path.root + id2).catch(err => {
                context.toast(cn.home.error.title, cn.reservation.info.delErr + "\n" + err, 'danger');
            });
        }).catch(err => {
            context.toast(cn.home.error.title, cn.cas.info.delErr + "\n" + err, 'danger');
        }).finally(() => setLoading(false));
    }

    const handleConfirm = () => {
        setLoading(true);
        const body = {
            id: cas.id,
            korisnik: context.user,
            rezervacija: rezervacija,
            termin: rezervacija.termin,
            napomena: note,
            status: status.label
        }

        API.post(cn.path.api.casovi, body).then(res => {
            context.toast(cn.home.info.title, cn.cas.info.updateSucc, 'info');
            refresh(history, cn)
        }).catch(err => {
            context.toast(cn.home.error.title, cn.cas.info.updateErr + "\n" + err, 'danger');
        }).finally(() => setLoading(false));
    }

    const handleSelect = (e) => {
        setStatus(() => options[e.value]);
    }

    const reset = () => {
        setStatus(cas ? {
            value: options.findIndex(val => val.label === cas.status),
            label: cas.status
        } : null);
        cas && setNote(cas.napomena ? cas.napomena : "");
        const modalElement = document.getElementById('casModal')
        modalElement.addEventListener('show.bs.modal', () => {
            setStatus(cas ? {
                value: options.findIndex(val => val.label === cas.status),
                label: cas.status
            } : null);
            cas && setNote(cas.napomena ? cas.napomena : "");
        })
        return <></>
    }

    const listItem = (title, value) => {
        let additionalAttributes = title === cn.cas.status + ': ' ? 'fw-bold' : '';
        return <ul className="list-group list-group-horizontal border-bottom align-items-center">
            <li className="list-group-item border-0 fw-bolder">{title}</li>
            <li className={`list-group-item flex-fill border-0 text-end ${additionalAttributes}`}>{value}</li>
        </ul>
    }

    const handleOnBeforeGetContent = useCallback(() => {
        setLoading(true);
        return new Promise((resolve) => {
            onBeforeGetContentResolve.current = resolve;
            setTimeout(() => {
                let hide = document.getElementsByClassName("modal-footer");
                for (let element of hide) element.style.display = "none";
                document.getElementById('selectStatus').replaceWith(componentRef.current.children[1].childNodes[11].innerText.replace(cn.cas.status + ': ', ''));
                document.getElementById('note').replaceWith(componentRef.current.children[1].childNodes[10].innerText.replace(cn.cas.note + ': ', ''));
                resolve();
            }, 100);
        });
    }, []);

    const reactToPrintContent = useCallback(() => {
        return componentRef.current;
    }, [componentRef.current]);

    return (
        <>
            {loading && <LoadingSpinner/>}
            <div className="py-2">
                <div className="modal" tabIndex="-1" id="casModal">
                    <div className="modal-dialog">
                        <div className="modal-content" ref={componentRef}>
                            {cas && <div className="modal-header">
                                <h5 className="modal-title">{cn.cas.modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                            </div>}
                            {cas && <div className="modal-body">
                                {listItem(cn.reservation.nastavnik + ": ", " " + rezervacija.termin.nastavnik.filijala.name + ", " + rezervacija.termin.nastavnik.name + " - " + rezervacija.termin.nastavnik.nivoi.map(val => val.name + ' '))}
                                {listItem(cn.reservation.termin + ": ", new Date(rezervacija.termin.terminVreme).toLocaleString('sr-RS'))}
                                {listItem(cn.reservation.form.fname + ": ", rezervacija.first_name)}
                                {listItem(cn.reservation.form.lname + ": ", rezervacija.last_name)}
                                {listItem(cn.reservation.form.phone + ": ", rezervacija.phone)}
                                {listItem(cn.reservation.form.address + ": ", rezervacija.address)}
                                {listItem(cn.reservation.form.email + ": ", rezervacija.email)}
                                {listItem(cn.reservation.form.nivo + ": ", rezervacija.nivo)}
                                {listItem(cn.reservation.form.napomena + ": ", rezervacija.napomena)}
                                {listItem(cn.cas.user + ": ", cas.korisnik.first_name + " " + cas.korisnik.last_name)}
                                {listItem(cn.cas.note + ": ", <textarea id='note' className="textarea" value={note}
                                                                            defaultValue={note}
                                                                            onChange={(e) => setNote(e.target.value)}/>)}
                                {listItem(cn.cas.status + ": ",
                                    <Select id='selectStatus' className='react-select-container'
                                            classNamePrefix="react-select" value={status} defaultValue={status}
                                            options={options}
                                            placeholder={cn.home.select}
                                            onChange={handleSelect}
                                    />
                                )}
                            </div>}
                            <div className="modal-footer">
                                <ReactToPrint
                                    content={reactToPrintContent}
                                    documentTitle={cn.cas.modalTitle}
                                    onAfterPrint={() => refresh(history, cn)}
                                    onBeforeGetContent={handleOnBeforeGetContent}
                                    removeAfterPrint
                                    trigger={() => <button type="button" className="btn btn-info text-white"
                                                           data-bs-dismiss="modal">{cn.home.print}</button>}
                                    pageStyle='@page { margin: 0 20% 0 20%; size: portrait !important; } '
                                />
                                <button type="button" className="btn btn-danger text-white" data-bs-dismiss="modal"
                                        onClick={() => handleDelete(cas.id, cas.rezervacija.id)}>{cn.home.delete}</button>
                                <button type="button" className="btn btn-success text-white" data-bs-dismiss="modal"
                                        onClick={() => handleConfirm()}>{cn.home.confirm}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CasModalComponent