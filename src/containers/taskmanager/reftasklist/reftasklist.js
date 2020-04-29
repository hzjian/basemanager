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
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import MessageIcon from '@material-ui/icons/Message';
import TableFooter from '@material-ui/core/TableFooter';

import {fetchToptasks } from './actions';

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}



const   headRows = [
  { id: 'taskName',  sorting: true, label: '任务名称' },
  { id: 'taskType', sorting: false, label: '对象类型' },
  { id: 'publisher', sorting: false, label: '发布者' },
  { id: 'createTime',  sorting: false, label: '创建时间' },
  { id: 'userNumber', sorting: false, label: '参与用户数' },
  { id: 'operation', sorting: false, label: '操作' },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };


  return (
    <TableHead>
      <TableRow>
        {headRows.map(row => (
          <TableCell
            key={row.id}
            padding='default'
            sortDirection={orderBy === row.id ? order : false}
          >
            {
              row.sorting?(<TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>):
            (<div>{row.label}</div>)
            }
            
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}


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
      width: 200,
    },
  },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();

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

class RefTaskList extends Component {
  state ={
    rowsPerPage:20,
    page:0,
    tag: 0
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
  componentWillMount(){
    this.props.fetchToptasks(1,'',this.state.page,this.state.rowsPerPage,'desc','taskName');
  }
  render() {
    const {classes,match} = this.props;
    const rowsPerPage = this.state.rowsPerPage;
    const page = this.state.page;
    const {tasklist,totalCount}= this.props.taskData;
    const order ='desc';
    const selected =[];
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, totalCount - page * rowsPerPage);
    return (
      <div className = {classes.root}>
        <Paper className={classes.root}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <div className={classes.tableWrapper}>
            <Table className={classes.table}>
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                onRequestSort={this.handleRequestSort}
                rowCount={totalCount}
              />
              <TableBody>
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
                      <IconButton>
                        <MessageIcon/>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}

                {emptyRows > 0 && (
                  <TableRow style={{ height: 48 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    colSpan={3}
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

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(RefTaskList));

