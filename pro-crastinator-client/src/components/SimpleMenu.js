import React, { Component } from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import SettingsIcon from '@material-ui/icons/Settings'

import withStyles from '@material-ui/core/styles/withStyles'

import {connect} from 'react-redux'
import {logoutUser} from '../redux/actions/userActions'

const styles = (theme) => ({
  ...theme.spread,
})

class SimpleMenu extends Component{
  state = {
    anchorEl : null
  }

  handleClick = (event) => {
    this.setState({
      anchorEl : event.currentTarget
    })
  }
  
  handleClose = () => {
    this.setState({
      anchorEl : null
    })
  }

  handleLogout = () => {
    this.props.logoutUser()
    this.handleClose()
  }

  render(){
    return (
      <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        color="inherit"
        onClick={this.handleClick}
      >
        <SettingsIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={this.state.anchorEl}
        keepMounted
        elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
        open={Boolean(this.state.anchorEl)}
        onClose={this.handleClose}
      >
        <MenuItem onClick={this.handleClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleClose}>My account</MenuItem>
        <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
    )
  }
}


// const mapStateToProps = (state) => ({
//   user : state.user,
//   data : state.data
// })
export default connect(null , {logoutUser})(withStyles(styles)(SimpleMenu))
