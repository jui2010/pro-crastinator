import React, { Component, Fragment } from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import format from "date-fns/format"

import withStyles from '@material-ui/core/styles/withStyles'
// import addDays from 'date-fns/addDays'

// import startOfMonth from 'date-fns/startOfMonth'
// import endOfMonth from 'date-fns/endOfMonth'
// import startOfWeek from 'date-fns/startOfWeek'
// import endOfWeek from 'date-fns/endOfWeek'
//import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'
import parseISO from 'date-fns/parseISO'
//import formatISO from 'date-fns/formatISO'

import getDate from 'date-fns/getDate'
import getMonth from 'date-fns/getMonth'
import getYear from 'date-fns/getYear'

import {connect} from 'react-redux'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'

import LabelImportantIcon from '@material-ui/icons/LabelImportant'
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar'
import WorkIcon from '@material-ui/icons/Work'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import PostTodo from './PostTodo'

const styles = (theme) => ({
  ...theme.spread,
  currMonth : {
    textAlign : 'center',
  },
  day : {
    width: theme.spacing(16),
    height: theme.spacing(16),
    margin : '7px',
    clipPath : 'polygon(3% 0, 7% 1%, 11% 0%, 16% 2%, 20% 0, 23% 2%, 28% 2%, 32% 1%, 35% 1%, 39% 3%, 41% 1%, 45% 0%, 47% 2%, 50% 2%, 53% 0, 58% 2%, 60% 2%, 63% 1%, 65% 0%, 67% 2%, 69% 2%, 73% 1%, 76% 1%, 79% 0, 82% 1%, 85% 0, 87% 1%, 89% 0, 92% 1%, 96% 0, 98% 3%, 99% 3%, 99% 6%, 100% 11%, 98% 15%, 100% 21%, 99% 28%, 100% 32%, 99% 35%, 99% 40%, 100% 43%, 99% 48%, 100% 53%, 100% 57%, 99% 60%, 100% 64%, 100% 68%, 99% 72%, 100% 75%, 100% 79%, 99% 83%, 100% 86%, 100% 90%, 99% 94%, 99% 98%, 95% 99%, 92% 99%, 89% 100%, 86% 99%, 83% 100%, 77% 99%, 72% 100%, 66% 98%, 62% 100%, 59% 99%, 54% 99%, 49% 100%, 46% 98%, 43% 100%, 40% 98%, 38% 100%, 35% 99%, 31% 100%, 28% 99%, 25% 99%, 22% 100%, 19% 99%, 16% 100%, 13% 99%, 10% 99%, 7% 100%, 4% 99%, 2% 97%, 1% 97%, 0% 94%, 1% 89%, 0% 84%, 1% 81%, 0 76%, 0 71%, 1% 66%, 0% 64%, 0% 61%, 0% 59%, 1% 54%, 0% 49%, 1% 45%, 0% 40%, 1% 37%, 0% 34%, 1% 29%, 0% 23%, 2% 20%, 1% 17%, 1% 13%, 0 10%, 1% 6%, 1% 3%)'
  },
  dayDiv : {
    marginLeft : '10px',
    marginTop : '5px',
    float :'left'
  },
  weekday : {
    width: theme.spacing(16),
    height: theme.spacing(3),
    margin : '7px 7px 0px 7px',
    color : 'white',
    display: 'flex',
    justifyContent:'center',
    backgroundColor : '#bf360c',
    textTransform : 'uppercase',
  },
  dayTopFrame : {
    display: 'flex',
    flexDirection : 'row'
  },
  postTodo : {
    margin : '0px 0px auto 85px'   ,
    position:'absolute',
    float :'right'
  },
  label : {
    display: 'flex',
    flexDirection : 'row',
    height: theme.spacing(3),
    color:'white', 
    margin:'5px 30px 5px 10px',
    fontSize : '15px',
    borderRadius: '10px'
  },
  labelIcon : {
    color:'white', 
    fontSize : '25px',
    margin : '0px auto 0px 0px'
  }
})

export class CalendarDayCell extends Component {
    state = {
        isHovering: false,
        officeHovered : false,
        personalHovered : false,
        shoppingHovered : false,
        generalHovered : false,
        dialogOpen : false,
        dialogLabel : ''
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

    handleOfficeHovered = () => {
        this.setState({
            officeHovered : true
        })
    }
    handlePersonalHovered = () => {
        this.setState({
            personalHovered : true
        })
    }
    handleShoppingHovered = () => {
        this.setState({
            shoppingHovered : true
        })
    }
    handleGeneralHovered = () => {
        this.setState({
            generalHovered : true
        })
    }

    handleDialogOpen = (label,day) => {
        this.setState({
            dialogOpen : true,
            dialogLabel : label
        })
    }
    handleDialogClose = () => {
        this.setState({
            dialogOpen : false
        })
    }

    renderDialog(todoArray,weekday, d, mon){
        return (
        <Dialog
        open={this.state.dialogOpen}
        onClose={this.handleDialogClose}
        // scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        >
            <DialogTitle id="scroll-dialog-title">{this.state.dialogLabel} tasks on {weekday}, {mon} {d}</DialogTitle>
            <DialogContent dividers={true}>
                {todoArray.map(todo => {
                    return <DialogContentText
                    id="scroll-dialog-description"
                    tabIndex={-1}
                >{todo.description}{console.log(todo.description)}</DialogContentText>
                })} 
            </DialogContent>
            <DialogActions>
            {/* <Button onClick={this.handleDialogClose} color="primary">
                Cancel
            </Button> */}
            </DialogActions>
        </Dialog>
        )
    }
    render() {
        const {todos} = this.props.data
        const {classes, d,m,y,mon,weekday,dayGreaterThanToday,dayIsNotInCurrentMonth,isToday,day} = this.props
        let generalCount = 0
        let officeCount = 0
        let personalCount = 0
        let shoppingCount = 0

        let generalTodoArray = []
        let officeTodoArray = []
        let personalTodoArray = []
        let shoppingTodoArray = []

        return (
            <Fragment>
                 
                <Grid itemkey={y-m-d} onMouseEnter={this.handleMouseHover} onMouseLeave={this.handleMouseNoHover}>
                <Paper elevation={3} className={classes.day} 
                style={{backgroundColor : dayIsNotInCurrentMonth ? '#f7f7f7' : 'white'}}>
                    <div className={classes.dayTopFrame} > 
                        <div className={classes.dayDiv} style={{color : isToday & !dayIsNotInCurrentMonth ? 'white': dayIsNotInCurrentMonth ? '#e0e0e0' : 'black' }}>
                            <div style={{backgroundColor: isToday & !dayIsNotInCurrentMonth ? '#d84315' : '', borderRadius: isToday & !dayIsNotInCurrentMonth ? '50%' : '', padding : '0px 6px'}}><b>{format(day, 'd')}</b></div>
                        </div>
                        <div className={classes.postTodo} >
                            {this.state.isHovering & dayGreaterThanToday & !dayIsNotInCurrentMonth? <PostTodo /> : ''}
                        </div>
                    </div>
                    <div>
                        {
                        todos.map(({ description, status, createdAt, label}) => {
                            let createdAtd = getDate(parseISO(createdAt))
                            let createdAtm = getMonth(parseISO(createdAt))
                            let createdAty = getYear(parseISO(createdAt))
                            if(d === createdAtd & m === createdAtm & y === createdAty & label === "office"){
                                officeCount = officeCount +1
                                officeTodoArray.push({ description, status})
                            }
                            if(d === createdAtd & m === createdAtm & y === createdAty & label === "personal"){
                                personalCount = personalCount +1
                                personalTodoArray.push({ description, status})
                            }
                            if(d === createdAtd & m === createdAtm & y === createdAty & label === "shopping"){
                                shoppingCount = shoppingCount +1
                                shoppingTodoArray.push({ description, status})
                            }
                            if(d === createdAtd & m === createdAtm & y === createdAty & label === "general"){
                                generalCount = generalCount +1
                                generalTodoArray.push({ description, status})
                            }
                            return <div></div>
                        }) 
                        }

                        {!dayIsNotInCurrentMonth ? officeCount === 0 ? <div></div> : 
                        <div className={classes.label} style={{backgroundColor : this.state.officeHovered ? '#f8bbd0' : ''}} 
                        onClick={() => this.handleDialogOpen('office')} >
                            <WorkIcon className={classes.labelIcon} style={{color : this.state.officeHovered ? '': '#f8bbd0'}} 
                            onMouseEnter={this.handleOfficeHovered}/>
                            +{officeCount} {officeCount === 1 ? 'task ' : 'tasks'} &nbsp;
                        </div> : <div></div>}
    
                        {!dayIsNotInCurrentMonth ? personalCount === 0 ? <div></div> : 
                        <div className={classes.label} style={{backgroundColor : this.state.personalHovered ? '#c5cae9' : ''}}
                        onClick={() => this.handleDialogOpen('personal')}  >
                            <PermContactCalendarIcon className={classes.labelIcon} style={{color : this.state.personalHovered ? '': '#c5cae9'}} onMouseEnter={this.handlePersonalHovered}/>+{personalCount} {personalCount === 1 ? 'task ' : 'tasks'} &nbsp;
                        </div> : <div></div>}
                        
                        {!dayIsNotInCurrentMonth ? shoppingCount === 0 ? <div></div> : 
                        <div className={classes.label} style={{backgroundColor : this.state.shoppingHovered ? '#b2dfdb' : ''}}
                        onClick={() => this.handleDialogOpen('shopping')} >
                            <ShoppingCartIcon className={classes.labelIcon} style={{color : this.state.shoppingHovered ? '': '#b2dfdb'}} onMouseEnter={this.handleShoppingHovered}/>+{shoppingCount} {shoppingCount === 1 ? 'task ' : 'tasks'} &nbsp;
                        </div> : <div></div>}
                        
                        {!dayIsNotInCurrentMonth ? generalCount === 0 ? <div></div> :
                        <div className={classes.label} style={{backgroundColor : this.state.generalHovered ? '#bbdefb' : ''}}
                        onClick={() => this.handleDialogOpen('general')} >
                             <CheckCircleIcon className={classes.labelIcon} style={{color : this.state.generalHovered ? '': '#bbdefb'}} onMouseEnter={this.handleGeneralHovered}/>+{generalCount} {generalCount === 1 ? 'task ' : 'tasks'} &nbsp;
                        </div> : <div></div>}
                    </div>
                </Paper>    
            </Grid>
            
            {this.state.dialogLabel === 'general' ? this.renderDialog(generalTodoArray,weekday, d, mon) : this.state.dialogLabel === 'office' ? this.renderDialog(officeTodoArray, weekday,d, mon) :
             this.state.dialogLabel === 'shopping' ? this.renderDialog(personalTodoArray, weekday,d, mon) : this.renderDialog(personalTodoArray, weekday,d, mon)}
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
  data : state.data,
  UI : state.UI
})

export default connect(mapStateToProps )(withStyles(styles)(CalendarDayCell))
