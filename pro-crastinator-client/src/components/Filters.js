import React, { Component } from 'react'
import {connect} from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles'

import Button from '@material-ui/core/Button'

import {toggleStatusFilter} from '../redux/actions/uiActions'

const styles = (theme) => ({
    ...theme.spread,
})

export class Filters extends Component {

    handleClick = (status) => {
        this.props.toggleStatusFilter(status)
    }
  
    render(){

        return (
            <div>
                <Button variant="contained" onClick = { () => this.handleClick('complete')}>
                    Complete
                </Button>
                <Button variant="contained" onClick = { () => this.handleClick('ongoing')}>
                    On-Going
                </Button>
                <Button variant="contained" onClick = { () => this.handleClick('new')}>
                    New
                </Button>
                <Button variant="contained" onClick = { () => this.handleClick('none')}>
                    None
                </Button>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    data : state.data,
    UI : state.UI
})

export default  connect(mapStateToProps, {toggleStatusFilter} )(withStyles(styles)(Filters))

