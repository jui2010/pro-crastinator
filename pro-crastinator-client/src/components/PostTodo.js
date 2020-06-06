import React, { Component, Fragment } from 'react'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import MyButton from './MyButton'
import withStyles from '@material-ui/core/styles/withStyles'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'

import {connect} from 'react-redux'
import {postTodo} from '../redux/actions/dataActions'

const styles = (theme) => ({
    ...theme.spread,
})

class PostTodo extends Component {
    state = {
        open : false,
        description : '',
        label : '',
        dueAt : ''
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
        const newTodo = {
            description : this.state.description,
            label : this.state.label,
            username : this.props.data.userInfo.username,
            dueAt : this.state.dueAt,
        }
        this.props.postTodo(newTodo)
        this.handleClose()
    }
    
    render() {
        return (
            <Fragment>
                <MyButton tip ={'Add task'} onClick={this.handleOpen}>
                    <AddCircleOutlineIcon color="secondary" style={{fontSize : '20px'}}/>
                </MyButton>
                
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>Add task</DialogTitle>
                    <form onSubmit={this.handleSubmit}>
                        <TextField name="description" id="description" label="Description" type="text" onChange={this.handleChange} fullWidth />
                        <TextField name="dueAt" id="dueAt" label="Due at" type="date" onChange={this.handleChange} fullWidth />
                        <TextField name="label" id="label" label="Label" type="text" onChange={this.handleChange} fullWidth />
                        <Button type="submit" variant="contained" color="primary">
                            Post
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
export default connect(mapStateToProps, {postTodo})(withStyles(styles)(PostTodo))
