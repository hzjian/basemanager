import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles,makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import MessageIcon from '@material-ui/icons/Message';
import SettingsIcon from '@material-ui/icons/Settings';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import TableFooter from '@material-ui/core/TableFooter';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import {Link} from 'react-router-dom';
import { EnhancedTableHead } from '../../utils/tablehead';
import { fetchToptasks } from './actions';

const   headRows = [
  { id: 'taskName',  sorting: true, label: '任务名称' },
  { id: 'taskType', sorting: false, label: '对象类型' },
  { id: 'publisher', sorting: false, label: '发布者' },
  { id: 'createTime',  sorting: false, label: '创建时间' },
  { id: 'userNumber', sorting: false, label: '参与用户数' },
  { id: 'operation', sorting: false, label: '操作' },
];

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 2,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 300,
    },
    backgroundColor:"whitesmoke",
  },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
    padding: theme.spacing(1, 10, 1, 1),
  },
  title: {
    flex: '0 0 auto',
  },
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { location} = props;
  return (
    <Toolbar
      className={classes.root}>
      <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'Search' }}
          />
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
      {
          <Tooltip title="创建任务">
          <Link to={ location.pathname+'/createtask'}>
            <IconButton aria-label="Add">
              <AddCircleIcon />
            </IconButton>
          </Link>
          </Tooltip>
      }
      </div>
    </Toolbar>
  );
};

const styles = () => ({
  root: {
    width: '100%',
    height: '100%',
    overflow: 'auto', 
    },
    
}); 

class TaskList extends Component {
  state ={
    rowsPerPage:20,
    page:0,
    settingopen: false,
    rowId:''
  }
  handleChangePage(newPage) {
    this.setState({page:newPage});
  }

  handleChangeRowsPerPage(event) {
    this.setState({rowsPerPage:parseInt(event.target.value, 10)});
  }
  handleRequestSort() {
    
  }
  selectChange(){

  }
  handleSettingClick = (rowId) => ()  =>{
    this.setState(state => ({
      settingopen: !state.settingopen,
      rowId: rowId,
    }));
  }
  handleClickAway =() => {
    this.setState({
      settingopen: false,
    });
  }
  componentWillMount(){
    this.props.fetchToptasks(0,'',this.state.page,this.state.rowsPerPage,'desc','taskName');
  }
  render() {
    const {classes,location} = this.props;
    const rowsPerPage = this.state.rowsPerPage;
    const page = this.state.page;
    const { settingopen,rowId } = this.state;
    const {tasklist,totalCount}= this.props.taskData;
    const order ='desc';
    const selected =[];
    return (
      <div className = {classes.root}>
        <Paper className={classes.root}>
          <EnhancedTableToolbar numSelected={selected.length}  location = {location}/>
          <div className={classes.tableWrapper}>
            <Table className={classes.table}>
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                onRequestSort={this.handleRequestSort}
                rowCount={totalCount}
                headRows={headRows}
              />
              <TableBody  className={classes.tablebody}>
                {tasklist && tasklist.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                  <TableRow key={row.taskName}>
                    <TableCell component="th" scope="row">
                      {row.taskName}
                    </TableCell>
                    <TableCell>{row.className}</TableCell>
                    <TableCell>{row.userCname}</TableCell>
                    <TableCell>{row.createTime}</TableCell>
                    <TableCell>{row.userNum}</TableCell>
                    <TableCell>
                      <Typography>
                          <IconButton  id = {row.taskName} ref={child => row._child = child} onClick = {this.handleSettingClick(row.taskId)}>
                            <SettingsIcon/>
                          </IconButton>
                          <Popover
                              id = {row.taskName}
                              open={(rowId == row.taskId) && settingopen}
                              anchorEl= {row._child }
                              anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                              }}
                              transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                              }}
                              onClose={this.handleClickAway}
                            >
                            <MenuItem>
                              <Link to={{pathname : location.pathname+'/modifytask',params:{ taskId :row.taskId} }}>修改基本信息</Link>
                            </MenuItem>
                            <MenuItem>
                              <Link to={{pathname :location.pathname+'/taskfield', params:{ taskId :row.taskId,classId: row.classId}}}>配置字段</Link>
                            </MenuItem>
                            <MenuItem>
                              <Link to={{pathname :location.pathname+'/reflayer', params:{ taskId :row.taskId}}}>配置参考数据</Link>
                            </MenuItem>
                            <MenuItem>
                              <Link to={{pathname :location.pathname+'/taskspace', params:{ taskId :row.taskId}}}>配置任务空间</Link>
                            </MenuItem>
                            <MenuItem>
                              <Link to={{pathname :location.pathname+'/taskuser', params:{ taskId :row.taskId}}}>配置用户</Link>
                            </MenuItem>
                          </Popover>
                        <IconButton>
                          <MessageIcon/>
                        </IconButton>
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}

              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    colSpan={headRows.length}
                    labelRowsPerPage= '每页行数'
                    count={totalCount}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { 'aria-label': '每页行数' },
                      native: true,
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = state =>({
  taskData: state.taskData
});

const mapDispatchToProps = {
  fetchToptasks,
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(TaskList));