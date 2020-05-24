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
import parseISO from 'date-fns/parseISO'
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
    totalTaskComplete : {
        fontSize : '15px',
        marginBottom : '10px'
    },
    taskDisplayDiv : {
        fontSize : '15px',
        marginTop : '10px'
    },
    timelineMainDiv : {
        border : 'solid 1px #e0e0e0',
        fontSize : '11px',
    },
    timelineDiv : {
        display : 'flex',
        flexDirection : 'row',
        paddingBottom : '10px'
    },
    colorCodeDiv : {
        display : 'flex',
        flexDirection : 'row',
        paddingBottom : '10px',
        marginLeft : '710px'
    },
    day : {
        width: theme.spacing(1.4),
        height: theme.spacing(1.4),
        margin : '1.6px',
        backgroundColor : 'white'
    },
    colorCodeLess : {
        width: theme.spacing(1.4),
        height: theme.spacing(1.4),
        margin : '0px 20px 1.6px 1.6px'
    },
    colorCodeCell : {
        width: theme.spacing(1.4),
        height: theme.spacing(1.4),
        margin : '1.6px',
        backgroundColor : 'white'
    },
    colorCodeMore : {
        width: theme.spacing(1.4),
        height: theme.spacing(1.4),
        margin : '0px 8px 1.6px 5px'
    },
    dayOfDate : {
        width: theme.spacing(1.4),
        height: theme.spacing(1.4),
        margin : '0px 15px 2px 25px',
        fontSize : '10px'
    },
    month : {
        width: theme.spacing(1.5),
        height: theme.spacing(1.5),
        margin : '25px 1.6px 6px 1.6px',
        fontSize : '10px'
    }
})

class Timeline extends Component {

    state = {
        today : new Date()
    }

    getCountOfCompletedTasksInOneDay(day){
        let completeTaskCount = 0
        let d = getDate(day)
        let m = getMonth(day)
        let y = getYear(day)

        const {todos} = this.props.data
        todos.map(({createdAt, username, label, status}) => {
            let createdAtd = getDate(parseISO(createdAt))
            let createdAtm = getMonth(parseISO(createdAt))
            let createdAty = getYear(parseISO(createdAt))
            if(d === createdAtd & m === createdAtm & y === createdAty & status === "complete"){
                completeTaskCount = completeTaskCount +1
            }
        })
        return completeTaskCount
    }

    getMaxOfCompletedTasksInOneYear(dateOneYearBackStartDate){
        let day = dateOneYearBackStartDate

        let maxCount = 0
        let completeTaskCount = 0
        let allTaskCount = 0
        while(day <= this.state.today){
            completeTaskCount = this.getCountOfCompletedTasksInOneDay(day)
            allTaskCount = allTaskCount + completeTaskCount
            if(completeTaskCount > maxCount){
                maxCount = completeTaskCount
            }

            day = addDays(day ,1)
        }

        let op = [maxCount, allTaskCount]
        return op
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
        
        let c1 = '#ba68c8'
        let c2 = '#9c27b0'
        let c3 = '#7b1fa2'
        let c4 = '#4a148c'
        console.log(dateOneYearBack)
        console.log(dateOneYearBackStartDate)
        console.log(todayEndDate)
        console.log(diff)

        let opCompleteTaskCount = this.getMaxOfCompletedTasksInOneYear(dateOneYearBackStartDate)
        let maxCompleteTaskCount = opCompleteTaskCount[0]
        let allCompleteTaskCount = opCompleteTaskCount[1]


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

                let completeTaskCount = this.getCountOfCompletedTasksInOneDay(day)

                let tip = completeTaskCount === 0 ? "No tasks completed on "+mon+" "+d+", "+y : completeTaskCount+" tasks completed on "+mon+" "+d+", "+y

                if(i === 0 ){
                    if(col % 4 === 1){
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
                    let perTasks = completeTaskCount/maxCompleteTaskCount
                    if(day<= this.state.today){
                        cell.push(
                            <Tooltip title={tip}>
                                <div key={tip}  className={classes.day}
                                style={{backgroundColor: completeTaskCount === 0 | maxCompleteTaskCount === 0 ? 'white' : perTasks <= 0.25 ? c1 : (perTasks <= 0.50 ? c2 : (perTasks <= 0.75 ? c3 : c4) ) }}>
                                
                                </div>
                            </Tooltip>
                        )
                    }
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

        let colorCode = []
        for(let i=1 ; i<=7; i++){
            if(i === 1){
                colorCode.push(
                    <div className={classes.colorCodeLess}>Less
                    </div>
                )
            } else if (i===7){
                colorCode.push(
                    <div className={classes.colorCodeMore} >More
                    </div>
                )
            }else {
                colorCode.push(
                    <div className={classes.colorCodeCell} style={{backgroundColor : i===2 ? 'white' : i===3 ? c1 : i===4 ? c2 : i===5 ? c3 : c4}}>
                    </div>
                )
            }
        }
        return (
            <div className = {classes.mainDiv}>
                <div className = {classes.totalTaskComplete}>
                    {allCompleteTaskCount === 0 ? 'No' : allCompleteTaskCount} tasks completed in the last year
                </div>
                <div className = {classes.timelineMainDiv}>
                    <div className={classes.timelineDiv}>
                        {column}
                    </div>
                    <div className={classes.colorCodeDiv}>
                        {colorCode}
                    </div>
                </div>
                <div className={classes.taskDisplayDiv} >
                    Display tasks on selected date
                </div>
            </div>
            
            
        )
    }
}

const mapStateToProps = (state) => ({
    data : state.data,
    UI : state.UI
})

export default connect(mapStateToProps )(withStyles(styles)(Timeline))
