import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Header from './components/header';
import Cursos from './pages/cursos';
import Inicio from './pages/inicio';

const Routes = () => {
    return <Router>
        <Header/>
        <Switch>
            <Route exact path="/">
                <Inicio/>
            </Route>
            <Route path="/cursos">
                <Cursos/>
            </Route>
        </Switch>
    </Router>
}

export default Routes;