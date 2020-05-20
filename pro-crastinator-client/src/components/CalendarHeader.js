import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import format from "date-fns/format"

import MyButton from '../components/MyButton'
import withStyles from '@material-ui/core/styles/withStyles'

import {connect} from 'react-redux'
import {getPrevMonth, getNextMonth} from '../redux/actions/uiActions'

const styles = (theme) => ({
  ...theme.spread,
  currMonth : {
    textAlign : 'center',
  }
})

export class CalendarHeader extends Component {

  nextMonth = () => {
    this.props.getNextMonth()
  }

  prevMonth = () => {
    this.props.getPrevMonth()
  }

  render() {
    const {classes} = this.props
    const { currMonth} = this.props.UI 
      return (
        <Grid container >
        <Grid item xs ={1}>
          <MyButton tip="Previous Month" onClick={this.prevMonth}>
            <ArrowBackIosIcon />
          </MyButton>
        </Grid>

        <Grid item xs ={10} className={classes.currMonth}>
          {format(currMonth , 'MMMM yyyy')}
        </Grid>

        <Grid item xs ={1}>
          <MyButton tip="Next Month" onClick={this.nextMonth}>
            <ArrowForwardIosIcon />
          </MyButton>
        </Grid>
      </Grid>
      )
  }
}

const mapStateToProps = (state) => ({
  data : state.data,
  UI : state.UI
})

const mapActionsToProps = {
  getPrevMonth,
  getNextMonth
}

export default connect(mapStateToProps , mapActionsToProps )(withStyles(styles)(CalendarHeader))
