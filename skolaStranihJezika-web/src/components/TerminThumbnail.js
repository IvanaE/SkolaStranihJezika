import React from 'react'
import {Link} from 'react-router-dom'
import cn from '../constants.json'

function TerminThumbnail(props) {

    const {termin} = props;

    return (
        <Link push to={cn.path.details.root + "/" + termin.nastavnik.id + cn.path.reservation.root + "/" + termin.id}>
            <div class="screen border border-primary text-center rounded">
                {new Date(termin.terminVreme).toLocaleString('sr-RS')}
            </div>
        </Link>
    )
}

export default TerminThumbnail
