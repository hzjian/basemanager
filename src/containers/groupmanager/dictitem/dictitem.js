import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { EnhancedTableHead } from '../../utils/tablehead';
import { fetchItemList  , addDictItem,deleteDictItem} from './actions';

const   headRows = [
  { id: 'fieldName',  sorting: true, label: '字典项' },
  { id: 'operation', sorting: false, label: '操作' },
];


const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    overflow: 'auto', 
    marginLeft: theme.spacing(1)
  },
  toolbar:{
    marginLeft: theme.spacing(2),
  },
  input:{
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    width: 'auto',
    padding: '10px 12px 10px,10px',
  },
  rankItemInput:{
    width: '100px'
  },
  tableWrapper:{
    marginLeft: theme.spacing(2),
  },
  table: {
    minWidth:650,
  },
  tablerow :{
    height: '10px',
  }
}); 

class DictItem extends Component {
  constructor(props)
  {
    super(props);
    this.state ={
      inputItem:'',
    }
  }
  handleItemNameChange = (event) =>{
    this.setState({ inputItem: event.target.value});
  }

  addItemClick = () =>{
    const { location } =  this.props;
    const dict  = location.params && location.params.dict;
    if(dict && dict.dictId)
    {
      this.props.addDictItem(dict.dictId,this.state.inputItem).then(()=>{
          this.props.fetchItemList(dict.dictId);
      });
    }
  }

  handleDeleteTaskAttr = (id) =>{
    const { location } =  this.props;
    const dict  = location.params && location.params.dict;
    if(dict && dict.dictId)
    {
      this.props.deleteDictItem(id).then( ()=>{
        this.props.fetchItemList(dict.dictId);
      });
    }
  }

  componentWillMount(){
    const { location } =  this.props;
    const dict  = location.params && location.params.dict;
    if(dict && dict.dictId)
    {
      this.props.fetchItemList(dict.dictId);
    }
  }
  render() {
    const { classes} = this.props;
    
    const rowsPerPage = this.state.rowsPerPage;
    const page = this.state.page;
    const {itemlist,totalCount}= this.props.dictItemData;
    const order ='desc';
    const selected =[]; 
    return (
        <Paper className={classes.root}>
          <div className={classes.toolbar}>
            <InputBase  
              className={classes.input}
              placeholder=""
              onChange={this.handleItemNameChange.bind(this)}
            />
            <IconButton color="primary" className={classes.iconButton} onClick= {this.addItemClick.bind(this)}>
              <AddCircleIcon />
            </IconButton>
          </div>
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
                {itemlist && itemlist.map(row => (
                  <TableRow key={row.id} className={classes.tablerow}>
                    <TableCell component="th" scope="row">
                      {row.dictItem}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick = {() => this.handleDeleteTaskAttr(row.id)}>
                        <DeleteIcon/>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}

              </TableBody>
            </Table>
          </div>
        </Paper>
    )
  }
}

const mapStateToProps = state =>({
  dictItemData: state.dictItemData
});

const mapDispatchToProps = {
  fetchItemList,
  addDictItem,
  deleteDictItem,
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(DictItem));