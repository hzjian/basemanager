import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles,makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { fade } from '@material-ui/core/styles/colorManipulator';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
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
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import MessageIcon from '@material-ui/icons/Message';
import SettingsIcon from '@material-ui/icons/Settings';
import TableFooter from '@material-ui/core/TableFooter';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Tooltip from '@material-ui/core/Tooltip';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { EnhancedTableHead } from '../../utils/tablehead';
import {Link} from 'react-router-dom';
import {fetchBucketList, deleteBucket,downOrderBucket,upOrderBucket,topOrderBucket,cancelTopOrderBucket} from './actions';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

/**
 * 
 */
const DISPLAY_SIZE = 60;
const   headRows = [
  { id: 'title', sorting: false, label: '??????' },
  { id: 'content', sorting: false, label: '??????' },
  { id: 'image', sorting: false, label: '??????' },
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
  const { location ,type,handleChange} = props;
  const currentType = type&&type!=''?type:201;
  return (
    <Toolbar className={classes.root}>
      <div className={classes.search}>
          <FormControl className={classes.formControl}>
            <Select native defaultValue={201} id="grouped-native-select"
                value = { currentType }
                onChange={handleChange}>
              <option aria-label="None" value="" />
              <optgroup label="??????">
                <option value={201}>????????????</option>
                <option value={202}>????????????</option>
                <option value={203}>????????????</option>
                <option value={301}>????????????</option>
              </optgroup>
              <optgroup label="??????">
                <option value={302}>????????????</option>
                <option value={303}>????????????</option>
              </optgroup>
              <optgroup label="??????">
                <option value={204}>????????????</option>
              </optgroup>
            </Select>
          </FormControl>
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
          <Tooltip title="??????">
          <Link to={{pathname : location.pathname+'/addbucket',params:{ type : currentType}}}> 
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

class BucketManager extends Component {
  constructor(props)
  {
    super(props);
    this.state ={
      rowsPerPage:8,
      page:0,
      showDeleteConfirmDialog:false,
      delId:0,
      type:201,
      bucketlist:{},
      totalCount:0,
      settingopen:false,
      id:0
    }
  }

  _updateOrderRecord =(row) => (e) =>{
    this.setState({settingopen:false});
    this.props.upOrderBucket(row.id,this.state.type,'',this.state.page,this.state.rowsPerPage);
    
  }
  _downOrderRecord =(row) => (e) =>{
    this.setState({settingopen:false});
    this.props.downOrderBucket(row.id,this.state.type,'',this.state.page,this.state.rowsPerPage);
  }
  _topOrderRecord =(row) => (e) =>{
    this.setState({settingopen:false});
    this.props.topOrderBucket(row.id,this.state.type,'',this.state.page,this.state.rowsPerPage);
  }
  _cancelTopOrderRecord =(row) => (e) =>{
    this.setState({settingopen:false});
    this.props.cancelTopOrderBucket(row.id,this.state.type,'',this.state.page,this.state.rowsPerPage);
  }
  _showConfirmDeleteDialog = (row) =>(e)=>{
    this.setState({delId: row.id,showDeleteConfirmDialog:true});
  } 
  _handleCancelClose =() =>{
    this.setState({showDeleteConfirmDialog:false});
  }

  _handleConfirmClose =() =>{
      this.setState({showDeleteConfirmDialog:false});
      this.props.deleteBucket(this.state.delId,this.state.type,'',0,this.state.rowsPerPage);
  }

  handleChange = (event) =>{
    this.setState({type: event.target.value});
    this.props.fetchBucketList(event.target.value,'',0,this.state.rowsPerPage);
  }


  handleChangeRowsPerPage(event) {
    const rowsPerPage = parseInt(event.target.value, 10);
    this.setState({rowsPerPage:rowsPerPage});
    this.props.fetchBucketList(this.state.type,'',this.state.page,rowsPerPage);

  }
  handleChangePage(event,newPage) {
    this.setState({page:newPage});
    this.props.fetchBucketList(this.state.type,'',newPage,this.state.rowsPerPage);
  }

  componentDidMount(){
    if (this.props.location!=null && this.props.location.params!=null )
    {
      if( this.props.location.params.type!=null && this.props.location.params.page!=null)
      {
        this.setState({type: this.props.location.params.type,page: this.props.location.params.page});
        this.props.fetchBucketList(this.props.location.params.type,'',this.props.location.params.page,this.state.rowsPerPage);
      }
    }
    else
    {
      this.props.fetchBucketList(201,'',0,this.state.rowsPerPage);
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
    const {bucketlist,totalCount}= this.props.bucketData;
    const order ='desc';
    const currentType = location&&location.params&&location.params.type;

    //console.log(JSON.stringify(bucketlist));
    return (
        <Paper className={classes.root}>
          <EnhancedTableToolbar  location = {location} addUserToGroup = {this.handleAddUserToGroup}  type={this.state.type}  handleChange ={this.handleChange.bind(this)}/>
          <div className={classes.tableWrapper}>
            <Table className={classes.table} size='small'>
              <EnhancedTableHead
                order={order}
                onRequestSort={this.handleRequestSort}
                rowCount={totalCount}
                headRows={headRows}
              />
              <TableBody  className={classes.tablebody}>
                {bucketlist && bucketlist.map(row => {
                  var disRatio = DISPLAY_SIZE / Math.max(row.imgwidth, row.imgheight);
                  return (
                  //const ratio = row.
                  <TableRow key={row.id} className={classes.tablerow}>
                    <TableCell component="th" scope="row">
                    {row.title.length >20?(row.title.substring(0,20) + ".."):row.title}
                    </TableCell>
                    <TableCell>
                      {row.content&&(row.content.length >50?(row.content.substring(0,50) + ".."):row.content)}
                    </TableCell>
                    <TableCell>
                      <img  style ={{ "height": row.imgheight*disRatio, "width": row.imgwidth*disRatio,"margin":"1px 1px 1px 1px" }} src={row.image} />
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
                              <Link to={{pathname: location.pathname+'/editbucket',params:{id:row.id,type:this.state.type,page:this.state.page}}}>
                                ??????<EditIcon/>
                              </Link>
                            </MenuItem>
                            <MenuItem>
                              <Link onClick = {this._showConfirmDeleteDialog(row).bind(this)}>
                                ??????<DeleteIcon size="small"/>
                              </Link>
                            </MenuItem>
                            <MenuItem>
                              <Link onClick = {this._updateOrderRecord(row).bind(this)}>
                                ??????<ArrowUpwardIcon size="small" />
                              </Link>
                            </MenuItem>
                            <MenuItem>
                              <Link onClick = {this._downOrderRecord(row).bind(this)}>
                                ??????<ArrowDownwardIcon size="small" />
                              </Link>
                            </MenuItem>
                            {row.originOrder==null && (<MenuItem>
                              <Link onClick = {this._topOrderRecord(row).bind(this)}>
                                ??????<ArrowDownwardIcon size="small" />
                              </Link>
                            </MenuItem>)}
                            {row.originOrder && (<MenuItem>
                              <Link onClick = {this._cancelTopOrderRecord(row).bind(this)}>
                                ????????????<ArrowDownwardIcon size="small" />
                              </Link>
                            </MenuItem>)}
                          </Popover>
                      </Typography>
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
                    labelRowsPerPage= '????????????'
                    count={totalCount}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { 'aria-label': '????????????' },
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
                        ????????????????????????
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this._handleConfirmClose} color="primary">
                        ??????
                    </Button>
                    <Button onClick={this._handleCancelClose} color="primary">
                        ??????
                    </Button>
                    </DialogActions>
                </Dialog>
          </div>
        </Paper>
    )
  }
}

const mapStateToProps = state =>({
  bucketData: state.bucketData
});

const mapDispatchToProps = {
  fetchBucketList, deleteBucket,downOrderBucket,upOrderBucket,topOrderBucket,cancelTopOrderBucket
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(BucketManager));