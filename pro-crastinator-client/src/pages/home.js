import React, { Component ,Fragment} from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
//import axios from 'axios'

import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import TodoItem from '../components/TodoItem'
import Filters from '../components/Filters.js'

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
})

class home extends Component {

    componentDidMount(){
        const {todos} = this.props.data
        //get the todo items
        if(todos)
            this.props.getAuthenticatedUserDataAndTodos()
    }

    showTodos(){
        
        const {classes } = this.props  
        const { currMonth , toggleStatusFilter } = this.props.UI
        const {todos} = this.props.data

        const monthBack = subMonths(currMonth , 1) //one month back, wrt todays date
        const rows = [] //there can be 5-6 rows depending on the number of weeks

        let day = currMonth
        while (day >= monthBack) {            
            let d = getDate(day)
            let m = getMonth(day)
            let y = getYear(day)
            let mon = format(day, 'MMM')
            let dayOfWeek = format(day, 'EEE')

            let dateWiseTodo = todos.filter( (todo) => {
                let createdAtd = getDate(parseISO(todo.createdAt))
                let createdAtm = getMonth(parseISO(todo.createdAt))
                let createdAty = getYear(parseISO(todo.createdAt))
                return toggleStatusFilter === 'none' ? d === createdAtd & m === createdAtm & y === createdAty :  
                d === createdAtd & m === createdAtm & y === createdAty & todo.status === toggleStatusFilter
            })

            rows.push(
                dateWiseTodo.length === 0 ? '' : (<div style={{fontSize: '13px', margin : '20px auto 10px auto'}}>{dayOfWeek}, {mon} {d}</div>)
            )
            rows.push(
                dateWiseTodo.map(todo => <TodoItem key={todo.todoId} todo = {todo}/>)
            )
            
            day = subDays(day , 1)

        }

        return (
            <div>{rows}</div>
        )
    }

    render() {
        return (
            <Fragment>
                <Grid container spacing={5}>
                    <Grid item xs={8} style={{borderRight : '1px solid #9e9e9e'}}>
                        {this.showTodos()}
                    </Grid>
                    <Grid item xs={4}>
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
