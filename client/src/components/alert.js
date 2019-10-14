import React from 'react';
import {connect} from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";



const Alert=({alert})=>
alert!=null && 
alert.length>0 &&
alert.map(
    a=>
    (
    <div key={a.id} className={`alert alert-${a.type} ` }>
       {a.msg}
    </div>
    ));               

function mapStateToProps(state){
    return{
        alert:state.alert
    }
}

export default connect(mapStateToProps)(Alert);