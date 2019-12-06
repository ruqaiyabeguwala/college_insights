import React,{Fragment} from 'react'
import PropTypes from 'prop-types'
//rfep
import {Form,Button} from "reactstrap";
import {Field,reduxForm} from "redux-form";
import {connect} from "react-redux";
import {loginUser} from "./../actions/index";
import {Redirect} from "react-router"
import Mynavbar from "./navbar";

const Login = ({loginUser,history,handleSubmit,user}) => {
  return (
    user.isAuthenticated?<Redirect to="/dashboard"/>:
    <Fragment>
 
      <div>
        <Mynavbar isAuthenticated={user.isAuthenticated}/>
          <h1>login now!</h1>
    <div >
      <Form style={{position:"absolute",top:200,right:200,left:200}}
       onSubmit={handleSubmit((values)=>loginUser(values))}>
          <Field name="email" placeholder="Enter email" component="input" className="form-control" required/>
          <Field name="password" type="password" placeholder="Enter password" component="input" className="form-control" required/>
          <Button >Login</Button>
      </Form>
    </div>
    </div>
    </Fragment>
  )
}

Login.propTypes = {
loginUser: PropTypes.func.isRequired
}

function mapStateToProps(state){
  return{user:state.user}
}
export default reduxForm({form:"login"})(connect(mapStateToProps,{loginUser})(Login))
