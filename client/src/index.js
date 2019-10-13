import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {createStore,applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {Provider} from "react-redux";
import {BrowserRouter,Route} from "react-router-dom";
import Dashboard from "./components/dashboard";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index"
import Student from './components/students';
import StudentDetail from './components/studentDetail';


const store=createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))
ReactDOM.render(
  
<Provider  store={store}>

    <BrowserRouter>
    <Route exact path="/" component={Dashboard}/>
    <Route exact path="/student/:branch/:year" component={Student}/>
    <Route exact path="/student/:id" component={StudentDetail}/>

</BrowserRouter>
</Provider>
, document.getElementById('root'));
