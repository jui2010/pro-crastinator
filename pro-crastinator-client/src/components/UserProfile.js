import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

//import {connect} from 'react-redux'

const styles = (theme) => ({
    ...theme.spread,
    currMonth : {
      textAlign : 'center',
    },
    mainDiv : {
        border : 'solid 1px #e0e0e0'
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
