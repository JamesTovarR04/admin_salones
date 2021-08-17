import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Header from './components/header';
import Cursos from './pages/cursos';
import Inicio from './pages/inicio';
import Salones from './pages/salones';

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
            <Route path="/salones">
                <Salones/>
            </Route>
        </Switch>
    </Router>
}

export default Routes;