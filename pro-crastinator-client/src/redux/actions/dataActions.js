import {SET_TODOS, LOADING_DATA, SET_TOGGLE_ONGOING_STATUS, POST_TODO, DELETE_TODO, ADD_USER_DETAILS, SET_COMPLETE_STATUS} from '../types'
import axios from 'axios'

//get the todo items
export const getAuthenticatedUserDataAndTodos = () => (dispatch) => {
    dispatch({
        type : LOADING_DATA
    })
    axios.get('/getAuthenticatedUserDataAndTodos')
    .then(res => {
        dispatch({
            type : SET_TODOS,
            payload : res.data
        })
    })
    .catch(err => console.log(err) )
}


export const editUserDetails = (userDetails) => (dispatch) => {
    axios.post('/editUserDetails' , userDetails)
        .then(res => {
            dispatch({
                type : ADD_USER_DETAILS,
                payload : res.data
            })
        })
}

//post a todo
export const postTodo = (newTodo) => (dispatch) => {
    axios.post('/postTodo' , newTodo)
        .then(res => {
            dispatch({
                type : POST_TODO,
                payload : res.data
            })
        })
        .catch(err => console.log(err))
}

//toggle the todo ongoing field
export const toggleOngoingStatus = (todoId) => (dispatch) => {
    axios.get(`/toggleStatusOngoing/${todoId}`)
    .then(() => {
        dispatch({
            type : SET_TOGGLE_ONGOING_STATUS,
            payload : todoId
        })
    })
    .catch(err => console.log(err) )
}

//set the todo complete field
export const setStatusComplete = (todoId) => (dispatch) => {
    axios.get(`/setStatusComplete/${todoId}`)
    .then(() => {
        dispatch({
            type : SET_COMPLETE_STATUS,
            payload : todoId
        })
    })
    .catch(err => console.log(err) )
}

//delete a todo
export const deleteTodo = (todoId) => (dispatch) => {
    axios.delete(`/deleteTodo/${todoId}`)
        .then(() => {
            dispatch({
                type : DELETE_TODO,
                payload : todoId
            })
        })
        .catch(err => console.log(err))
}