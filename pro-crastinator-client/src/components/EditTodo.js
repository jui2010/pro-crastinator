import React, { Component, Fragment } from 'react'
import EditIcon from '@material-ui/icons/Edit'
import MyButton from './MyButton'
import withStyles from '@material-ui/core/styles/withStyles'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'

import {connect} from 'react-redux'
import {editTodo} from '../redux/actions/dataActions'

const styles = (theme) => ({
    ...theme.spread,
})

class EditTodo extends Component {

    state = {
        open : false,
        description : this.props.todo.description,
        label : this.props.todo.label,
        dueAt : this.props.todo.dueAt
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
        const todoDetails = {
            description : this.state.description,
            dueAt : this.state.dueAt,
            label : this.state.label
        }
        this.props.editTodo(this.props.todo.todoId , todoDetails)
        this.handleClose()
    }
    
    render() {
        return (
            <Fragment>
                <EditIcon color="secondary" style={{fontSize : '20px', color : '#757575'}} onClick={this.handleOpen}/>
             
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>Edit user details</DialogTitle>
                    <form onSubmit={this.handleSubmit}>
                        <TextField name="description" id="description" label="Description" type="text" value={this.state.description}
                            onChange={this.handleChange} fullWidth />
                        <TextField name="label" id="label" label="Label" type="text" value={this.state.label} 
                            onChange={this.handleChange} fullWidth />
                        <TextField name="dueAt" id="dueAt" label="Due At" type="date" value={this.state.dueAt} 
                            onChange={this.handleChange} fullWidth />
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

export default connect(mapStateToProps, {editTodo})(withStyles(styles)(EditTodo))
