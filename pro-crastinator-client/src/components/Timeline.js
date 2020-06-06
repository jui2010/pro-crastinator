import React, { Component } from 'react'
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
import {setSelectedDate} from '../redux/actions/uiActions'
import LabelImportantIcon from '@material-ui/icons/LabelImportant'
import LinearScaleIcon from '@material-ui/icons/LinearScale'


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
        backgroundColor : '#eeeeee'
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
        currMonth : new Date()
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
            return ''
        })
        return completeTaskCount
    }

    getMaxOfCompletedTasksInOneYear(dateOneYearBackStartDate){

        let day = dateOneYearBackStartDate

        let maxCount = 0
        let completeTaskCount = 0
        let allTaskCount = 0
        while(day <= this.state.currMonth){
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

    onDateClick = day => {
        console.log(day)
        this.props.setSelectedDate(day)
    }

    render() {
        const {classes} = this.props
        const { selectedDate} = this.props.UI

        let dateOneYearBack = subDays(this.state.currMonth , 365 )
        let dateOneYearBackStartDate = startOfWeek(dateOneYearBack)
        let todayEndDate = endOfWeek(this.state.currMonth )

        let column = []
        let cell = []

        let diff = differenceInCalendarDays(todayEndDate , dateOneYearBackStartDate) + 1
        let day = dateOneYearBackStartDate
        
        let c1 = '#e1bee7'
        let c2 = '#ba68c8'
        let c3 = '#8e24aa'
        let c4 = '#4a148c'

        let opCompleteTaskCount = this.getMaxOfCompletedTasksInOneYear(dateOneYearBackStartDate)
        let maxCompleteTaskCount = opCompleteTaskCount[0]
        let allCompleteTaskCount = opCompleteTaskCount[1]


        cell.push(
            <div className={classes.dayOfDate} style={{marginTop:'25px'}}>
            </div>
        )
        for(let i=1 ; i<=7; i++){
            let dayOfDate = format(day, "EEE")
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
                let dayString = day.toISOString()
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
                    if(day <= this.state.currMonth){

                        cell.push(
                            
                            <Tooltip title={tip}>
                                <div key={tip}  className={classes.day} 
                                onClick={() => this.onDateClick(dayString)}
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

        let selectedDated = getDate(parseISO(selectedDate))
        let selectedDatem = getMonth(parseISO(selectedDate))
        let selectedDatemon = format(parseISO(selectedDate), "MMM")
        let selectedDatey = getYear(parseISO(selectedDate))
        const {todos} = this.props.data
        let officeTasksOnSelectedDay = []
        let personalTasksOnSelectedDay = []
        let generalTasksOnSelectedDay = []
        let officeCount = 0
        let personalCount = 0
        let generalCount = 0

        todos.map(({todoId , description, createdAt, status, label}) => {
            let createdAtd = getDate(parseISO(createdAt))
            let createdAtm = getMonth(parseISO(createdAt))
            let createdAty = getYear(parseISO(createdAt))

            if(selectedDated === createdAtd & selectedDatem === createdAtm & selectedDatey === createdAty & status === "complete"){
                if(label === "personal"){
                    personalCount = personalCount + 1
                    personalTasksOnSelectedDay.push(
                        <div key={todoId}><LinearScaleIcon style={{fontSize : '12px'}}/>{description}</div>
                    )
                }
                if(label === "office"){
                    officeCount = officeCount + 1
                    officeTasksOnSelectedDay.push(
                        <div key={todoId}><LinearScaleIcon style={{fontSize : '13px'}}/>{description}</div>
                    )
                }
                if(label === "general"){
                    generalCount = generalCount + 1
                    generalTasksOnSelectedDay.push(
                        <div key={todoId} style={{ marginBottom:'10px'}}><LinearScaleIcon style={{fontSize : '13px', marginRight:'15px'}}/>{description}</div>
                    )
                }
                
            }
            return ''
        })

        let renderTask = (
            <div>
                <div>Tasks activity</div>
                <div className="separator" style={{fontSize : '13px'}}>
                    {selectedDatemon + " " + selectedDated + ", " + selectedDatey }
                </div>
                <div style={{marginTop : '20px'}}>
                    {personalTasksOnSelectedDay.length === 0 & officeTasksOnSelectedDay.length === 0 & 
                    generalTasksOnSelectedDay.length === 0 ? "No tasks completion activity " : ""}
                </div>
                <div style={{marginTop : '20px'}}>
                    {personalTasksOnSelectedDay.length === 0 ? '' :(
                        <div style={{marginLeft : '15px'}}>
                            <LabelImportantIcon style={{fontSize : '17px'}} />  Completed {personalCount} personal tasks
                            <div style={{marginLeft : '15px'}}>{personalTasksOnSelectedDay}</div>
                        </div>
                    )}
                </div>
                <div style={{marginTop : '20px'}}>
                    {officeTasksOnSelectedDay.length === 0 ? '' :(
                        <div style={{marginLeft : '15px'}}>
                            <LabelImportantIcon style={{fontSize : '17px'}}/>  Completed {officeCount} office tasks
                            <div style={{marginLeft : '15px'}}>{officeTasksOnSelectedDay}</div>
                        </div>
                    )}
                </div>
                <div style={{marginTop : '20px'}}>
                    {generalTasksOnSelectedDay.length === 0 ? '' :(
                        <div style={{marginLeft : '15px'}}>
                            <LabelImportantIcon style={{fontSize : '17px'}}/>  Completed {generalCount} general tasks
                            <div style={{marginLeft : '15px'}}>{generalTasksOnSelectedDay}</div>
                        </div>
                    )}
                </div>
            </div>
            
        )

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
                    {renderTask}
                </div>
            </div>
            
            
        )
    }
}

const mapStateToProps = (state) => ({
    data : state.data,
    UI : state.UI
})

export default connect(mapStateToProps , {setSelectedDate})(withStyles(styles)(Timeline))
