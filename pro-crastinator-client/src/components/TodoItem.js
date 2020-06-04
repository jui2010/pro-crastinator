import React, { Component , Fragment} from 'react'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteTodo from './DeleteTodo'
import EditTodo from './EditTodo'

import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import CircleCheckedFilled from '@material-ui/icons/CheckCircle'
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked'

import {connect} from 'react-redux'
import {toggleOngoingStatus, setStatusComplete} from '../redux/actions/dataActions'
import Slide from '@material-ui/core/Slide'

const styles = (theme) => ({
    ...theme.spread,
    todoCard : {
        margin : 'auto 10px 10px 10px',
        height: theme.spacing(5),
        "&:hover": {
            background: "#efefef"
        },
        display : 'flex',
        flexDirection : 'row',
    },
    todoContent1 : {
        width: theme.spacing(3),
        padding: theme.spacing(0),
        marginLeft : '10px'
    },
    todoContent2 : {
        width: theme.spacing(95),
        padding: theme.spacing(1)
    },
    todoContent3 : {
        padding: theme.spacing(1)
    },
    todoContent4 : {
        padding: theme.spacing(1)
    },
    checkbox : {
        borderRadius: '50%'
    }
})

class TodoItem extends Component {

    state = {
        isHovering: false,
    }

    handleMouseHover = () => {
        this.setState({
            isHovering : true
        })
    }

    handleMouseNoHover = () => {
        this.setState({
            isHovering : false
        })
    }

    handleOngoingStatus = () => {
        this.props.toggleOngoingStatus(this.props.todo.todoId)
        console.log(this.props.todo.todoId)
    }
    
    handleStatusComplete = () => {
        this.props.setStatusComplete(this.props.todo.todoId)
    }

    handleChange = (event) => {   
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    render() {
        const { classes, todo : { todoId, description, status, label}} = this.props
        const renderDeleteTodo = this.state.isHovering ? (
            <Fragment >
                <DeleteTodo todoId={todoId}/>
            </Fragment>
        ) : ''

        const renderEditTodo = this.state.isHovering ? (
            <Fragment >
                <EditTodo todo={this.props.todo}/>
            </Fragment>
        ) : ''

        return (
            <Slide direction="up" in={true} >
                <Card className={classes.todoCard} onMouseEnter={this.handleMouseHover} onMouseLeave={this.handleMouseNoHover}
                    style={{borderLeft : label === 'personal' ? '12px solid #c5cae9' :
                    label === 'office' ? '12px solid #f8bbd0' : label === 'shopping' ? '12px solid #b2dfdb' : '12px solid #bbdefb'   }}
                    onDoubleClick={this.handleStatusComplete}>

                    <CardContent className={classes.todoContent1}>
                        <FormControlLabel onClick={this.handleOngoingStatus} className={classes.checkbox}
                        checked = {status === 'complete' ? true : false}
                        control={<Checkbox icon={<CircleUnchecked style={{ fontSize:'20px', color : status === 'ongoing' ? '#b39ddb' : '' }}/>}
                        checkedIcon={<CircleCheckedFilled style={{color : '#212121', fontSize:'20px'}}/>} name="checked"/>}  />
                    </CardContent>

                    <CardContent className={classes.todoContent2}>
                        <Tooltip title={label} placement="top">
                            <Typography style={{textDecoration : status === 'complete' ? 'line-through' : '',  fontFamily: 'Salsa'}}>
                                {description} 
                            </Typography>                            
                        </Tooltip> 
                    </CardContent>

                    <CardContent className={classes.todoContent3}>
                        {renderEditTodo}
                    </CardContent>

                    <CardContent className={classes.todoContent4}>
                        {renderDeleteTodo}
                    </CardContent>
                </Card>
            </Slide>            
        )
    }
}

const mapStateToProps = (state) => ({
    data : state.data
})

export default connect(mapStateToProps, {toggleOngoingStatus, setStatusComplete})(withStyles(styles)(TodoItem))
