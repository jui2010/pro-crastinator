import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

import {connect} from 'react-redux'

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
        const {username, firstName, lastName ,createdAt, location, bio, profileImage} = this.props.data.userInfo
        return (
            <div className={classes.mainDiv}>
                <img src={profileImage} alt="profilePicture" />
                <div>{firstName} {lastName}</div>
                <div>@{username}</div>
                <div>{location}</div>
                <div>{bio}</div>
                <div>createdAt : {createdAt}</div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    data : state.data
})

export default connect(mapStateToProps)(withStyles(styles)(UserProfile))
