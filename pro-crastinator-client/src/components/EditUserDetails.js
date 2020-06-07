import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'

import {connect} from 'react-redux'
import {editUserDetails} from '../redux/actions/dataActions'

const styles = (theme) => ({
    ...theme.spread,
    button : {
        "&:hover":{
            background: "#e0e0e0"
        },
        fontSize : '15px',
        fontFamily: 'Hind',
        color : '#757575',
        width: theme.spacing(32),
        textAlign : 'center',
        marginTop : '3px'
    }
})

class EditUserDetails extends Component {
    state = {
        open : false,
        firstName : this.props.data.userInfo.firstName,
        lastName : this.props.data.userInfo.lastName,
        location : this.props.data.userInfo.location,
        bio : this.props.data.userInfo.bio
    }

    handleOpen = () => {
        this.setState({
            open : true
        })
    }

    handleClose = () => {
        this.setState({
            open : false
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
        console.log(this.state)
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const userDetails = {
            firstName : this.state.firstName,
            lastName : this.state.lastName,
            location : this.state.location,
            bio : this.state.bio
        }
        this.props.editUserDetails(userDetails)
        this.handleClose()
    }
    
    render() {
        const {classes} = this.props
        return (
            <Fragment>
                <div onClick={this.handleOpen} className={classes.button}>
                    Edit Profile
                </div>
                
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle><div style={{fontFamily: 'Bebas Neue'}}>Edit user details</div></DialogTitle>
                    <form onSubmit={this.handleSubmit} style={{margin : 'auto 15px'}}>

                        <TextField name="firstName" id="firstName" label="First Name" type="text" onChange={this.handleChange}
                            style={{marginBottom: '10px'}} value={this.state.firstName} variant="outlined" fullWidth />
                        
                        <TextField name="lastName" id="lastName" label="Last Name" type="text" onChange={this.handleChange}
                            style={{marginBottom: '10px'}} value={this.state.lastName} variant="outlined" fullWidth />
                        
                        <TextField name="location" id="location" label="Location" type="text" onChange={this.handleChange} 
                            style={{marginBottom: '10px'}} value={this.state.location} variant="outlined" fullWidth />

                        <TextField name="bio" id="bio" label="Bio" type="text" onChange={this.handleChange} 
                            style={{marginBottom: '10px'}} value={this.state.bio} variant="outlined" fullWidth />

                        <Button type="submit" variant="contained" color="primary"
                            style={{fontFamily: 'Bebas Neue', margin : '10px 5px', fontSize : '16px'}}>
                            Submit
                        </Button>

                    </form>
                </Dialog>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    data : state.data
})

export default connect(mapStateToProps, {editUserDetails})(withStyles(styles)(EditUserDetails))
