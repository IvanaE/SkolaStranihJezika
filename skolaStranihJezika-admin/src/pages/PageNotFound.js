import React from 'react'
import cnRS from '../constants.json'
import cnENG from '../constantsEng.json'

function PageNotFound() {
    const cn = localStorage.getItem('lang') === 'eng' ? cnENG : cnRS;

    return (
        <div>{cn.home.error["404"]}</div>
    )
}

export default PageNotFound
