import React from 'react'
import {Route , Redirect} from 'react-router-dom'

import {connect} from 'react-redux'

const AuthorizedRoute = ({component : Component, authenticated, ...rest}) => (
    <Route {...rest}
        render = { (props) =>
            !authenticated ? <Redirect to='/' /> : <Component {...props} />
        } />
)

const mapStateToProps = (state) => ({
    authenticated : state.user.authenticated
})

export default connect(mapStateToProps)(AuthorizedRoute)
