import {Link} from 'react-router-dom'
import cn from '../constants.json'

const NastavnikThumbnail = (props) => {
    const nastavnik = props.nastavnik;
    return (
        <Link push to={cn.path.details.root + "/" + nastavnik.id} style={{textDecoration: "none"}}>
            <div className="nastavnik-thumbnail">
                <div className="nastavnik-thumbnail-picture"
                     style={{background: `url(${nastavnik.picture}) no-repeat center center/cover`}}></div>
                <div className="nastavnik-thumbnail-content text-center border border-primary">
                    <h4 className="text-primary">{nastavnik.filijala.name}, {nastavnik.filijala.city}, {nastavnik.name},
                        ({(nastavnik.nivoi.map(k => k.name + " ").toString()).trimEnd()})</h4>
                </div>
            </div>
        </Link>
    );
}

export default NastavnikThumbnail;