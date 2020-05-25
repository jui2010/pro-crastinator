import React, { Component ,Fragment} from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
//import axios from 'axios'

import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import TodoItem from '../components/TodoItem'
import Filters from '../components/Filters.js'

import {connect} from 'react-redux'
import {getTodos} from '../redux/actions/dataActions'

const styles = (theme) => ({
    ...theme.spread,
})

class home extends Component {

    componentDidMount(){
        const {todos} = this.props.data
        //get the todo items
        if(todos)
            this.props.getTodos()
    }
    
    render() {
        const {todos, loading} = this.props.data
        const {toggleStatusFilter} = this.props.UI

        let filteredTodos = todos.filter( (todo) => {
            return todo.status === toggleStatusFilter
        })
        console.log(filteredTodos)
        console.log(toggleStatusFilter)
        let todoMarkup = !loading & toggleStatusFilter === "none" ? (
           todos.map(todo => <TodoItem key={todo.todoId} todo = {todo}/>)
        ) : (
            toggleStatusFilter !== "none" ? (
                filteredTodos.map(todo => <TodoItem key={todo.todoId} todo = {todo}/>)
            ) :
            <CircularProgress color="secondary" />
        )

        return (
            <Fragment>
                <Grid container spacing={5}>
                    <Grid item xs={6}>
                        {todoMarkup}
                    </Grid>
                    <Grid item xs={6}>
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

export default connect(mapStateToProps, {getTodos})(withStyles(styles)(home))
