import React,{Fragment} from 'react'
import PropTypes from 'prop-types'
//rfep
import {Form,Button,Input} from "reactstrap";
import {Field,reduxForm} from "redux-form";
import {connect} from "react-redux";
import {loginUser} from "./../actions/index";
import {Redirect} from "react-router"
import Mynavbar from "./navbar";
import Loader from "./../img/loader.gif";
   
const handleInput=(field)=>{
 const {touched,error,warning}=field.meta
 return ( <Input type={field.type} placeholder={field.placeholder} name={field.name} className={field.meta.touched?(field.meta.error?"border-danger":""):""} /> 
 //touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))
 )
}

const Login = ({loginUser,history,handleSubmit,pristine,submitting,invalid,user,errors}) => {
  
  return (
    user.isAuthenticated? <Redirect to="/dashboard"/>: 
    <Fragment>
    <div>
        <Mynavbar />
          <h1>login now!</h1>
    <div >
      <Form style={{position:"absolute",top:200,right:200,left:200}}
       onSubmit={handleSubmit((values)=>{
         loginUser(values);
        
        })}>
          <Field name="email" placeholder="Enter email" component={handleInput} className="form-control" required/>
          {//field.meta.touched?(field.meta.error?er:""):""}       
          }
         
          <Field name="password" type="password" placeholder="Enter password" component={handleInput} className="form-control" required/>
          <Button disabled={pristine|| submitting|| invalid}>Login</Button>
      </Form>
    </div>
    </div>
    </Fragment>
   
  )
}

Login.propTypes = {
loginUser: PropTypes.func.isRequired
}
function validate(values){
  const errors=[];
  if(!values.email){
    errors.email="Enter an email"
  }
    if(!values.password){
      errors.password="Enter a password"
    }
  return errors;
}
function mapStateToProps(state){
  return{user:state.user}
}
export default reduxForm({validate,form:"login"})(connect(mapStateToProps,{loginUser})(Login))
