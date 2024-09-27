import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import API from '../api'
import CheckoutForm from '../components/CheckoutForm'
import cn from '../constants.json'


function ReservationPage(props) {

    const {terminId} = useParams();
    const [termin, setTermin] = useState(null);

    useEffect(() => {
        API.get(cn.path.api.termini + "/" + terminId).then(res => {
            setTermin(res.data);
        }).catch(err => {
            console.log(err);
        });
    }, [])

    if (termin) {
        return (
            <div className="container mt-5">
                <form className="search-form border border-primary">
                    <div className="row">
                        <div className="col-12 row text-primary">
                            <div>{cn.reservation.for}: {new Date(termin.terminVreme).toLocaleString('sr-RS')}</div>
                            <div><h1>{termin.nastavnik.filijala.name}</h1></div>
                        </div>
                    </div>
                </form>
                <div className="row mt-2 g-4">
                    <div className="col-5 text-white">
                        <CheckoutForm termin={termin}/>
                    </div>
                    <div className="col text-center">
                        <img src={termin.nastavnik.picture}/>
                    </div>
                    <div className="col-4 text-white">
                        <p>{cn.reservation.nivo}: {(termin.nastavnik.nivoi.map(k => k.name + " ").toString()).trimEnd()}</p>
                    </div>
                </div>
            </div>
        )
    } else {
        return <h1>{cn.reservation.loading}</h1>
    }
}

export default ReservationPage
