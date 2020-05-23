import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import withStyles from '@material-ui/core/styles/withStyles'


import {connect} from 'react-redux'

const styles = (theme) => ({
    ...theme.spread,
    currMonth : {
      textAlign : 'center',
    },
    mainDiv : {
        border : 'solid 1px #bdbdbd'
    }
})

class UserProfile extends Component {
    render() {
        const {classes} = this.props
        return (
            <div className={classes.mainDiv}>
               profile
            </div>
        )
    }
}

export default (withStyles(styles)(UserProfile))
