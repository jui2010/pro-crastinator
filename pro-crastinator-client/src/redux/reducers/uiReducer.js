import {SET_PREV_MONTH, SET_NEXT_MONTH, SELECT_DATE, SET_STATUS_FILTER,SET_LABEL_FILTER} from '../types'
import addMonths from 'date-fns/addMonths'
import subMonths from 'date-fns/subMonths'

let initialState = { 
    today : new Date(),
    currMonth : new Date(),
    selectedDate : new Date().toISOString(),
    statusFilter : 'none',
    labelFilter : 'none'
}

export default function(state = initialState , action){
    switch(action.type){
        case SET_PREV_MONTH : 
            return {
                ...state,
                currMonth : subMonths(state.currMonth, 1 )
            }
        case SET_NEXT_MONTH : 
            return {
                ...state,
                currMonth : addMonths(state.currMonth, 1 )
            }
        case SELECT_DATE : 
            return {
                ...state,
                selectedDate : action.payload
            }
        case SET_STATUS_FILTER : 
            return {
                ...state,
                statusFilter : action.payload
            }
        case SET_LABEL_FILTER : 
        return {
            ...state,
            labelFilter : action.payload
        }
        default : 
            return {
                ...state
            }
    }
}