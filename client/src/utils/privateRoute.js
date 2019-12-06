import React from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import {Route,Redirect} from "react-router-dom"

 const PrivateRoute=({component:Component,auth,...rest})=>(
<Route {...rest} render={props=>!auth?(<Redirect to="/"/>):(<Component {...props}/>)}/>
 )

PrivateRoute.propTypes = {

}

 const mapStateToProps = (state) => ({
auth:state.user.isAuthenticated
})

export default connect(mapStateToProps)(PrivateRoute);