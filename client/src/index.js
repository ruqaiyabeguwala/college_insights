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


const store=createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))
ReactDOM.render(
  
<Provider  store={store}>

    <BrowserRouter>
    <Route exact path="/" component={Dashboard}/>
    <Route exact path="/student/:branch/:year" component={studentByYear}/>
    <Route exact path="/student/:id" component={StudentDetail}/>
    <Route exact path="/student/attendance" component={attendance}/>
    <Route exact path="/search/" component={Search}/>

</BrowserRouter>
</Provider>
, document.getElementById('root'));
