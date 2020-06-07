import React, { Component ,Fragment} from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

import Grid from '@material-ui/core/Grid'
import TodoItem from '../components/TodoItem'
import Filters from '../components/Filters.js'
import PostTodo from '../components/PostTodo'

import {connect} from 'react-redux'
import {getAuthenticatedUserDataAndTodos} from '../redux/actions/dataActions'

import subMonths from 'date-fns/subMonths'
import subDays from 'date-fns/subDays'
import format from "date-fns/format"
import getDate from 'date-fns/getDate'
import getMonth from 'date-fns/getMonth'
import getYear from 'date-fns/getYear'
import parseISO from 'date-fns/parseISO'

const styles = (theme) => ({
    ...theme.spread,
    postTodo : {
        display : 'flex',
        flexDirection : 'row',
        alignItems : 'center'
    },
    dates : {
        fontSize: '13px',
        margin : '20px auto 10px auto',
        color:'#757575'
    }
})

class home extends Component {

    componentDidMount(){
        const {todos} = this.props.data
        //get the user data and todo items of authenticated user
        if(todos)
            this.props.getAuthenticatedUserDataAndTodos()
    }

    showTodos(){
        
        const {classes } = this.props  
        const { currMonth , statusFilter, labelFilter, today } = this.props.UI
        const {todos} = this.props.data

        const monthBack = subMonths(currMonth , 1) //one month back, wrt todays date
        const rows = [] //row array to display a todo item

        //display todos wrt the date it was posted
        let day = currMonth
        while (day >= monthBack) {            
            let d = getDate(day)
            let m = getMonth(day)
            let y = getYear(day)

            let mon = format(day, 'MMM')
            let dayOfWeek = format(day, 'EEE')

            let yesterday = subDays(today , 1)

            let isToday = d === getDate(today) & m === getMonth(today) & y === getYear(today) ? true : false
            let isYesterday = d === getDate(yesterday) & m === getMonth(yesterday) & y === getYear(yesterday) ? true : false

            let dateWiseTodo = todos.filter( (todo) => {
                let createdAtd = getDate(parseISO(todo.createdAt))
                let createdAtm = getMonth(parseISO(todo.createdAt))
                let createdAty = getYear(parseISO(todo.createdAt))

                //check status and label filters, and according filter out todos, for displaying them
                return statusFilter === 'none' & labelFilter === 'none' ? 
                            d === createdAtd & m === createdAtm & y === createdAty :  statusFilter !== 'none' & labelFilter === 'none' ? 
                        d === createdAtd & m === createdAtm & y === createdAty & todo.status === statusFilter : 
                            statusFilter === 'none' & labelFilter !== 'none' ? d === createdAtd & m === createdAtm & y === createdAty & todo.label === labelFilter :
                        d === createdAtd & m === createdAtm & y === createdAty & todo.status === statusFilter & todo.label === labelFilter
            })

            rows.push(
                //format the date, check if date is today/yesterday
                dateWiseTodo.length === 0 ? '' : isToday ? (
                    <div className={classes.dates}><b style={{fontSize: '15px', color : '#424242', marginRight: '5px'}}>
                        Today</b> {dayOfWeek}, {mon} {d}
                    </div>) 
                : isYesterday ? (
                    <div className={classes.dates}><b style={{fontSize: '15px', color : '#616161', marginRight: '5px'}}>
                        Yesterday</b>  {dayOfWeek}, {mon} {d}
                    </div>) : (
                    <div className={classes.dates}>
                        {dayOfWeek}, {mon} {d}
                    </div>)
            )

            //push the day-wise todos for rendering
            rows.push(
                dateWiseTodo.map(todo => <TodoItem key={todo.todoId} todo = {todo}/>)
            )
            
            day = subDays(day , 1) //increment day

        }

        return (
            <div>{rows}</div>
        )
    }

    render() {
        const { classes} = this.props
        return (
            <Fragment>
                <Grid container spacing={5}>
                    <Grid item sm={8} style={{borderRight : '1px solid #e0e0e0'}}>
                        <div className={classes.postTodo}>
                        <PostTodo style={{marginTop:"0px"}} day={''}/> <span style={{fontSize:"15px"}}>Add task</span>
                        </div>
                        {this.showTodos()}
                    </Grid>
                    <Grid item sm={4}>
                        <Filters />
                    </Grid>
                </Grid>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    data : state.data,
    UI : state.UI
})

export default connect(mapStateToProps, {getAuthenticatedUserDataAndTodos})(withStyles(styles)(home))
