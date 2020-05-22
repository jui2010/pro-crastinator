import React, { Component } from 'react'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'

import {connect} from 'react-redux'
import {toggleStatus} from '../redux/actions/dataActions'

import MyButton from './MyButton'

const styles = (theme) => ({
    ...theme.spread,
    todoCard : {
        marginTop : '10px',
        marginRight : '20px',
        "&:hover": {
            background: "#efefef"
        }
    },
    checkbox : {
        position : 'absolute',
        left : '45%'
    },
    labelBox : {
        width: theme.spacing(22),
        height: theme.spacing(22)
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
        const { classes, todo : {  description, status, label}} = this.props
        return (
            
                <Card className={classes.todoCard} 
                    style={{borderLeft : label === 'personal' ? '20px solid #ad1457' :
                    (label === 'work' ? '20px solid #6a1b9a' : '20px solid #0d47a1'   )}}>
                    <CardContent>
                        <Tooltip title={label} placement="top">
                            <Typography style={{textDecoration : status === 'complete' ? 'line-through' : ''}}>
                            {description}
                            </Typography>
                        </Tooltip> 
                        <input type="checkbox" label="Status" name="status" onClick={this.handleToggleStatus} 
                            checked = {status === 'complete' ? true : false} 
                            className={classes.checkbox} onChange={this.handleChange} />
                        
                    </CardContent>
                </Card>
            
        )
    }
}

const mapStateToProps = (state) => ({
    data : state.data
})

export default connect(mapStateToProps, {toggleStatus})(withStyles(styles)(TodoItem))
