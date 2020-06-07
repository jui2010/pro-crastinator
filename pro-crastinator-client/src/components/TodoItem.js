import React, { Component , Fragment} from 'react'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import Slide from '@material-ui/core/Slide'

import DeleteTodo from './DeleteTodo'
import EditTodo from './EditTodo'

import CircleCheckedFilled from '@material-ui/icons/CheckCircle'
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked'
import CircleChecked from '@material-ui/icons/OfflineBolt'
import CloseIcon from '@material-ui/icons/Close'

import {connect} from 'react-redux'
import {toggleOngoingStatus, setStatusComplete} from '../redux/actions/dataActions'

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
        snackbarOpen : false,
        dialogOpen : false
    }

//functions to handle mouse hover on Todo Item
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

//functions to handle the status of a Todo
    handleOngoingStatus = () => {
        this.props.toggleOngoingStatus(this.props.todo.todoId)
        setTimeout(() => this.setState({
            snackbarOpen : true
        }), 2000 )
    }
    
    handleStatusComplete = () => {
        this.props.setStatusComplete(this.props.todo.todoId)
        setTimeout(() => this.setState({
            snackbarOpen : true
        }), 2000 )
    }

//function to handle the snackbar close for status-ongoing/complete actions
    handleSnackbarClose = () => {
        this.setState({
            snackbarOpen : false
        })
    }

//function to handle the input checkbox for status of Todo
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
                    onDoubleClick={this.handleStatusComplete} onClick={this.handleDialogOpen}
                    style={{borderLeft : label === 'personal' ? '15px solid #c5cae9' :
                    label === 'office' ? '15px solid #f8bbd0' : label === 'shopping' ? '15px solid #b2dfdb' : '15px solid #bbdefb' }} >

                    {/* input to set the staus of a todo */}
                    <CardContent className={classes.todoContent1}>
                        <FormControlLabel onClick={this.handleOngoingStatus} className={classes.checkbox}
                        checked = {status === 'complete' ? true : false}
                        control={<Checkbox 
                            icon={status === 'ongoing' ? <CircleChecked style={{color :'#836fa9', fontSize:'21px'}}/> :
                            <CircleUnchecked style={{ fontSize:'20px'}}/>}
                            checkedIcon={<CircleCheckedFilled style={{color : '#212121', fontSize:'20px'}}/>} name="checked"/>}  />
                        
                        <Snackbar
                            anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                            }}
                            open={this.state.snackbarOpen}
                            autoHideDuration={3500}
                            onClose={this.handleSnackbarClose}
                            message={status === 'ongoing' ? "Task marked as ongoing. Double click on task to mark it as complete" : 
                                status === 'complete' ? "Task marked as complete" :  "Double click on task to mark it as complete"}
                            action={
                            <Fragment>
                                <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleSnackbarClose}>
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </Fragment>}/>
                    </CardContent>

                    {/* actual todo content */}
                    <CardContent className={classes.todoContent2}>
                        <Tooltip title={label} placement="top">
                            <Typography style={{textDecoration : status === 'complete' ? 'line-through' : '',  fontFamily: 'Cabin'}}>
                                {description} 
                            </Typography>                            
                        </Tooltip> 
                    </CardContent>

                    {/* option to edit a todo item */}
                    <CardContent className={classes.todoContent3}>
                        {renderEditTodo}
                    </CardContent>

                    {/* option to delete a todo item */}
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
