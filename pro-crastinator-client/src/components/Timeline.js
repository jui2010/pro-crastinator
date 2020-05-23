import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Tooltip from '@material-ui/core/Tooltip';
import format from "date-fns/format"

import withStyles from '@material-ui/core/styles/withStyles'
import addDays from 'date-fns/addDays'
import subDays from 'date-fns/subDays'

// import startOfMonth from 'date-fns/startOfMonth'
// import endOfMonth from 'date-fns/endOfMonth'
import startOfWeek from 'date-fns/startOfWeek'
import endOfWeek from 'date-fns/endOfWeek'
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'
// import parseISO from 'date-fns/parseISO'
//import formatISO from 'date-fns/formatISO'

import getDate from 'date-fns/getDate'
import getMonth from 'date-fns/getMonth'
import getYear from 'date-fns/getYear'

import {connect} from 'react-redux'

const styles = (theme) => ({
    ...theme.spread,
    currMonth : {
      textAlign : 'center',
    },
    mainDiv : {
        border : 'solid 1px #bdbdbd',
        display : 'flex',
        flexDirection : 'row',
        paddingBottom : '35px'
    },
    day : {
        width: theme.spacing(1.4),
        height: theme.spacing(1.4),
        margin : '1.7px',
        backgroundColor : 'white'
    },
    dayOfDate : {
        width: theme.spacing(1.4),
        height: theme.spacing(1.4),
        margin : '1.6px 15px 1.6px 25px',
        fontSize : '10px'
    },
    month : {
        width: theme.spacing(1.5),
        height: theme.spacing(1.5),
        margin : '25px 1.6px 5px 1.6px',
        fontSize : '10px'
    }
})

class Timeline extends Component {

    state = {
        today : new Date()
    }

    render() {
        const {classes} = this.props

        let dateOneYearBack = subDays(this.state.today , 365 )
        let dateOneYearBackStartDate = startOfWeek(dateOneYearBack)
        let todayEndDate = endOfWeek(this.state.today )


        let column = []
        let cell = []

        let diff = differenceInCalendarDays(todayEndDate , dateOneYearBackStartDate) + 1
        let day = dateOneYearBackStartDate
        
        console.log(dateOneYearBack)
        console.log(dateOneYearBackStartDate)
        console.log(todayEndDate)
        console.log(diff)

        cell.push(
            <div className={classes.dayOfDate} style={{marginTop:'25px'}}>
            </div>
        )
        for(let i=1 ; i<=7; i++){
            let dayOfDate = format(day, 'EEE')
            cell.push(
                <div key={dayOfDate} className={classes.dayOfDate}>
                    {dayOfDate}
                </div>
            )
            day = addDays(day ,1)
        }
        column.push(
            <div key="day" >{cell}</div>
        )

        cell=[]

        day = dateOneYearBackStartDate
        let col = 1
        while(col <= diff/7){
            for(let i=0 ; i<=7; i++){
                let d = getDate(day)
                let mon = format(day, 'MMM')
                let y = getYear(day)

                let tip = mon+" "+d+", "+y

                if(i === 0 ){
                    if(col % 5 === 1){
                        cell.push(
                            <div key={tip}  className={classes.month}>
                                {mon}
                            </div>
                        )
                    }else{
                        cell.push(
                            <div key={tip}  className={classes.month}>
                            </div>
                        )
                    }
                }else{
                    cell.push(
                        <Tooltip title={tip}>
                            <div key={tip}  className={classes.day}>
                            </div>
                        </Tooltip>
                    )
                }
                if(i>0)
                    day = addDays(day ,1)
            }
            
            column.push(
                <div key={col}>{cell}</div>
            )
            cell = []

            col = col + 1
        }

        return (
            <div className={classes.mainDiv}>
                {column}
            </div>
        )
    }
}

export default (withStyles(styles)(Timeline))
