import React,{useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import {Route,Redirect} from "react-router-dom"
import {loadUser} from "./../actions/index"

const PrivateRoute=({component:Component,auth:{isAuthenticated,loading},...rest})=>{
   useEffect(() => {
        loadUser()
   }, []);
   return(
    <Route
    {...rest}
    render={props=>
    !isAuthenticated && !loading?
    (<Redirect to="/"/>):
    (<Component {...props}/>)
    }
    />)
}
    
PrivateRoute.propTypes = {

}

 const mapStateToProps = (state) => ({
auth:state.user
})

export default connect(mapStateToProps)(PrivateRoute);