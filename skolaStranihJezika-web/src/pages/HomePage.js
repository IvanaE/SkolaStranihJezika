import React, {useEffect, useState} from 'react'
import API from '../api'
import Select from 'react-select'
import 'react-datepicker/dist/react-datepicker.css'
import NastavnikThumbnail from '../components/NastavnikThumbnail'
import cn from '../constants.json'

const HomePage = () => {

    const [nivoi, setNivoi] = useState([]);
    const [nastavnici, setnastavnici] = useState([]);
    const [nastavniciBackup, setnastavniciBackup] = useState([]);
    const [options, setOptions] = useState([]);


    const [category, setCategory] = useState(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        API.get(cn.path.api.nastavnici).then(res => {
            setnastavnici(res.data);
            setnastavniciBackup(res.data);
        }).catch(err => {
            console.log(err);
        });
    }, [])

    useEffect(() => {
        API.get(cn.path.api.nivoi).then(res => {
            setNivoi(res.data);
        }).catch(err => {
            console.log(err);
        });
    }, [nastavnici])

    useEffect(() => {
        let catOptions = [];
        for (const cat of nivoi) {
            catOptions.push({value: cat.id, label: cat.name})
        }
        setOptions(catOptions);
    }, [nivoi])

    function handleSubmit(e) {
        e.preventDefault();
        let nastavniciShow = nastavniciBackup;
        if (search !== "") {
            nastavniciShow = nastavnici.filter(m => m.filijala.address.toUpperCase().includes(search.toUpperCase()) ||
                m.filijala.name.toUpperCase().includes(search.toUpperCase()) ||
                m.filijala.city.toUpperCase().includes(search.toUpperCase()));
        }
        if (category != null) {
            nastavniciShow = nastavniciShow.filter(m => m.nivoi.some(c => c.id === category));
        }
        console.log(nastavniciShow)
        setnastavnici(nastavniciShow);
    }

    return (
        <div className="container mt-5">
            <form className="search-form border border-primary" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-12 row">
                        <div className="col-4">
                            <input type="text" className="form-control" value={search}
                                   onChange={e => setSearch(e.target.value)} style={{height: "64px"}}/>
                        </div>
                        <div className="col-4">
                            <Select className='react-select-container' classNamePrefix="react-select" options={options}
                                    placeholder={cn.home.select} onChange={e => setCategory(e.value)}/>
                        </div>
                        <div className="col-4">
                            <button type="submit" className="btn btn-primary w-100">{cn.home.search}</button>
                        </div>
                    </div>
                </div>
            </form>
            {
                (nastavnici.length === 0) ?
                    <div className="container mt-5 text-white">{cn.home.error.notFound}</div>
                    :
                    <div className="row mt-2 g-4">
                        {
                            nastavnici.map((nastavnik, i) => (
                                <div className="col-3">
                                    <NastavnikThumbnail nastavnik={nastavnik} key={i}></NastavnikThumbnail>
                                </div>
                            ))
                        }
                    </div>
            }

        </div>
    );
}


export default HomePage;
