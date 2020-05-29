import React, { Component, Fragment } from 'react'
import EditIcon from '@material-ui/icons/Edit'
import MyButton from './MyButton'
import withStyles from '@material-ui/core/styles/withStyles'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'

import {connect} from 'react-redux'
import {editUserDetails} from '../redux/actions/dataActions'

const styles = (theme) => ({
    ...theme.spread,
})

class EditUserDetails extends Component {
    state = {
        open : false,
        firstName : '',
        lastName : '',
        location : '',
        bio : ''
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
        return (
            <Fragment>
                <MyButton tip ={'Edit user details'} onClick={this.handleOpen}>
                    <EditIcon color="secondary"/>
                </MyButton>
                
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>Edit user details</DialogTitle>
                    <form onSubmit={this.handleSubmit}>
                        <TextField name="firstName" id="firstName" label="First Name" type="text" onChange={this.handleChange} fullWidth />
                        <TextField name="lastName" id="lastName" label="Last Name" type="text" onChange={this.handleChange} fullWidth />
                        <TextField name="location" id="location" label="Location" type="text" onChange={this.handleChange} fullWidth />
                        <TextField name="bio" id="bio" label="Bio" type="text" onChange={this.handleChange} fullWidth />
                        <Button type="submit" variant="contained" color="primary">
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
