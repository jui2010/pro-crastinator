import React, { Component } from 'react'
import DeleteIcon from '@material-ui/icons/Delete'
import withStyles from '@material-ui/core/styles/withStyles'
import IconButton from '@material-ui/core/IconButton';

import {connect} from 'react-redux'
import {deleteTodo} from '../redux/actions/dataActions'

const styles = (theme) => ({
    ...theme.spread,
    delete : {
        // position : 'absolute',
        // left : '43%',
        color : '#757575',
        fontSize : '20px'
    }
})

class DeleteTodo extends Component {

    deleteTodo = () => {
        this.props.deleteTodo(this.props.todoId)
    }

    render() {
        const { classes } = this.props
        return (
            <div>
                <DeleteIcon className={classes.delete} onClick={this.deleteTodo}/>
            </div>
        )
    }
}

export default connect(null, {deleteTodo})(withStyles(styles)(DeleteTodo))