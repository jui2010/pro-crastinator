import React, { Component } from 'react'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import withStyles from '@material-ui/core/styles/withStyles'
import { Typography } from '@material-ui/core'

import {connect} from 'react-redux'
import {toggleStatus} from '../redux/actions/dataActions'


const styles = (theme) => ({
    ...theme.spread,
    todoCard : {
        marginTop : '10px',
        marginRight : '20px'
    },
    checkbox : {
        position : 'absolute',
        left : '45%'
    }
})

class TodoItem extends Component {

    handleToggleStatus = (event) => {   
        this.props.toggleStatus(this.props.todo.todoId)
        console.log(this.props.todoId)
    }
    
    handleChange = (event) => {   
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    render() {
        const { classes, todo : {  description, status}} = this.props
        return (
            <Card className={classes.todoCard}>
                <CardContent>
                    <Typography style={{textDecoration : status === 'complete' ? 'line-through' : ''}}>
                        {description}

                        <input type="checkbox" label="Status" name="status" onClick={this.handleToggleStatus} 
                        checked = {status === 'complete' ? true : false} 
                        className={classes.checkbox} onChange={this.handleChange} />
                    </Typography>
                </CardContent>
            </Card>
        )
    }
}

const mapStateToProps = (state) => ({
    data : state.data
})

export default connect(mapStateToProps, {toggleStatus})(withStyles(styles)(TodoItem))
