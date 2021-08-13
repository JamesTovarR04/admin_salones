import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

const Routes = () => {
    return <Router>
        <Switch>
            <Route exact path="/">
                <h1>Hello</h1>
            </Route>
        </Switch>
    </Router>
}

export default Routes;