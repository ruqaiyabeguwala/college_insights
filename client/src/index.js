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
import StudentDetail from './components/studentDetail';
import attendance from './components/attendance';
import studentByYear from './components/studentByYear';
import Search from './components/search';
import Login from './components/login';
import App from "./App";
import PrivateRoute from "./utils/privateRoute";
import Alert from "./components/alert"


const store=createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))
ReactDOM.render(
  
<Provider  store={store}>
<App/>
<Alert/>

    <BrowserRouter>
   
    <PrivateRoute exact path="/dashboard" component={Dashboard}/>
    <PrivateRoute exact path="/student/:branch/:year" component={studentByYear}/>
    <PrivateRoute exact path="/student/:id" component={StudentDetail}/>
    <PrivateRoute exact path="/student/attendance" component={attendance}/>
    <PrivateRoute exact path="/search/" component={Search}/>
    <Route exact path="/" component={Login}/>

</BrowserRouter>
</Provider>
, document.getElementById('root'));
