import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import EmailIcon from '@material-ui/icons/Email'
import FormatQuoteIcon from '@material-ui/icons/FormatQuote'
import EditUserDetails from './EditUserDetails'
import Button from '@material-ui/core/Button'

import {connect} from 'react-redux'

const styles = (theme) => ({
    ...theme.spread,
    currMonth : {
      textAlign : 'center',
    },
    mainDiv : {
        // border : 'solid 1px black',
        width: theme.spacing(32),
    },
    imgDiv : {
        // border : 'solid 1px black',
        objectFit: 'cover',
        height: theme.spacing(32),
        width: theme.spacing(32),
    },
    editProfileDiv : {
        border : 'solid 1px #e0e0e0',
        height: theme.spacing(3.5),
        display : 'flex',
        flexDirection : 'row'
    },
    nameDiv : {
        marginTop : '15px',
        fontSize : '25px',
        height: theme.spacing(3.5),
        display : 'flex',
        flexDirection : 'row',
        textTransform : 'capitalize',
        fontFamily: 'Hind',
        letterSpacing  : '0.2px'
    },
    usernameDiv : {
        marginTop : '6px',
    },
    bioDiv : {
        marginTop : '18px',
        fontSize : '14px',
        color : '#424242',
        display : 'flex',
        flexDirection : 'row'
    },
    locationDiv : {
        marginTop : '4px',
        fontSize : '14px',
        color : '#424242',
        display : 'flex',
        flexDirection : 'row'
    },
    emailDiv : {
        marginTop : '4px',
        fontSize : '14px',
        color : '#424242',
        display : 'flex',
        flexDirection : 'row'
    }
})

class UserProfile extends Component {
    render() {
        const {classes} = this.props
        const {profileImage} = this.props.data.userInfo
        // const {username, firstName, lastName ,createdAt, location, bio, profileImage, email} = this.props.data.userInfo
        let username="jui2010"
        let firstName="jui"
        let lastName ="thombre"
        let location="mumbai"
        let email = "jui@gmail.com"
        let bio = "username, firstName, lastName ,createdAt, locat"
        return (
            <div className={classes.mainDiv}>
                <div className={classes.imgDiv}>
                    <img src={profileImage} alt="profilePicture" className={classes.imgDiv} />
                </div>
                <div className={classes.editProfileDiv}>
                    Edit profile <Button className={classes.button} color="secondary" ><EditUserDetails/></Button>
                </div>
                <div className={classes.nameDiv}>
                    {firstName ? firstName : ''} {lastName ? lastName : ''}
                </div>
                <div className={classes.usernameDiv}>
                    @{username}
                </div>
                <div className={classes.bioDiv} >
                    <FormatQuoteIcon style={{fontSize : '18px', color : '#424242'}}/> {bio}
                </div>
                <div className={classes.emailDiv} >
                    <EmailIcon style={{fontSize : '18px', color : '#424242'}} /> {email}
                </div>
                <div className={classes.locationDiv} >
                    <LocationOnIcon style={{fontSize : '18px', color : '#424242'}}/> {location}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    data : state.data
})

export default connect(mapStateToProps)(withStyles(styles)(UserProfile))
