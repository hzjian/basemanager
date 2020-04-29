import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles,makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SettingsIcon from '@material-ui/icons/Settings'
import InputBase from  '@material-ui/core/InputBase';
import Tooltip from  '@material-ui/core/Tooltip';
import Popover from  '@material-ui/core/Popover';
import MenuList from '@material-ui/core/MenuList';
import {Link} from 'react-router-dom';

import TableFooter from '@material-ui/core/TableFooter';
import MenuItem from '@material-ui/core/MenuItem';
import { EnhancedTableHead } from '../../utils/tablehead';

import {fetchGroupList,
  fetchTaskUserAvaliable,
  addUserToTask,
  deleteTaskUser,} from './actions';

const   headRows = [
  { id: 'groupcode',  sorting: true, label: '代码' },
  { id: 'groupname', sorting: false, label: '名称' },
  { id: 'groupaddress', sorting: false, label: '地址' },
  { id: 'principal', sorting: false, label: '负责人' },
  { id: 'telphone', sorting: false, label: '电话' },
  { id: 'status', sorting: false, label: '状态' },
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
  const { location} = props;
  const [] = React.useState('');

  return (
    <Toolbar className={classes.root}>
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
          <Tooltip title="添加">
          <Link to={ location.pathname+'/addgroup'}>
            <IconButton aria-label="Add">
              <AddCircleIcon />
            </IconButton>
          </Link>
          </Tooltip>
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

class GroupMgr extends Component {
  state = {
    rowsPerPage:20,
    page:0,
    settingopen: false,
    rowId:''
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
      this.props.fetchGroupList('',0,this.state.rowsPerPage,"ASC","groupName");
  }
  render() {
    const { classes,location} = this.props;
    const rowsPerPage = this.state.rowsPerPage;
    const page = this.state.page;
    const { settingopen,rowId } = this.state;
    const {grouplist,totalCount}= this.props.groupData;
    const order ='desc';
    return (
        <Paper className={classes.root}>
          <EnhancedTableToolbar  location = {location}/>
          <div className={classes.tableWrapper}>
            <Table className={classes.table} size='small'>
              <EnhancedTableHead
                order={order}
                onRequestSort={this.handleRequestSort}
                rowCount={totalCount}
                headRows={headRows}
              />
              <TableBody  className={classes.tablebody}>
                {grouplist && grouplist.map(row => (
                  <TableRow key={row.groupGuid} className={classes.tablerow}>
                    <TableCell component="th" scope="row">
                      {row.groupCode}
                    </TableCell>
                    <TableCell>
                      {row.groupName}
                    </TableCell>
                    <TableCell>
                      {row.groupAddress}
                    </TableCell>
                    <TableCell>
                      {row.groupPic}
                    </TableCell>
                    <TableCell>
                      {row.groupPhone}
                    </TableCell>
                    <TableCell>
                      {row.groupStatus}
                    </TableCell>
                    <TableCell>
                      <Typography>
                          <IconButton  id = {row.taskName} ref={child => row._child = child} onClick = {this.handleSettingClick(row.groupGuid)}>
                            <SettingsIcon/>
                          </IconButton>
                          <Popover
                              id = {row.groupGuid}
                              open={(rowId == row.groupGuid) && settingopen}
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
                            <MenuList>
                              <MenuItem>
                                <Link to={{pathname : location.pathname+'/editgroup',params:{ group :row} }}>基本信息</Link>
                              </MenuItem>
                              <MenuItem>
                                <Link to={{pathname :location.pathname+'/groupuser', params:{ groupId :row.groupGuid}}}>用户管理</Link>
                              </MenuItem>
                            </MenuList>                          
                          </Popover>
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
  groupData: state.groupData
});

const mapDispatchToProps = {
  fetchGroupList,
  fetchTaskUserAvaliable,
  addUserToTask,
  deleteTaskUser,
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(GroupMgr));