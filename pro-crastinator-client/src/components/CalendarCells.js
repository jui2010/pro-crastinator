import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import format from "date-fns/format"

import withStyles from '@material-ui/core/styles/withStyles'
import addDays from 'date-fns/addDays'

import startOfMonth from 'date-fns/startOfMonth'
import endOfMonth from 'date-fns/endOfMonth'
import startOfWeek from 'date-fns/startOfWeek'
import endOfWeek from 'date-fns/endOfWeek'
//import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'
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
  day : {
    width: theme.spacing(16),
    height: theme.spacing(16),
    marginBottom : '20px',
    clipPath : 'polygon(3% 0, 7% 1%, 11% 0%, 16% 2%, 20% 0, 23% 2%, 28% 2%, 32% 1%, 35% 1%, 39% 3%, 41% 1%, 45% 0%, 47% 2%, 50% 2%, 53% 0, 58% 2%, 60% 2%, 63% 1%, 65% 0%, 67% 2%, 69% 2%, 73% 1%, 76% 1%, 79% 0, 82% 1%, 85% 0, 87% 1%, 89% 0, 92% 1%, 96% 0, 98% 3%, 99% 3%, 99% 6%, 100% 11%, 98% 15%, 100% 21%, 99% 28%, 100% 32%, 99% 35%, 99% 40%, 100% 43%, 99% 48%, 100% 53%, 100% 57%, 99% 60%, 100% 64%, 100% 68%, 99% 72%, 100% 75%, 100% 79%, 99% 83%, 100% 86%, 100% 90%, 99% 94%, 99% 98%, 95% 99%, 92% 99%, 89% 100%, 86% 99%, 83% 100%, 77% 99%, 72% 100%, 66% 98%, 62% 100%, 59% 99%, 54% 99%, 49% 100%, 46% 98%, 43% 100%, 40% 98%, 38% 100%, 35% 99%, 31% 100%, 28% 99%, 25% 99%, 22% 100%, 19% 99%, 16% 100%, 13% 99%, 10% 99%, 7% 100%, 4% 99%, 2% 97%, 1% 97%, 0% 94%, 1% 89%, 0% 84%, 1% 81%, 0 76%, 0 71%, 1% 66%, 0% 64%, 0% 61%, 0% 59%, 1% 54%, 0% 49%, 1% 45%, 0% 40%, 1% 37%, 0% 34%, 1% 29%, 0% 23%, 2% 20%, 1% 17%, 1% 13%, 0 10%, 1% 6%, 1% 3%)'
  },
  dayDiv : {
    //backgroundColor : '#b71c1c',
    //color : 'white',
    paddingLeft : '10px',
    paddingTop : '5px'
  }
})

export class CalendarCells extends Component {
    showDays(){
        const { currMonth } = this.props.UI

        const days = []
        let startDate = startOfWeek(currMonth)
        
        for (let i = 0; i < 7; i++) {
            days.push(
                <Grid item xs={1} key={i}>
                {format(addDays(startDate, i), "EEEE")}
                </Grid>
            )
        }
        return <Grid container  justify="space-evenly" alignItems="center" >{days}</Grid>; 
    }

    showCells(){
        
        const {classes } = this.props  
        const { currMonth } = this.props.UI
        const {todos} = this.props.data

        const monthStart = startOfMonth(currMonth)
        const monthEnd = endOfMonth(monthStart)
        const startDate = startOfWeek(monthStart) //start date from prev month
        const endDate = endOfWeek(monthEnd) //end date from prev month

        const rows = [] //there can be 5-6 rows depending on the number of weeks
        let cells = []

        
        let day = startDate
        while (day <= endDate) { //determines number of rows
            for(let j=0; j<7 ;j++){
                let d = getDate(day)
                let m = getMonth(day)
                let y = getYear(day)
                let generalCount = 0
                let officeCount = 0
                let personalCount = 0
                //let dayIso = formatISO(day)
                //console.log(new Date(y, m, d))
                cells.push(
                    <Grid item xs={1} key={y-m-d}>
                        <Paper elevation={3} className={classes.day}>
                            <div className={classes.dayDiv}>
                                <b>{format(day, 'd')}</b>
                            </div>
                            <div>
                                {
                                todos.map(({todoId , description, createdAt, label}) => {
                                    let createdAtd = getDate(parseISO(createdAt))
                                    let createdAtm = getMonth(parseISO(createdAt))
                                    let createdAty = getYear(parseISO(createdAt))
                                    if(d === createdAtd & m === createdAtm & y === createdAty & label === "general"){
                                        generalCount = generalCount +1
                                    }
                                    if(d === createdAtd & m === createdAtm & y === createdAty & label === "office"){
                                        officeCount = officeCount +1
                                    }
                                    if(d === createdAtd & m === createdAtm & y === createdAty & label === "personal"){
                                        personalCount = personalCount +1
                                    }
                                    return <div></div>
                                }) 
                                }
                                {generalCount === 0 ? <div></div> : <div>general : {generalCount} </div>}
                                {officeCount === 0 ? <div></div> : <div>office : {officeCount} </div>}
                                {personalCount === 0 ? <div></div> : <div>personal : {personalCount} </div>}
                            </div>
                        </Paper>    
                    </Grid>
                )
                day = addDays(day ,1)
            }
            rows.push(
                <Grid container justify="space-evenly" alignItems="center">
                    {cells}
                </Grid>
            )
            cells=[]
        }

        return (
        <div>{rows}</div>
        )
    }

    getLabels = () => {
        const {todos} = this.props.data
        //console.log(todos[0] ? parseISO(todos[0].createdAt )  : "naahh")

        todos.map(({todoId , description}) => {
            console.log (todoId , description)
            return <div >hi</div>
        })  

    }
    render() {
        const {todos} = this.props.data
        console.log(todos[0] ? parseISO(todos[0].createdAt )  : "naahh")

        return (
            <div>
                {this.showDays()}
                {this.showCells()}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
  data : state.data,
  UI : state.UI
})

export default connect(mapStateToProps )(withStyles(styles)(CalendarCells))
