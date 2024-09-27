import React, {useContext} from 'react'
import {Link, Redirect, Route, Switch, useHistory} from "react-router-dom"
import AddFilijala from '../pages/AddFilijala'
import AppContext, {isAdmin} from '../context/AppContext'
import PageNotFound from '../pages/PageNotFound'
import ListCas from '../pages/ListCas'
import ListFilijala from '../pages/ListFilijala'
import AddNivo from '../pages/AddNivo'
import AddNastavnik from '../pages/AddNastavnik'
import ListNivo from '../pages/ListNivo'
import ListNastavnik from '../pages/ListNastavnik'
import ListUsers from '../pages/ListUsers'
import AddTermin from '../pages/AddTermin'
import AddUser from '../pages/AddUser'
import ListReservations from '../pages/ListReservations'
import ListTermin from '../pages/ListTermin'
import cnENG from "../constantsEng.json";
import cnRS from "../constants.json";
import refresh from "../functions/refresh";

function Dashboard() {
    const cn = localStorage.getItem('lang') === 'eng' ? cnENG : cnRS;

    const [context] = useContext(AppContext);
    const timestamp = new Date(localStorage.getItem("timestamp"));
    const history = useHistory();

    if (context.user != null && timestamp > new Date()) {
        return (
            <div id="wrapper" className="d-flex vh-100">
                <ul className="navbar-nav sidebar sidebar-dark text-secondary">
                    <li className="mx-3 mt-2 align-self-center">{context.user.first_name} {context.user.last_name}</li>
                    <li className="mx-3 align-self-center">{context.user.filijala.name}</li>
                    <li className="mx-3 mt-3"><h1>{cn.navigation.titleSide}</h1></li>
                    <li><h3 className="m-0 mt-2">{cn.navigation.main}</h3></li>
                    <li><Link to={cn.path.list.reservations}>{cn.navigation.list.reservations}</Link></li>
                    <li><Link to={cn.path.list.cas}>{cn.navigation.list.cas}</Link></li>
                    {isAdmin(context) && <li><Link to={cn.path.add.users}>{cn.navigation.add.user}</Link></li>}
                    {isAdmin(context) && <li><Link to={cn.path.list.users}>{cn.navigation.list.user}</Link></li>}
                    <li><h3 className="m-0 mt-2">{cn.navigation.filijale}</h3></li>
                    {isAdmin(context) && <li><Link to={cn.path.add.filijale}>{cn.navigation.add.filijala}</Link></li>}
                    <li><Link to={cn.path.list.filijale}>{cn.navigation.list.filijala}</Link></li>
                    <li><h3 className="m-0 mt-2">{cn.navigation.nastavnici}</h3></li>
                    {isAdmin(context) &&
                        <li><Link to={cn.path.add.nivoi}>{cn.navigation.add.nivo}</Link></li>}
                    {isAdmin(context) && <li><Link to={cn.path.add.nastavnici}>{cn.navigation.add.nastavnik}</Link></li>}
                    <li><Link to={cn.path.list.nivoi}>{cn.navigation.list.nivo}</Link></li>
                    <li><Link to={cn.path.list.nastavnici}>{cn.navigation.list.nastavnik}</Link></li>
                    <li><h3 className="m-0 mt-2">{cn.navigation.termini}</h3></li>
                    <li><Link to={cn.path.add.termin}>{cn.navigation.add.termin}</Link></li>
                    <li><Link to={cn.path.list.termin}>{cn.navigation.list.termin}</Link></li>
                    <img className="refresh" role="button" src="https://img.icons8.com/metro/104/EBEBEB/restart.png"
                         width="104" onClick={() => refresh(history, cn)}/>
                </ul>
                <div id="content-wrapper" className="d-flex flex-column">
                    <Switch>
                        {isAdmin(context) && <Route exact path={cn.path.add.filijale}>
                            <AddFilijala></AddFilijala>
                        </Route>}
                        <Route exact path={cn.path.add.termin}>
                            <AddTermin></AddTermin>
                        </Route>
                        {isAdmin(context) && <Route exact path={cn.path.add.nivoi}>
                            <AddNivo></AddNivo>
                        </Route>}
                        {isAdmin(context) && <Route exact path={cn.path.add.nastavnici}>
                            <AddNastavnik></AddNastavnik>
                        </Route>}
                        <Route exact path={cn.path.list.cas}>
                            <ListCas></ListCas>
                        </Route>
                        <Route exact path={cn.path.list.filijale}>
                            <ListFilijala></ListFilijala>
                        </Route>
                        <Route exact path={cn.path.list.nivoi}>
                            <ListNivo></ListNivo>
                        </Route>
                        <Route exact path={cn.path.list.nastavnici}>
                            <ListNastavnik></ListNastavnik>
                        </Route>
                        <Route exact path={cn.path.list.termin}>
                            <ListTermin></ListTermin>
                        </Route>
                        {isAdmin(context) && <Route exact path={cn.path.list.users}>
                            <ListUsers></ListUsers>
                        </Route>}
                        {isAdmin(context) && <Route exact path={cn.path.add.users}>
                            <AddUser></AddUser>
                        </Route>}
                        <Route exact path={cn.path.list.reservations}>
                            <ListReservations></ListReservations>
                        </Route>
                        <Route>
                            <PageNotFound></PageNotFound>
                        </Route>
                    </Switch>
                </div>
            </div>
        )
    } else {
        localStorage.removeItem('timestamp');
        context.user=null;
        context.token=null;
        return <Redirect push to={cn.path.login.root}/>
    }
}

export default Dashboard

