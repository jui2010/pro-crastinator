import {SET_PREV_MONTH, SET_NEXT_MONTH, SELECT_DATE, SET_TOGGLE_STATUS_FILTER } from '../types'


export const getPrevMonth = () => (dispatch) => {
    dispatch({
        type : SET_PREV_MONTH
    })
}

export const getNextMonth = () => (dispatch) => {
    dispatch({
        type : SET_NEXT_MONTH
    })
}

export const setSelectedDate = (day) => (dispatch) => {
    dispatch({
        type : SELECT_DATE,
        payload : day
    })
}

export const toggleStatusFilter = (status) => (dispatch) => {
    dispatch({
        type : SET_TOGGLE_STATUS_FILTER,
        payload : status
    })
}