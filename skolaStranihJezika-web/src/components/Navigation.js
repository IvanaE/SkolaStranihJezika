import React, {Fragment} from 'react';
import {Link, useHistory} from 'react-router-dom';
import cn from "../constants.json"

const Navigation = () => {

    const history = useHistory();

    return (
        <Fragment>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div className="container">
                    <div className="row w-100">
                        <div className="col text-start">
                            <Link to="/" className="navbar-brand text-primary">{cn.navigation.title}</Link>
                        </div>
                        <div className="col text-end">
                            <button className="btn btn-outline-primary btn-lg rounded-circle"
                                    onClick={() => history.push(cn.path.contact.root)}><i
                                className="bi bi-building"></i></button>
                        </div>
                    </div>
                </div>
            </nav>
        </Fragment>
    );
}

export default Navigation;