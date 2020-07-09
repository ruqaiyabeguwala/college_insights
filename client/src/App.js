
import {connect} from "react-redux";
import React,{ Component ,useState,useEffect} from 'react'
import * as actions from "./../src/actions/index"
import MySpinner from "./../src/components/mySpinner"

 const App=({loadUser})=> {
   const [load, setload] = useState("true");
   useEffect(() => {
       loadUser();
       setTimeout(() => {
        setload(false)
       }, 1000);
   }, [])

   if(load){
    return <MySpinner/>
}
  return "";
}


function mapStateToProps(state){
  return{
    auth:state.user.isAuthenticated
  }
}

export default connect(mapStateToProps,actions) (App);
