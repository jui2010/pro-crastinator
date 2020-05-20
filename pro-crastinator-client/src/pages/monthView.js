import React, { Component } from 'react'

import CalendarCells from '../components/CalendarCells'
import CalendarHeader from '../components/CalendarHeader'
import withStyles from '@material-ui/core/styles/withStyles'

import {connect} from 'react-redux'

const styles = (theme) => ({
  ...theme.spread,
})

export class monthView extends Component {
  render() {
      return (
          <div>
            <CalendarHeader />
            <CalendarCells />
          </div>
      )
  }
}

const mapStateToProps = (state) => ({
  data : state.data,
  UI : state.UI
})


export default connect(mapStateToProps )(withStyles(styles)(monthView))
