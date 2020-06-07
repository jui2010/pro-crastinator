import React, { Component, Fragment } from 'react'

import withStyles from '@material-ui/core/styles/withStyles'

import EditIcon from '@material-ui/icons/Edit'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'

// import { Dropdown, DropdownMenu, DropdownItem, Progress } from 'reactstrap';

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
                    <DialogTitle><div style={{fontFamily: 'Bebas Neue'}}>Edit Todo</div></DialogTitle>
                    <form onSubmit={this.handleSubmit}  style={{margin : 'auto 15px'}}>
                        
                        <TextField name="description" id="description" label="Description" type="text" value={this.state.description}
                            onChange={this.handleChange} hiddenLabel={true}  variant="outlined" style={{marginBottom: '10px'}} fullWidth/>
                        
                        <TextField name="dueAt" id="dueAt" type="date" value={this.state.dueAt}  helperText="Due Date"
                            onChange={this.handleChange} hidden='hidden'  variant="outlined" style={{marginBottom: '10px'}} fullWidth />
                        
                        <TextField name="label" id="label" label="Label" type="text" value={this.state.label} helperText="Select an option from personal, office, general, shopping"
                            onChange={this.handleChange} hidden='hidden'  variant="outlined" style={{marginBottom: '10px'}} fullWidth />

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

export default connect(mapStateToProps, {editTodo})(withStyles(styles)(EditTodo))
