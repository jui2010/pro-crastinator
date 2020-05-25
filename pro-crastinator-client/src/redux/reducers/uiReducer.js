import {SET_PREV_MONTH, SET_NEXT_MONTH, SELECT_DATE} from '../types'
import addMonths from 'date-fns/addMonths'
import subMonths from 'date-fns/subMonths'
import getMonth from 'date-fns/getMonth'

let initialState = { 
    currMonth : new Date(),
    selectedDate : new Date().toISOString()
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
                // selectedDate : getMonth(action.payload)
                selectedDate : action.payload
            }
        default : 
            return {
                ...state
            }
    }
}