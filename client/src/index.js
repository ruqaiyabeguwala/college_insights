import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {createStore,applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {Provider} from "react-redux";
import {BrowserRouter,Route,Switch,HashRouter} from "react-router-dom";
import Dashboard from "./components/dashboard";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index"
import StudentDetail from './components/studentDetail';
import attendance from './components/attendance';
import studentByYear from './components/studentByYear';
import Search from './components/search';
import Login from './components/login';
import MyHeader from "./../src/components/navbar";
import PrivateRoute from "./utils/privateRoute";
import Alert from "./components/alert"
import App from "./App"


const store=createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))
ReactDOM.render(
  
<Provider  store={store}>


<Alert/>
<HashRouter>
<MyHeader/>
<App/>
    <Route exact path="/dashboard" component={Dashboard}/>
    <Route exact path="/student/:branch/:year" component={studentByYear}/>
    <Route exact path="/student/:id" component={StudentDetail}/>
    <Route exact path="/student/attendance" component={attendance}/>
    <Route exact path="/search/" component={Search}/>
    <Route exact path="/" component={Login}/>
</HashRouter>
</Provider>
, document.getElementById('root'));
