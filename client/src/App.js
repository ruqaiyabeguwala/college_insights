
import {connect} from "react-redux";
import {loadUser} from "./actions/index";
import setAuthToken from "./utils/setAuthToken";
import { Component } from 'react'



if(localStorage.token){
  setAuthToken(localStorage.token);
}

class App extends Component {
  componentDidMount() {
    this.props.loadUser()
  }
  
  render() {
    return (
      ""
    );
  }
}


export default connect(null,{loadUser}) (App);
