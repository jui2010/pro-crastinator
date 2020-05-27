import React, { Component, Fragment } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
//import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
//import IconButton from '@material-ui/core/IconButton';
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'

import {connect} from 'react-redux'

import PostTodo from './PostTodo'

const styles = (theme) => ({
    ...theme.spread,
    navBar : {
        flexGrow: 1,
        marginBottom : 0,
    },
    navContainer : {
        margin: 'auto'
    }
})

class NavBar extends Component {
    render() {
        const {classes} = this.props
        const {authenticated} = this.props.user
        return (
            <div className={classes.navBar}> 
                <AppBar position="static">
                    <Toolbar className = {classes.navContainer}>
                        {authenticated ? (<Fragment>
                            <Button color="inherit" component = {Link} to="/" >Procrastinator</Button>
                            <Button color="inherit" component = {Link} to="/home" >home</Button>
                            <Button color="inherit" component = {Link} to="/month-view" >Month-wise</Button>
                            <Button color="inherit" component = {Link} to="/profile" >Profile</Button>
                            <PostTodo />
                        </Fragment>) : (
                            <Fragment>
                            <Button color="inherit" component = {Link} to="/" >Procrastinator</Button>
                            <Button color="inherit" component = {Link} to="/login" >Login</Button>
                            <Button color="inherit" component = {Link} to="/signup" >Signup</Button>
                        </Fragment>
                        )}
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user : state.user
})
export default connect(mapStateToProps)(withStyles(styles)(NavBar))
