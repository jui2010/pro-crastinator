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
            createdAt : this.props.day !== '' ? this.props.day.toISOString() : new Date().toISOString()
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
                    <DialogTitle ><div style={{fontFamily: 'Bebas Neue'}}>Add task</div></DialogTitle>
                    <form onSubmit={this.handleSubmit} style={{margin : 'auto 15px'}}>
                        
                        <TextField name="description" id="description" label="Description" type="text" 
                            onChange={this.handleChange} variant="outlined" style={{marginBottom: '10px'}} fullWidth />
                        
                        <TextField name="dueAt" id="dueAt" type="date" onChange={this.handleChange} helperText="Due Date"
                            style={{marginBottom: '10px'}} variant="outlined" fullWidth />
                        
                        <TextField name="label" id="label" label="Label" type="text" onChange={this.handleChange} helperText="Select an option from personal, office, general, shopping"
                            style={{marginBottom: '10px'}} variant="outlined" fullWidth />
                        
                        <Button type="submit" variant="contained" color="primary" 
                            style={{fontFamily: 'Bebas Neue', margin : '10px 5px', fontSize : '16px'}}>
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
