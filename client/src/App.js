
import {connect} from "react-redux";
import {loadUser} from "./actions/index";
import setAuthToken from "./utils/setAuthToken";
import React,{ Component } from 'react'
import {Redirect} from "react-router-dom"



if(localStorage.token){
  setAuthToken(localStorage.token);
}

class App extends Component {
  componentDidMount() {
    this.props.loadUser()
  }
  

  render() {
  return("")
    
  }
}
const mapStateToProps=(state)=>{
  return{
    auth:state.user.isAuthenticated
  }
}

export default connect(mapStateToProps,{loadUser}) (App);
