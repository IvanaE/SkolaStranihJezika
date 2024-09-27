import React, {useEffect, useState} from 'react'
import API from '../api'
import cn from '../constants.json'

function ContactPage() {

    const [filijale, setFilijale] = useState([]);

    useEffect(() => {
        API.get(cn.path.api.filijale).then(res => {
            setFilijale(res.data);
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        })
    }, [])


    return (
        <div className="container mt-5">
            <form className="search-form border border-primary">
                <div className="row">
                    <div className="col-12">
                        <h1 className="text-primary" style={{lineHeight: "63px"}}>{cn.contact.title}</h1>
                    </div>
                </div>
            </form>
            <div className="row mt-5 text-white">
                {
                    filijale.map((filijala) => {
                        return <div className="col-4">
                            <p><b>{filijala.name}</b></p>
                            <p>{filijala.address}, {filijala.city}</p>
                            <p>{cn.contact.phone} {filijala.phone}</p>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default ContactPage
