import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles,makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Input from '@material-ui/core/Input';
import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SettingsIcon from '@material-ui/icons/Settings';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import TableFooter from '@material-ui/core/TableFooter';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import {Link} from 'react-router-dom';
import { EnhancedTableHead } from '../../utils/tablehead';
import { fetchFieldList ,fetchTaskAttrRankList,fetchTaskAttrAvaliable, saveRankName , addAttrToTask,
          deleteTaskAttr ,saveAttrRankValue,saveTaskAttrStatus } from './actions';

const   headRows = [
  { id: 'fieldName',  sorting: true, label: '字段名称' },
  { id: 'editable', sorting: false, label: '可编辑' },
  { id: 'groupName', sorting: false, label: '分组' },
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
  const { location ,attrList, addAttrToTask} = props;
  const [attrId, setAttrId] = React.useState('');

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

      <div className={classes.formControl}>
        <Select value ={attrId}  className={classes.select}  onChange ={(event) =>{ setAttrId(event.target.value); }}  >
        {
          attrList && attrList.map((item)=>{
            return (
              <MenuItem key ={item.attrId} value = {item.attrId}>{item.attrName}</MenuItem>
            )
          })
        }
        </Select>
        <Button  onClick = {()=>{ addAttrToTask(attrId,location.params.taskId)}} >添加</Button>
      </div>

      <div className={classes.actions}>
      {
          <Tooltip title="添加字段">
          <Link to={{pathname: location.pathname+'/addfield',params: location.params }}>
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

class TaskField extends Component {
  constructor(props)
  {
    super(props);
    this.state ={
      rowsPerPage:8,
      page:0,
      settingopen: false,
      rowId:'',
      rankEditable:false,
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
      this.props.fetchFieldList(taskId,'',0,rowsPerPage,'desc','fieldName');
    }
  }
  handleRequestSort() {
    
  }
  selectChange(){

  }
  handleSettingClick = (rowId)  =>{
    this.setState(state => ({
      settingopen: !state.settingopen,
      rowId: rowId,
    }));
  }
  handleClickAway =() => {
    this.setState({
      settingopen: false,
      rankEditable:false
    });
  }
  changeTaskAttrRankStatus = () =>{
    this.setState(state => ({
      rankEditable: !state.rankEditable,
    }));
  }
  rankNameChange = (event) =>{
    const rankName = event.target.value;
    const rankId = event.target.id;
    this.props.fieldData.ranklist.map((item) =>{
      if(item.rankId == rankId)
      {
        item.rankName = rankName;
      }
      return item;
    })
    this.props.saveRankName(rankId,rankName);
  }

  handleEditChange = (taskId,attrId) =>(event) =>{
    const editstate = event.target.value?1:0;
    this.props.saveTaskAttrStatus(taskId,attrId,editstate);
  }

  handleSelectRank = (taskId,attrId,rankId,rankName) =>()=>{
    this.setState({
      settingopen: false,
      rankEditable:false
    });
    this.props.saveAttrRankValue(taskId,attrId,rankId,rankName);
  }

  handleAddAttrToTask = (attrId,taskId) =>{
    const { params } =  this.props.location;
    this.props.addAttrToTask(attrId,taskId,params.classId).then(()=>{
      this.props.fetchFieldList(taskId,'',this.state.page,this.state.rowsPerPage,'desc','fieldName');
      this.props.fetchTaskAttrAvaliable(taskId,params.classId);
    });
  }

  handleDeleteTaskAttr = (attrId) =>{
    const { params } =  this.props.location;
    this.props.deleteTaskAttr(attrId,params.taskId,params.classId).then( ()=>{
      this.props.fetchFieldList(params.taskId,'',this.state.page,this.state.rowsPerPage,'desc','fieldName');
      this.props.fetchTaskAttrAvaliable(params.taskId,params.classId);
    });
  }

  componentWillMount(){
    const { params } =  this.props.location;
    if(params && params.taskId)
    {
      const taskId = params.taskId;
      const classId = params.classId; 
      this.props.fetchFieldList(taskId,'',this.state.page,this.state.rowsPerPage,'desc','fieldName');
      this.props.fetchTaskAttrRankList(taskId);
      this.props.fetchTaskAttrAvaliable(taskId,classId);
    }
  }
  render() {
    const { classes,location} = this.props;
    const rowsPerPage = this.state.rowsPerPage;
    const page = this.state.page;
    const { settingopen,rowId } = this.state;
    const {fieldlist,totalCount,ranklist,attrList,attrId,rankName}= this.props.fieldData;
    const order ='desc';
    const selected =[]; 
    return (
        <Paper className={classes.root}>
          <EnhancedTableToolbar numSelected={selected.length}  location = {location} attrList = {attrList}  addAttrToTask = {this.handleAddAttrToTask}/>
          <div className={classes.tableWrapper}>
            <Table className={classes.table} size='small'>
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                onRequestSort={this.handleRequestSort}
                rowCount={totalCount}
                headRows={headRows}
              />
              <TableBody  className={classes.tablebody}>
                {fieldlist && fieldlist.map(row => (
                  <TableRow key={row.attrId} className={classes.tablerow}>
                    <TableCell component="th" scope="row">
                      {row.attrName}
                    </TableCell>
                    <TableCell>
                      <Checkbox
                          checked={row.attrIsedit===1?true:false}
                          onChange={this.handleEditChange(location.params.taskId,row.attrId)}
                          value="checkedB"
                          color="primary"
                          inputProps={{
                            'aria-label': 'secondary checkbox',
                          }}
                        />
                    </TableCell>
                    <TableCell>
                      <Typography>
                          <FormControlLabel  labelPlacement='start'  control={
                              <IconButton id = {row.attrId}  disableRipple = {true} ref={child => row._child = child} onClick = {() => this.handleSettingClick(row.attrId)}>
                                <ArrowDropDownIcon/>
                              </IconButton> }
                              label= {(attrId === row.attrId) && rankName  ? rankName : row.rankName}>
                          </FormControlLabel>
                          <Popover
                              id = {row.attrId}
                              open={(rowId === row.attrId) && settingopen}
                              anchorEl= {row._child }
                              anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                              }}
                              transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                              }}
                              onClose={() =>this.handleClickAway()}
                            >
                            {ranklist && ranklist.map((item) =>{
                                return (
                                  <MenuItem key ={item.rankId}> 
                                    {
                                      this.state.rankEditable ? 
                                      <Input id = {item.rankId} defaultValue = {item.rankName} className={classes.rankItemInput}  onChange = {this.rankNameChange} />: 
                                      <Typography onClick = { this.handleSelectRank(location.params.taskId,row.attrId,item.rankId,item.rankName)}>{item.rankName}</Typography> 
                                      }
                                  </MenuItem>
                                )
                              })
                            }
                            <MenuItem onClick = {() => this.changeTaskAttrRankStatus()}><SettingsIcon/>编辑分组</MenuItem>
                          </Popover>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick = {() => this.handleDeleteTaskAttr(row.attrId)}>
                        <DeleteIcon/>
                      </IconButton>
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
  fieldData: state.fieldData
});

const mapDispatchToProps = {
  fetchFieldList,
  fetchTaskAttrRankList,
  fetchTaskAttrAvaliable,
  addAttrToTask,
  deleteTaskAttr,
  saveRankName,
  saveAttrRankValue,
  saveTaskAttrStatus,
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(TaskField));