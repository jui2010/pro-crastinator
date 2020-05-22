import React, { Component, Fragment } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
//import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
//import IconButton from '@material-ui/core/IconButton';
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'

import PostTodo from './PostTodo'

const styles = (theme) => ({
    ...theme.spread,
    navBar : {
        flexGrow: 1,
        marginBottom : 0,
    },
    navContainer : {
        margin: 'auto',
    }
})

class NavBar extends Component {
    render() {
        const {classes} = this.props
        return (
            <div className={classes.navBar}> 
                <AppBar position="static">
                    <Toolbar className = {classes.navContainer}>
                        <Fragment>
                            <Button color="inherit" component = {Link} to="/home" >Home</Button>
                            <Button color="inherit" component = {Link} to="/month-view" >Month-wise</Button>
                            <Button color="inherit" component = {Link} to="/login" >Login</Button>
                            <Button color="inherit" component = {Link} to="/signup" >Signup</Button>
                            <PostTodo />
                        </Fragment>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default withStyles(styles)(NavBar)
