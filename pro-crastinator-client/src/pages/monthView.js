import React, { Component } from 'react'

import CalendarCellFrame from '../components/CalendarCellFrame'
import CalendarHeader from '../components/CalendarHeader'
import withStyles from '@material-ui/core/styles/withStyles'

import {connect} from 'react-redux'

const styles = (theme) => ({
  ...theme.spread,
  mainDiv : {
    display: 'flex', 
    flexDirection : 'column',
    justifyContent:'center',
    alignItems:'center'
  }
})

export class monthView extends Component {
  render() {
    const {classes} = this.props
      return (
          <div className={classes.mainDiv}>
            <CalendarHeader />
            <CalendarCellFrame />
          </div>
      )
  }
}

const mapStateToProps = (state) => ({
  data : state.data,
  UI : state.UI
})


export default connect(mapStateToProps )(withStyles(styles)(monthView))
