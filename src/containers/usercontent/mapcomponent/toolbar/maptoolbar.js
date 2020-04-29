import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import TaskDialog from '../toolbar/task/taskdialog';
import DrawManager from './drawmanager/drawmanager';

const styles = theme => ({
    root: {
      width: '100%',
      height: '36px'
    },
    appbar: {
      height: '100%',
      width: '100%'
    },
    toolbar: {
      minHeight: 36,
      height: '32px',
      width: '100%',
    },
    taskIcon: {
      width: '32px',
      height: '32px'
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing(9),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
      width: '100%',
    },
    inputInput: {
      paddingTop: theme.spacing(1),
      paddingRight: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      paddingLeft: theme.spacing(10),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 120,
        '&:focus': {
          width: 200,
        },
      },
    },
  });

  class MapToolBar extends Component {
    render()
    {
      const { classes } = this.props;
      return (
        <div className={classes.root}>
          <AppBar position="static" color="default" className={classes.appbar}>
            <Toolbar variant ='dense' disableGutters  className={classes.toolbar} >
              <TaskDialog className={classes.taskIcon} ></TaskDialog>
              <DrawManager map = {this.props.map} layerGroup = {this.props.layerGroup}></DrawManager>
              <div className={classes.grow} />
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="搜索…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                />
              </div>
            </Toolbar>
          </AppBar>
        </div>
      );
    }
}

export default withStyles(styles)(MapToolBar);