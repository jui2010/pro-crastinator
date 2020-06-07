import {SET_PREV_MONTH, SET_NEXT_MONTH, SELECT_DATE, SET_STATUS_FILTER,SET_LABEL_FILTER } from '../types'


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

export const setStatusFilter = (status) => (dispatch) => {
    dispatch({
        type : SET_STATUS_FILTER,
        payload : status
    })
}

export const setLabelFilter = (label) => (dispatch) => {
    dispatch({
        type : SET_LABEL_FILTER,
        payload : label
    })
}
