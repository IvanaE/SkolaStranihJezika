import React, {Fragment} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";

import HomePage from "./pages/HomePage";
import DetailsPage from "./pages/DetailsPage";
import ReservationPage from "./pages/ReservationPage";
import PageNotFound from "./pages/PageNotFound";

import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ContactPage from './pages/ContactPage';

import cn from "./constants.json";

const App = (props) => {
    return (
        <Fragment>
            <Navigation></Navigation>
            <div style={{minHeight: "calc( 100vh - 251px )"}}>
                <Switch>
                    <Route exact path={`${cn.path.details.root}${cn.path.params.id}`}>
                        <DetailsPage/>
                    </Route>
                    <Route exact
                           path={`${cn.path.details.root}${cn.path.params.id}${cn.path.reservation.root}${cn.path.params.screeningId}`}>
                        <ReservationPage/>
                    </Route>
                    <Route exact path={cn.path.contact.root}>
                        <ContactPage/>
                    </Route>
                    <Route path={cn.path.home.root}>
                        <HomePage/>
                    </Route>
                    <Route exact path={cn.path.root}>
                        <Redirect push to={cn.path.home.root}></Redirect>
                    </Route>
                    <Route>
                        <PageNotFound></PageNotFound>
                    </Route>
                </Switch>
            </div>
            <Footer></Footer>
        </Fragment>
    );
}

export default App;
