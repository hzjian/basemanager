import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles,makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import TableFooter from '@material-ui/core/TableFooter';
import {Link} from 'react-router-dom';
import { EnhancedTableHead } from '../../utils/tablehead';
import { fetchFieldList , addAttrToTask,
  deleteKernelAttr ,saveTaskAttrStatus } from './actions';

const   headRows = [
  { id: 'fieldName',  sorting: true, label: '字段名称' },
  { id: 'fieldType', sorting: false, label: '字段类别' }, // STRING,INTEGER,DOUBLE,DATETIME、
  { id: 'fieldGrade', sorting: false, label: '存储等级' }, //TASKGRADE,USERGRADE,NORMAL
  { id: 'fieldRange', sorting: false, label: '取值范围' },
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
  const { location } = props;

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
  },
  tableWrapper:{
    margin:'20px',
  },
  button:{
    padding:'2px',
  }
}); 

class KernelField extends Component {
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
    if(params && params.kernel && params.kernel.classId)
    {
      this.props.fetchFieldList(params.kernel.classId,newPage,this.state.rowsPerPage,'desc','fieldName');
    }
  }
  handleChangeRowsPerPage(event) {
    const rowsPerPage = parseInt(event.target.value, 10);
    this.setState({rowsPerPage:rowsPerPage});
    const { params } =  this.props.location;
    if(params && params.kernel && params.kernel.classId)
    {
      const classId = params.kernel.classId;
      this.props.fetchFieldList(classId,0,rowsPerPage,'desc','fieldName');
    }
  }
  handleRequestSort() {
    
  }
  //STRING,INTEGER,DOUBLE,DATETIME
  getAttrType = (type) =>{
    switch (type){
      case 'STRING':
        return '文本';
      case 'INTEGER':
        return '整数';
      case 'DOUBLE':
        return '双精度';  
      case 'DATETIME':
        return '日期';    
      default:
        return '文本';
    }
  }
  ////TASKGRADE,USERGRADE,NORMAL
  getAttrFGrade = (grade) =>{
    switch (grade){
      case 'NORMAL':
        return '全局级';
      case 'TASKGRADE':
        return '任务级';
      case 'USERGRADE':
        return '用户级';    
      default:
        return '全局级';
    }
  }
  getAttrRange = (minvalue,maxvalue) =>{
    if(minvalue && maxvalue)
    {
      return "最大："+maxvalue+"最小："+minvalue;
    }
    else
    {
      return '';
    }
  }

  handleEditChange = (taskId,attrId) =>(event) =>{
    const editstate = event.target.value?1:0;
    this.props.saveTaskAttrStatus(taskId,attrId,editstate);
  }

  handleDeleteAttr = (attrId) =>{
    const { params } =  this.props.location;
    if(params && params.kernel && params.kernel.classId)
    {
      this.props.deleteKernelAttr(attrId,params.kernel.classId).then( ()=>{
        this.props.fetchFieldList(params.kernel.classId,this.state.page,this.state.rowsPerPage,'asc','fieldName');
      });
    }
  }

  componentWillMount(){
    const { params } =  this.props.location;
    if(params && params.kernel && params.kernel.classId)
    {
      this.props.fetchFieldList(params.kernel.classId,this.state.page,this.state.rowsPerPage,'asc','fieldName');
    }
  } 
  render() {
    const { classes,location} = this.props;
    const kernel = location.params && location.params.kernel;
    const rowsPerPage = this.state.rowsPerPage;
    const page = this.state.page;
    const {fieldlist,totalCount}= this.props.kernelFieldData;
    const order ='desc';
    const selected =[]; 
    return (
        <Paper className={classes.root}>
          <EnhancedTableToolbar numSelected={selected.length}  location = {location}/>
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
                      {this.getAttrType(row.attrType)}
                    </TableCell>
                    <TableCell>
                      {this.getAttrFGrade(row.attrFgrade)}
                    </TableCell>
                    <TableCell>
                      {this.getAttrRange(row.maxValue,row.minValue)}
                    </TableCell>
                    <TableCell>
                      <Tooltip title="编辑">
                        <Link to={{pathname: location.pathname+'/editfield',params:{kernel:kernel,attr:row}}}>
                          <IconButton aria-label="edit" className={classes.button}>
                            <EditIcon />
                          </IconButton>
                        </Link>
                      </Tooltip>
                      <IconButton className={classes.button} onClick = {() => this.handleDeleteAttr(row.attrId)}>
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
  kernelFieldData: state.kernelFieldData
});

const mapDispatchToProps = {
  fetchFieldList,
  addAttrToTask,
  deleteKernelAttr,
  saveTaskAttrStatus,
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(KernelField));