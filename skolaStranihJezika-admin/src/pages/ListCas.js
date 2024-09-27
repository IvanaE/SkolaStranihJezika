import React, {useEffect, useState} from 'react'
import API from '../api'
import cnRS from '../constants.json'
import cnENG from '../constantsEng.json';
import CasModalComponent from "../template/CasModalComponent";
import AppContext from "../context/AppContext";
import Select from "react-select";
import LoadingSpinner from "../template/LoadingSpinner";

function ListCas() {
    const cn = localStorage.getItem('lang') === 'eng' ? cnENG : cnRS;
    const [context] = useState(AppContext);
    const options = [{value: 0, label: "CAS_ODRZAN"}, {value: 1, label: "NIJE_SE_POJAVIO"}, {value: 2, label: "POTVRDJEN"}, {
        value: 3,
        label: "OTKAZAN"
    }, {value: 4, label: "SVI"}];
    const [filter, setFilter] = useState({value: 4, label: "SVI"});
    const [casovi, setCasovi] = useState([]);
    const [selectedCas, setselectedCas] = useState(null);
    const [mounted] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        API.get(cn.path.api.casovi).then(res => {
            setCasovi(res.data);
        }).catch(err => {
            context.toast(cn.home.error.title, cn.cas.info.fetchErr + "\n" + err, 'danger');
        }).finally(() => setLoading(false));
    }, []);

    const handleSelect = (e) => {
        setFilter(() => options[e.value]);
    }

    const getStatusColor = (status) => {
        let color;
        switch (status) {
            case("CAS_ODRZAN"):
                color = 'text-success';
                break;
            case("NIJE_SE_POJAVIO"):
                color = 'text-danger';
                break;
            case("POTVRDJEN"):
                color = 'text-info';
                break;
            default:
                color = 'text-dark';
        }
        return color;
    }

    return (
        <>
            {loading && <LoadingSpinner/>}
            {mounted && <CasModalComponent cas={selectedCas}/>}
            <div className="card m-3 p-3">
                <div className="d-flex flex-row align-items-center justify-content-between">
                    <b>{cn.navigation.list.cas}</b>
                    <Select className='react-select-container w-25' classNamePrefix="react-select" value={filter}
                            defaultValue={filter}
                            options={options}
                            placeholder={cn.home.select}
                            onChange={handleSelect}
                    />
                </div>
                <table className="table table-stripped table-hover mt-3">
                    <thead>
                    <tr>
                        <th scope="col">{cn.reservation.nastavnik}</th>
                        <th scope="col">{cn.reservation.termin}</th>
                        <th scope="col">{cn.cas.user}</th>
                        <th scope="col">{cn.cas.status}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        casovi.map((cas, i) => {
                            let rezervacija = cas.rezervacija;
                            return ((cas.status === filter.label || filter.label === "SVI") &&
                                <tr className="out" role="button" id={cn.cas.id + cn.home.idSeparator + cas.id}
                                    key={cn.cas.id + cn.home.idSeparator + cas.id}
                                    data-bs-target="#casModal" data-bs-toggle="modal"
                                    onClick={() => setselectedCas(cas)}>
                                    <td className="cell">
                                        <img src={rezervacija.termin.nastavnik.picture} width="70px" alt=''/>
                                        {" " + rezervacija.termin.nastavnik.filijala.name}, {rezervacija.termin.nastavnik.name} - {rezervacija.termin.nastavnik.nivoi.map(val => val.name + ' ')}
                                    </td>
                                    <td className="cell">{new Date(rezervacija.termin.terminVreme).toLocaleString('sr-RS')}</td>
                                    <td className="cell">{cas.korisnik.first_name + " " + cas.korisnik.last_name}</td>
                                    <td className={`cell fw-bold ${getStatusColor(cas.status)}`}>{cas.status}</td>
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

export default ListCas
