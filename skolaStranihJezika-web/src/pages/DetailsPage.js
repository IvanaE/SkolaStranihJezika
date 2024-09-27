import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import API from '../api'
import TerminThumbnail from '../components/TerminThumbnail';
import cn from '../constants.json'

function DetailsPage() {

    const {id} = useParams();
    const [nastavnik, setNastavnik] = useState({});
    const [filijala, setFilijala] = useState({});
    const [termini, setTermini] = useState([]);

    useEffect(() => {
        API.get(cn.path.api.nastavnici + "/" + id).then(res => {
            setNastavnik(res.data);
            setFilijala(res.data.filijala);
        }).catch(err => {
            console.log(err);
        });
    }, [])

    useEffect(() => {
        API.get(cn.path.api.nastavnici + "/" + id + "/" + cn.path.api.termini).then(res => {
            setTermini(res.data.filter(t => (new Date(t.terminVreme)) > new Date()));
        }).catch(err => {
            console.log(err);
        });
    }, [nastavnik])


    return (
        <div className="container mt-5">
            <form className="search-form border border-primary">
                <div className="row">
                    <div className="col-12">
                        <h1 className="text-primary"
                           >{cn.reservation.choose} {nastavnik.name}</h1>
                    </div>
                </div>
            </form>
            <div className="row mt-5">
                <div className="col-3">
                    <img src={nastavnik.picture} width="300px" height="400px"/>
                </div>
                <div className="col text-white text-justify">
                    <p className="lh-base mb-3">{filijala.name}, {filijala.address}, {filijala.city}</p>
                    <p className="lh-base mb-3">{nastavnik.about}</p>
                    <p className="lh-base mb-3">{nastavnik.sertifikati}</p>
                    <p className="lh-base mb-5">{cn.reservation.form.price}: {nastavnik.price}</p>
                    <div className="row g-3">
                        {
                            termini.length > 0 ? termini.sort((a, b) => new Date(a.terminVreme) - new Date(b.terminVreme)).map((termin, i) => {
                                return <div className="col-3">
                                    <TerminThumbnail termin={termin}
                                                     key={i}></TerminThumbnail>
                                </div>
                            }) : 'Nema termina'
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailsPage
