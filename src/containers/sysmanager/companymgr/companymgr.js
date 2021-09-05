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
import {Select , InputLabel,FormControl  } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import TableFooter from '@material-ui/core/TableFooter';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Tooltip from '@material-ui/core/Tooltip';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { EnhancedTableHead } from '../../utils/tablehead';
import {Link} from 'react-router-dom';
import {fetchCompanyList, deleteCompany,upOrderCompany,downOrderCompany,topOrderCompany,cancelTopOrderCompany,lastOrderCompany} from './actions';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Popover from '@material-ui/core/Popover';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

/**
 * 
 */

const DISPLAY_SIZE = 60;
const   headRows = [
  { id: 'name', sorting: false, label: '公司名称' },
  { id: 'companyDesc', sorting: false, label: '公司介绍' },
  { id: 'logoSrc', sorting: false, label: '公司LOGO' },
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
  const { location ,addUserToGroup,type,handleChange} = props;

  return (
    <Toolbar className={classes.root}>
      <div className={classes.actions}>
          <Tooltip title="添加">
          <Link to={{pathname : location.pathname+'/addcompany'}}> 
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

class CompanyManager extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      rowsPerPage:8,
      page:0,
      delId:0,
      companylist:[],
      totalCount:0,
      showDeleteConfirmDialog:false,
      settingopen:false,
    }
  }
  _uprderRecord =(row) => (e) =>{
    this.setState({settingopen:false});
    this.props.upOrderCompany(row.id,"",this.state.page, this.state.rowsPerPage);
    
  }
  _downOrderRecord =(row) => (e) =>{
    this.setState({settingopen:false});
    this.props.downOrderCompany(row.id,"",this.state.page, this.state.rowsPerPage);
    
  }
  _topOrderRecord =(row) => (e) =>{
    this.setState({settingopen:false});
    this.props.topOrderCompany(row.id,this.state.type,'',this.state.page,this.state.rowsPerPage);
  }
  _cancelTopOrderRecord =(row) => (e) =>{
    this.setState({settingopen:false});
    this.props.cancelTopOrderCompany(row.id,this.state.type,'',this.state.page,this.state.rowsPerPage);
  }

  _lastOrderRecord=(row) => (e) =>{
    this.setState({settingopen:false});
    this.props.lastOrderCompany(row.id,this.state.type,'',this.state.page,this.state.rowsPerPage);
  }

  _showConfirmDeleteDialog = (row) =>(e)=>{
    this.setState({settingopen:false,delId: row.id,showDeleteConfirmDialog:true});
  } 
  _handleCancelClose =() =>{
    this.setState({showDeleteConfirmDialog:false});
  }

  _handleConfirmClose =() =>{
      this.setState({showDeleteConfirmDialog:false});
      this.props.deleteCompany(this.state.delId,"",0,this.state.rowsPerPage);
  }

  handleChange = (event) =>{
    this.props.fetchCompanyList("",0,this.state.rowsPerPage);
  }


  handleChangeRowsPerPage(event) {
    const rowsPerPage = parseInt(event.target.value, 10);
    this.setState({rowsPerPage:rowsPerPage});
    this.props.fetchCompanyList("",this.state.page,rowsPerPage);

  }
  handleChangePage(event,newPage) {
    this.setState({page:newPage});
    this.props.fetchCompanyList("",newPage,this.state.rowsPerPage);
  }

  componentDidMount(){
    if (this.props.location!=null && this.props.location.params!=null && this.props.location.params.page!=null )
    {
        this.setState({page: this.props.location.params.page});
        this.props.fetchCompanyList("",this.props.location.params.page,this.state.rowsPerPage);
    }
    else
    {
      this.props.fetchCompanyList("",0,this.state.rowsPerPage);
    }
    
  }

  handleSettingClick = (id) => ()  =>{
    this.setState(state => ({
      settingopen: !state.settingopen,
      id: id,
    }));
  }
  handleClickAway =() => {
    this.setState({
      settingopen: false,
    });
  }

  render() {
    const { classes,location} = this.props;
    const rowsPerPage = this.state.rowsPerPage;
    const page = this.state.page;
    const order ='desc';
    const {companylist,totalCount}= this.props.companyData;
    return (
        <Paper className={classes.root}>
          <EnhancedTableToolbar  location = {location}  handleChange ={this.handleChange.bind(this)}/>
          <div className={classes.tableWrapper}>
            <Table className={classes.table} size='small'>
              <EnhancedTableHead
                order={order}
                onRequestSort={this.handleRequestSort}
                rowCount={totalCount}
                headRows={headRows}
              />
              <TableBody  className={classes.tablebody}>
                {companylist && companylist.map(row => {
                  var disRatio = DISPLAY_SIZE / Math.max(row.imgwidth, row.imgheight);
                  return (
                  <TableRow key={row.id} className={classes.tablerow}>
                    <TableCell component="th" scope="row">
                    {row.name&&row.name.length >20?(row.name.substring(0,20) + ".."):row.name}
                    </TableCell>
                    <TableCell>
                      {row.companyDesc&&row.companyDesc.length >50?(row.companyDesc.substring(0,50) + ".."):row.companyDesc}
                    </TableCell>
                    <TableCell>
                      <img  style ={{ "height": row.imgheight * disRatio, "width": row.imgwidth * disRatio ,"margin":"1px 1px 1px 1px" }} src={row.logoSrc} />
                    </TableCell>
                    <TableCell>
                      <Typography>
                          <IconButton  id = {row.id} ref={child => row._child = child} onClick = {this.handleSettingClick(row.id)}>
                            <ArrowDropDownIcon/>
                          </IconButton>
                          <Popover
                              id = {row.id}
                              open={(this.state.id == row.id) && this.state.settingopen}
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
                              <Link to={{pathname: location.pathname+'/editcompany',params:{id:row.id,page:this.state.page}}}>
                                编辑<EditIcon/>
                              </Link>
                            </MenuItem>
                            <MenuItem>
                              <Link onClick = {this._showConfirmDeleteDialog(row).bind(this)}>
                                删除<DeleteIcon size="small"/>
                              </Link>
                            </MenuItem>
                            <MenuItem>
                              <Link onClick = {this._uprderRecord(row).bind(this)}>
                                上移<ArrowUpwardIcon size="small" />
                              </Link>
                            </MenuItem>
                            <MenuItem>
                              <Link onClick = {this._downOrderRecord(row).bind(this)}>
                                下移<ArrowDownwardIcon size="small" />
                              </Link>
                            </MenuItem>
                            {row.originOrder==null && (<MenuItem>
                              <Link onClick = {this._topOrderRecord(row).bind(this)}>
                                置顶<ArrowUpwardIcon size="small" />
                              </Link>
                            </MenuItem>)}
                            {row.originOrder && (<MenuItem>
                              <Link onClick = {this._cancelTopOrderRecord(row).bind(this)}>
                                取消置顶<ArrowDownwardIcon size="small" />
                              </Link>
                            </MenuItem>)}
                            <MenuItem>
                              <Link onClick = {this._lastOrderRecord(row).bind(this)}>
                                置底<ArrowDownwardIcon size="small" />
                              </Link>
                            </MenuItem>
                          </Popover>
                      </Typography>
                      {/* <Tooltip title="编辑">
                        <Link to={{pathname: location.pathname+'/editcompany',params:{company:row}}}>
                          <IconButton aria-label="edit" className = {classes.button}>
                            <EditIcon />
                          </IconButton>
                        </Link>
                      </Tooltip>
                      <Tooltip title="删除"> 
                        <IconButton  size="small" onClick = {this._showConfirmDeleteDialog(row).bind(this)}>
                            <DeleteIcon/>
                        </IconButton>
                      </Tooltip> */}
                    </TableCell>
                  </TableRow>
                )}
              )}

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
            <Dialog
                    open={this.state.showDeleteConfirmDialog}
                    keepMounted
                    onClose={this._handleCancelClose.bind(this)}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        是否删除该信息？
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this._handleConfirmClose} color="primary">
                        删除
                    </Button>
                    <Button onClick={this._handleCancelClose} color="primary">
                        取消
                    </Button>
                    </DialogActions>
                </Dialog>
          </div>
        </Paper>
    )
  }
}

const mapStateToProps = state =>({
  companyData: state.companyData
});

const mapDispatchToProps = {
  fetchCompanyList, deleteCompany,upOrderCompany,downOrderCompany,topOrderCompany,cancelTopOrderCompany,lastOrderCompany
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(CompanyManager));