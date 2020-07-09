import React,{Fragment,useEffect} from 'react'
import PropTypes from 'prop-types'
//rfep
import {Form,Button,Input,FormGroup} from "reactstrap";
import {Field,reduxForm} from "redux-form";
import {connect} from "react-redux";
import * as actions from "./../actions/index";
import {Redirect} from "react-router"
import gimage from "./../img/google.png"
import fbimage from "./../img/fb.png"
   
const handleInput=(field)=>{ 
 return (
  <FormGroup className="m-2">      
  <Input className= {field.meta.touched?(field.meta.error?"border border-danger":""):""} type={field.type} placeholder={field.placeholder}  {...field.input}/>
<div className="text-danger" > {field.meta.touched?field.meta.error:""}</div>
</FormGroup>
 )
}

const Login = ({loginUser,loadUser,history,handleSubmit,pristine,submitting,invalid,user}) => {
  return (
  user.isAuthenticated? <Redirect to="/dashboard"/>:  
    <Fragment >
    <div className="row" style={{marginTop:100,marginLeft:300}}>
      <Form 
       onSubmit={handleSubmit((values)=>{
        // console.log(values)
         loginUser(values);
        })}>
          <Field name="email" placeholder="Enter email" component={handleInput} className="form-control" required/>
         
          <Field name="password" type="password" placeholder="Enter password" component={handleInput} className="form-control" required/>
          <Button disabled={pristine|| submitting || invalid}>Login</Button>
      </Form>
     
      </div>
      <div style={{marginLeft:300}}>
      <br/>
      <a href="/auth/google" className="btn" style={{background:"none",border:"1px solid grey"}}>
      <img src={gimage} width="30px" height="30px" style={{padding:"5px"}}/> 
      Sign in with Google
      </a>
     <br/>
    
      <a href="/auth/facebook" className="btn" style={{background:"none",border:"1px solid grey"}}>
      <img src={fbimage} width="30px" height="30px" style={{padding:"5px"}}/> 
      Sign in with facebook
      </a>
      </div>
    </Fragment>
   
  )
}

Login.propTypes = {
loginUser: PropTypes.func.isRequired,
loadUser:PropTypes.func.isRequired
}
function validate(values){
  const errors=[];
  if(!values.email){
    errors.email="Enter an email"
  }
  if(/.+@.+\..+/.test(values.email)==false){
   errors.email="Please enter a proper email "
  }
    if(!values.password){
      errors.password="Enter a password"
    }

  return errors;
}
function mapStateToProps(state){
  return{user:state.user}
}
export default reduxForm({validate,form:"login"})(connect(mapStateToProps,actions)(Login))
