import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles,makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { fade } from '@material-ui/core/styles/colorManipulator';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DeleteIcon from '@material-ui/icons/Delete';
import TableFooter from '@material-ui/core/TableFooter';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { EnhancedTableHead } from '../../utils/tablehead';

import {fetchTaskUserList,
  fetchTaskUserAvaliable,
  addUserToTask,
  deleteTaskUser,} from './actions';

const   headRows = [
  { id: 'username',  sorting: true, label: '用户名' },
  { id: 'username_cn', sorting: false, label: '中文名' },
  { id: 'email', sorting: false, label: '邮箱' },
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
  formControl:{
    marginRight: theme.spacing(2),
    marginLeft: 2,
    minWidth: 400,
  },
  select:{
    width: '50%',
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
  const { location ,avuserlist, addUserToTask} = props;
  const [ userId, setUserId] = React.useState('');

  return (
    <Toolbar className={classes.root}>
      <div className={classes.formControl}>
        <Select value ={userId}  className={classes.select}  onChange ={(event) =>{ setUserId(event.target.value); }}  >
        {
          avuserlist && avuserlist.map((item)=>{
            return (
              <MenuItem key = {item.userName} value = {item.userName}>{item.userCnname}</MenuItem>
            )
          })
        }
        </Select>
        <Button  onClick = {()=>{ addUserToTask(userId,location.params.taskId)}} >添加</Button>
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
  rankItemInput:{
    width: '100px'
  },
  table: {
    minWidth:650,
  },
  tablerow :{
    height: '10px',
  }
}); 

class TaskUser extends Component {
  constructor(props)
  {
    super(props);
    this.state ={
      rowsPerPage:8,
      page:0,
    }
  }
  handleChangePage(newPage) {
    this.setState({page:newPage});
    const { params } =  this.props.location;
    if(params && params.taskId)
    {
      const taskId = params.taskId;
      this.props.fetchFieldList(taskId,'',newPage,this.state.rowsPerPage,'desc','fieldName');
    }
  }

  handleChangeRowsPerPage(event) {
    const rowsPerPage = parseInt(event.target.value, 10);
    this.setState({rowsPerPage:rowsPerPage});
    const { params } =  this.props.location;
    if(params && params.taskId)
    {
      const taskId = params.taskId;
      this.props.fetchFieldList(taskId,'',0,this.state.rowsPerPage,'desc','fieldName');
    }
  }
  handleSettingClick = (rowId)  =>{
    this.setState(state => ({
      settingopen: !state.settingopen,
      rowId: rowId,
    }));
  }


  handleAddUserToTask = (userId,taskId) =>{
    this.props.addUserToTask(userId,taskId).then(()=>{
      this.props.fetchTaskUserList(taskId,'',0,this.state.rowsPerPage);
      this.props.fetchTaskUserAvaliable(taskId);
    });
  }

  handleDeleteClick = (userId) =>{
    const { params } =  this.props.location;
    this.props.deleteTaskUser(userId,params.taskId).then( ()=>{
      this.props.fetchTaskUserList(params.taskId,'',0,this.state.rowsPerPage);
      this.props.fetchTaskUserAvaliable(params.taskId);
    });
  }

  componentWillMount(){
    const { params } =  this.props.location;
    if(params && params.taskId)
    {
      const taskId = params.taskId;
      this.props.fetchTaskUserList(taskId,'',0,this.state.rowsPerPage);
      this.props.fetchTaskUserAvaliable(taskId);
    }
  }
  render() {
    const { classes,location} = this.props;
    const rowsPerPage = this.state.rowsPerPage;
    const page = this.state.page;
    const {taskuserlist,totalCount,avuserlist}= this.props.taskUserData;
    const order ='desc';
    return (
        <Paper className={classes.root}>
          <EnhancedTableToolbar  location = {location} avuserlist = {avuserlist}  addUserToTask = {this.handleAddUserToTask}/>
          <div className={classes.tableWrapper}>
            <Table className={classes.table} size='small'>
              <EnhancedTableHead
                order={order}
                onRequestSort={this.handleRequestSort}
                rowCount={totalCount}
                headRows={headRows}
              />
              <TableBody  className={classes.tablebody}>
                {taskuserlist && taskuserlist.map(row => (
                  <TableRow key={row.userName} className={classes.tablerow}>
                    <TableCell component="th" scope="row">
                      {row.userName}
                    </TableCell>
                    <TableCell>
                      {row.userCnname}
                    </TableCell>
                    <TableCell>
                      {row.userEmail}
                    </TableCell>
                    <TableCell>
                      <Typography>
                          <FormControlLabel  labelPlacement='end'  control={
                              <IconButton id = {row.userName} onClick = {() => this.handleDeleteClick(row.userName)}>
                                <DeleteIcon/>
                              </IconButton> }
                              label= "删除">
                          </FormControlLabel>
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}

              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[8, 24, 50]}
                    colSpan={headRows.length}
                    labelRowsPerPage= '每页行数'
                    count={totalCount}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { 'aria-label': '每页行数' },
                      native: true,
                    }}
                    onChangePage={this.handleChangePage.bind(this)}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage.bind(this)}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </Paper>
    )
  }
}

const mapStateToProps = state =>({
    taskUserData: state.taskUserData
});

const mapDispatchToProps = {
  fetchTaskUserList,
  fetchTaskUserAvaliable,
  addUserToTask,
  deleteTaskUser,
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(TaskUser));