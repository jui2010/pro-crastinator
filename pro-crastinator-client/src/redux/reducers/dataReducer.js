import {SET_TODOS, LOADING_DATA, SET_TOGGLE_STATUS, POST_TODO, DELETE_TODO} from '../types'

const initialState = {
    userInfo : '',
    todos : [],
    loading : false
}

export default function (state = initialState, action){
    switch(action.type){
        case LOADING_DATA : 
            return {
                ...state,
                loading : true
            } 
        case SET_TODOS : 
            return {
                userInfo : action.payload.userInfo,
                todos : action.payload.todos,
                loading : false
            } 
        case SET_TOGGLE_STATUS :
            let index = state.todos.findIndex(
                (todo) => todo.todoId === action.payload
            )
            if (state.todos[index].status === "complete"){
                state.todos[index].status = "new"
            } else {
                state.todos[index].status = "complete"
            }
            return {
                ...state,
            }
        case POST_TODO :
            return {
                ...state,
                todos : [
                    action.payload,
                    ...state.todos
                ]
            }
        case DELETE_TODO :
            //alternate method 
            // let ind = state.todos.findIndex(
            //     todo => todo.todoId === action.payload
            // )
            // state.todos.splice(ind , 1)
            return {
                ...state,
                todos : state.todos.filter((todo) => todo.todoId !== action.payload)
            }
        default : 
            return {
                ...state
            }
    }
}