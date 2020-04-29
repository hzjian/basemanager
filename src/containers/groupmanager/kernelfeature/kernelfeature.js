import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles,makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
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
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon  from '@material-ui/icons/Edit';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import TableFooter from '@material-ui/core/TableFooter';
import {Link} from 'react-router-dom';
import PointSymbol from '../symbol/pointsymbol';
import LineSymbol from '../symbol/linesymbol';
import PolygonSymbol from '../symbol/polygonsymbol';
import { EnhancedTableHead } from '../../utils/tablehead';
import { fetchFeatureList ,deleteFeature, saveRankName , addAttrToTask,
          saveAttrRankValue,saveTaskAttrStatus } from './actions';

const   headRows = [
  { id: 'featureName',  sorting: true, label: '名称' },
  { id: 'applyNum', sorting: false, label: '应用数' },
  { id: 'featureStyle', sorting: false, label: '特征样式' },
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
      {
          <Tooltip title="添加子类">
          <Link to={{pathname: location.pathname+'/addfeature',params: location.params }}>
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
  },tableWrapper:{
    margin:'20px',
  },
  button:{
    padding:'0px',
  }
}); 

class KernelFeature extends Component {
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
    if(params && params.kernel && params.kernel.classId )
    {
      const classId = params.kernel.classId; 
      this.props.fetchFeatureList(classId,this.state.page,this.state.rowsPerPage,'desc','featureName');
    }
  }
  handleRequestSort() {
    
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

  handleDeleteFeature = (classId,id) =>{
    this.props.deleteFeature(id).then(()=>{
        this.props.fetchFeatureList(classId,this.state.page,this.state.rowsPerPage,'desc','featureName');
    });
  }

  componentWillMount(){
    const { params } =  this.props.location;
    if(params && params.kernel && params.kernel.geoType)
    {
      const classId = params.kernel.classId;
      this.props.fetchFeatureList(classId,this.state.page,this.state.rowsPerPage,'desc','featureName');
    }
  }
  render() {
    const { classes,location} = this.props;
    const rowsPerPage = this.state.rowsPerPage;
    const page = this.state.page;
    const {featurelist,totalCount}= this.props.feaListData;
    const order ='desc';
    const selected =[]; 
    const kernel = location.params && location.params.kernel;
    const classId = location.params && location.params.kernel && location.params.kernel.classId; 
    const geoType = location.params && location.params.kernel && location.params.kernel.geoType; 
    return (
        <Paper className={classes.root}>
          <EnhancedTableToolbar numSelected={selected.length}  location = {location} />
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
                {featurelist && featurelist.map(row => (
                  <TableRow key={row.id} className={classes.tablerow}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>
                      {row.applyNum}
                    </TableCell>
                    <TableCell>
                      {geoType && (geoType === 'POINT') && <PointSymbol {...row.geomStyle} />}
                      {geoType && (geoType === 'LINE') && <LineSymbol {...row.geomStyle} />}
                      {geoType && (geoType === 'POLYGON') && <PolygonSymbol {...row.geomStyle} />}
                    </TableCell>
                    <TableCell>
                      <Tooltip title="编辑">
                        <Link to={{pathname:location.pathname+'/editfeature',params:{kernel:kernel,feaData:row}}}>
                          <IconButton aria-label="edit" className={classes.button} >
                            <EditIcon />
                          </IconButton>
                        </Link>
                      </Tooltip>
                      <IconButton className={classes.button} onClick = {() => this.handleDeleteFeature(classId,row.id)}>
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
  feaListData: state.feaListData
});

const mapDispatchToProps = {
  fetchFeatureList,
  deleteFeature,

  addAttrToTask,
  saveRankName,
  saveAttrRankValue,
  saveTaskAttrStatus,
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(KernelFeature));