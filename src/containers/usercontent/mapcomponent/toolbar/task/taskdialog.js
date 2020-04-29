import React,{ Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import WorkIcon from '@material-ui/icons/Work';
import AppsIcon from '@material-ui/icons/Apps';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import SubjectIcon from '@material-ui/icons/Subject';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';
import SvgIcon from '@material-ui/core/SvgIcon';
import TaskTable from '../tasktable//tasktable';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '48px',
    height: '32px'
  },
  button: {
    padding:0,
    width: '32px',
    height: '32px'
  },
  icon: {
    margin: theme.spacing(1),
    fontSize: 24,
  },
  input: {
    display: 'none',
  },
});

class TaskDialog extends Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false }); 
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Tooltip title="任务列表">
          <IconButton color="primary" className={classes.button} onClick={this.handleClickOpen}>
              <SubjectIcon />
          </IconButton>
        </Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          maxWidth= "xl"
          aria-labelledby="form-dialog-title"
        >
         <DialogTitle id="form-dialog-title">选择任务</DialogTitle>
           <DialogContent>
           <TaskTable onClose = {this.handleClose}/>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(TaskDialog);