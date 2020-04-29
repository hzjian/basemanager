import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import CloseIcon from '@material-ui/icons/Close';

import Avatar from '@material-ui/core/Avatar';
import WorkIcon from '@material-ui/icons/Work';
import Typography from '@material-ui/core/Typography';
import { getUserTaskList,openUserTask ,closeUserTask} from './actions';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

class TaskTable extends Component{
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
    this.props.getUserTaskList('',value);
  };

  constructor(props) {
    super(props);
  }
  componentWillMount()
  {
    this.props.getUserTaskList('',0);
  }

  _openTask(taskId)
  {
    this.props.openUserTask(taskId);
    this.props.onClose();
  }

  _closeTask(taskId)
  {
    this.props.closeUserTask(taskId);
    this.props.onClose();
  }

  _getTaskStatus(task)
  {
    const status1 =
      <Tooltip title="打开任务">
        <IconButton aria-label="Comments" onClick = {() => this._openTask(task.taskId)}>
          <OpenInNewIcon />
        </IconButton>
      </Tooltip>;

    const status2 =   
      <Tooltip title="关闭当前任务">
        <IconButton aria-label="Comments" onClick = {() => this._closeTask(task.taskId)}>
          <CloseIcon />
        </IconButton>
      </Tooltip>;

    const { taskId}  = this.props;  
    if(taskId && task && task.taskId === taskId)
    {
      return status2;
    }
    else
    {
      return status1;
    }

  }

  handleChangePage = (evt) =>{
    console.log(JSON.stringify(evt));
  }

  onChangeRowsPerPage= () =>{

  }

  render() {
    const { value } = this.state;
    const { classes,taskList} = this.props;
    const { rowsPerPage, page } = this.props;
    return (
    <Paper className={classes.root}>
      <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="我创建的任务" />
          <Tab label="我参与的任务" />
          <Tab label="公开任务" />
      </Tabs>
      {value === 0 && <TabContainer>
        <Table className={classes.table} size='small'>
          <TableBody>
            {taskList && taskList.content.map(task => (
              <TableRow key={task.taskId}>
                <TableCell component="th" scope="row">
                  <ListItem dense>
                    <Avatar>
                      <WorkIcon />
                    </Avatar>
                    <ListItemText primary={task.taskDesc} secondary={ task.createTime} />
                    <ListItemSecondaryAction>
                      {this._getTaskStatus(task)}
                    </ListItemSecondaryAction>
                  </ListItem>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={10 /*data.length*/}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
          </TabContainer>}

        {value === 1 && <TabContainer>
        <Table className={classes.table}>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={10 /*data.length*/}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
          </TabContainer>}

        {value === 2 && <TabContainer>
        <Table className={classes.table}>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={10 /*data.length*/}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
          </TabContainer>}
      </Paper>
    );
  }
}

TaskTable.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state) =>(
  state.usertaskData
);
const mapDispatchToProps = {
  getUserTaskList,
  openUserTask,
  closeUserTask
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TaskTable));
