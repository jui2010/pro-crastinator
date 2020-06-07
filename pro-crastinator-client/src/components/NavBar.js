import React, { Component, Fragment } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'

import {connect} from 'react-redux'

import AppIcon from '@material-ui/icons/Subject'
import SimpleMenu from './SimpleMenu'
import EventAvailableIcon from '@material-ui/icons/EventAvailable'
import HomeIcon from '@material-ui/icons/Home'

const styles = (theme) => ({
    ...theme.spread,
    navBar : {
        marginBottom : '20px'
    },
    appBar : {
        height: theme.spacing(6),
    },
    toolBar : {
        margin: '5px 20px 27px auto',
        paddingBottom : '50px'
    },
    logo : {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
    profileImage : {
        width: theme.spacing(4),
        height: theme.spacing(4),
        objectFit: 'cover',
        borderRadius: '50%'
    },
    logoAuth : {
        margin : 'auto 900px 23px auto'
    },
    logoNotAuth : {
        margin : 'auto 1120px 23px auto'
    },
    profileA : {
        margin : 'auto auto 23px auto'
    },
    button : {
        marginBottom : '27px',
        marginLeft : ' 0px',
        fontFamily: 'Bebas Neue',
        fontSize : '25px'
    },
    postTodo : {
        margin : '0px auto auto auto'
    },
    appIconDiv : {
        fontSize : '20px',
        color : 'white',
        fontFamily: 'Bebas Neue',
    }
})


class NavBar extends Component {
    state = {
        open : false
    }
    handleClose = () => {
        this.setState({
            open : false
        })
    }
    handleClick = () => {
        this.setState({
            open : !this.state.open
        })
    }
    render() {
        const {classes} = this.props
        const {authenticated} = this.props.user
        const {userInfo : {profileImage}} = this.props.data
        return (
            <div className={classes.navBar}> 
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar className = {classes.toolBar}>
                        {authenticated ? (
                        <Fragment>
                            <Button className={classes.logoAuth} color="secondary" component = {Link} to="/" >
                                <AppIcon className={classes.logo}/>
                                <div className={classes.appIconDiv}>
                                    <div>Pro/Crastinator</div>
                                </div>
                            </Button>
                            <Button className={classes.button} color="secondary" component = {Link} to="/home" ><HomeIcon/></Button>
                            <Button className={classes.button} color="secondary" component = {Link} to="/month-view" ><EventAvailableIcon/></Button>
                            <a href="/profile" className={classes.profileA} ><img className={classes.profileImage} src={profileImage} alt='procrastinator'/></a>
                            <Button className={classes.button} color="secondary" ><SimpleMenu/></Button>
                        </Fragment>) : (
                        <Fragment>
                            <Button className={classes.logoNotAuth} color="secondary" component = {Link} to="/" ><AppIcon className={classes.logo}/></Button>
                            <Button className={classes.button} color="secondary" component = {Link} to="/login" >Login</Button>
                            <Button className={classes.button} color="secondary" component = {Link} to="/signup" >Signup</Button>
                        </Fragment>
                        )}
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user : state.user,
    data : state.data
})
export default connect(mapStateToProps)(withStyles(styles)(NavBar))
                        