import React from 'react';
import './App.css';
import CatCatalogue from "./Components/Cat/CatCatalogue";
import {Route, Switch, withRouter} from 'react-router-dom';
import CatCardDetail from "./Components/Cat/CatCardDetail";

function App() {
    return (
        <>
            <Switch>
              <Route path="/:catId" component={CatCardDetail}/>
              <Route path="/" component={CatCatalogue}/>
            </Switch>
        </>
    );
}

export default withRouter(App);
