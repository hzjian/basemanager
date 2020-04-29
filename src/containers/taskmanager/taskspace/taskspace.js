import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles,makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
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
import { EnhancedTableHead } from '../../utils/tablehead';
import {fetchRefLayerList, fetchTaskKernelAvaliable, addKernelToTask, deleteTaskLayer,} from './actions';

const   headRows = [
  { id: 'fileName',  sorting: true, label: '文件名称' },
  { id: 'fileType', sorting: false, label: '文件类型' },
  { id: 'uploadtime', sorting: false, label: '上传时间' },
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
  const { location ,addKernelToTask} = props;
  const [ kernelId] = React.useState('');

  return (
    <Toolbar className={classes.root}>
      <div className={classes.formControl}>
        <Button iconclassname="fa fa-plus-square" onClick={(e) => e.stopPropagation()}>
            <Input type="file" name="filename" placeholder="未选取任何文件" title="选取"/>
        </Button>
        <Button  onClick = {()=>{ addKernelToTask(kernelId,location.params.taskId)}} >添加</Button>
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

class TaskSpace extends Component {
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
      this.props.fetchFieldList(taskId,'',0,rowsPerPage,'desc','fieldName');
    }
  }
  handleSettingClick = (rowId)  =>{
    this.setState(state => ({
      settingopen: !state.settingopen,
      rowId: rowId,
    }));
  }


  handleAddKernelToTask = (kernelId,taskId) =>{
    this.props.addKernelToTask(kernelId,taskId).then(()=>{
      this.props.fetchRefLayerList(taskId);
      this.props.fetchTaskKernelAvaliable(taskId);
    });
  }

  handleDeleteClick = (layerId) =>{
    const { params } =  this.props.location;
    this.props.deleteTaskLayer(layerId,params.taskId).then( ()=>{
      this.props.fetchRefLayerList(params.taskId);
      this.props.fetchTaskKernelAvaliable(params.taskId);
    });
  }

  componentWillMount(){
    const { params } =  this.props.location;
    if(params && params.taskId)
    {
      const taskId = params.taskId;
      this.props.fetchRefLayerList(taskId);
      this.props.fetchTaskKernelAvaliable(taskId);
    }
  }
  render() {
    const { classes,location} = this.props;
    const rowsPerPage = this.state.rowsPerPage;
    const page = this.state.page;
    const {refLayerlist,totalCount,kernellist}= this.props.refData;
    const order ='desc';
    return (
        <Paper className={classes.root}>
          <EnhancedTableToolbar  location = {location} kernellist = {kernellist}  addKernelToTask = {this.handleAddKernelToTask}/>
          <div className={classes.tableWrapper}>
            <Table className={classes.table} size='small'>
              <EnhancedTableHead
                order={order}
                onRequestSort={this.handleRequestSort}
                rowCount={totalCount}
                headRows={headRows}
              />
              <TableBody  className={classes.tablebody}>
                {refLayerlist && refLayerlist.map(row => (
                  <TableRow key={row.layerId} className={classes.tablerow}>
                    <TableCell component="th" scope="row">
                      {row.layerName}
                    </TableCell>
                    <TableCell>
                      {row.kernelNum}
                    </TableCell>
                    <TableCell>
                      <Typography>
                          <FormControlLabel  labelPlacement='end'  control={
                              <IconButton id = {row.classId} onClick = {() => this.handleSettingClick(row.classId)}>
                                <ArrowDropDownIcon/>
                              </IconButton> }
                              label= "下载">
                          </FormControlLabel>
                          <FormControlLabel  labelPlacement='end'  control={
                              <IconButton id = {row.layerId} onClick = {() => this.handleDeleteClick(row.layerId)}>
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
    refData: state.refData
});

const mapDispatchToProps = {
    fetchRefLayerList,
    fetchTaskKernelAvaliable,
    addKernelToTask,
    deleteTaskLayer,
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(TaskSpace));