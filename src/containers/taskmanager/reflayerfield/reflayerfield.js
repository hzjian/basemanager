import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles,makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import TableFooter from '@material-ui/core/TableFooter';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { EnhancedTableHead } from '../../utils/tablehead';
import { fetchFieldList ,fetchTaskAttrAvaliable , addAttrToTask,
          deleteTaskAttr  } from './actions';

const   headRows = [
  { id: 'fieldName',  sorting: true, label: '字段名称' },
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
  tableWrapper:{
    marginLeft: '20px',
  },
  tablerow :{
    height: '10px',
  }
}); 

class RefLayerField extends Component {
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
      this.props.fetchFieldList(taskId,params.layerId,newPage,this.state.rowsPerPage,'desc','fieldName');
    }
  }

  handleChangeRowsPerPage(event) {
    const rowsPerPage = parseInt(event.target.value, 10);
    this.setState({rowsPerPage:rowsPerPage});
    const { params } =  this.props.location;
    if(params && params.taskId)
    {
      const taskId = params.taskId;
      this.props.fetchFieldList(taskId,params.layerId,0,rowsPerPage,'desc','fieldName');
    }
  }
  handleRequestSort() {
    
  }
  selectChange(){

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

  handleAddAttrToTask = (attrId,taskId) =>{
    const { params } =  this.props.location;
    this.props.addAttrToTask(attrId,taskId,params.classId).then(()=>{
      this.props.fetchFieldList(taskId,params.layerId,this.state.page,this.state.rowsPerPage,'desc','fieldName');
      this.props.fetchTaskAttrAvaliable(taskId,params.classId);
    });
  }

  handleDeleteTaskAttr = (attrId) =>{
    const { params } =  this.props.location;
    this.props.deleteTaskAttr(attrId,params.taskId,params.classId).then( ()=>{
      this.props.fetchFieldList(params.taskId,params.layerId,this.state.page,this.state.rowsPerPage,'desc','fieldName');
      this.props.fetchTaskAttrAvaliable(params.taskId,params.classId);
    });
  }

  componentWillMount(){
    const { params } =  this.props.location;
    if(params && params.taskId)
    {
      const taskId = params.taskId;
      const classId = params.classId; 
      const layerId = params.layerId; 
      this.props.fetchFieldList(taskId,layerId,this.state.page,this.state.rowsPerPage,'desc','fieldName');
      this.props.fetchTaskAttrAvaliable(taskId,classId);
    }
  }
  render() {
    const { classes,location} = this.props;
    const rowsPerPage = this.state.rowsPerPage;
    const page = this.state.page;
    const {fieldlist,totalCount,attrList}= this.props.fieldData;
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
  fieldData: state.refLayerFieldData
});

const mapDispatchToProps = {
  fetchFieldList,
  fetchTaskAttrAvaliable,
  addAttrToTask,
  deleteTaskAttr,
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(RefLayerField));