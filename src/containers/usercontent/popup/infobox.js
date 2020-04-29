/**
 * 
 */
import React, {Component} from "react";
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import "leaflet-draw";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import BlockIcon from '@material-ui/icons/Block';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import * as moment from 'moment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import DatePicker from '@material-ui/core/TextField';
import Select  from '@material-ui/core/Select';
import MenuItem  from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import {
    closeInfoBox,
    saveAttributeValue,
    saveKernelFeature,
    deleteGeometory,
    saveKernelAnno
} from './actions';

const styles = theme => ({
    root: {
        width: '400px',
        height: '100%'
        },
    card: {
        maxWidth: 400,
        height: '100%'
    },
    content: {
        width: '100%',
        height: '100%'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: 'blue',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 300,
    },
    select:{
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 100,
    }
});
 
class InfoBox extends Component{
    constructor(props) {
        super(props);
        this.state= {
            update: false,
            editingGeom:false,
            showDeleteConfirmDialog:false,
            ///props
            data:null,
            fealist:null,
            attrlist:null,
            layerName:'',
            layerId:'',
            status:0,
            layer:null,
            anno:'',
            featureId:'',
            kernelId:'',
        }
    }

    _cardClickEvent = (e) =>{
        e.nativeEvent.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    }

    _closeInfoBox = () =>{
        this.props.closeInfoBox();
    }

    _editFeatureGeometry = () =>{
        //this.props.layer.editing.enable();
        this.props.layer.bringToFront();
        this.props.layer.eachLayer((sublayer) =>{
            if(sublayer){
                sublayer.unbindTooltip();
                sublayer.editing.enable();
            }
        });
        this.setState({editingGeom:true});

    }
    _blockEditingFeature = () =>{
        //this.props.layer.editing.disable();
        this.props.layer.eachLayer((sublayer) =>{
            if(sublayer){
                sublayer.editing.disable();
            }
        });
        this.setState({editingGeom:false});
    }
    _showConfirmDeleteDialog = () =>{
        this.setState({showDeleteConfirmDialog:true});
    }
    _deleteGeometory = () =>{
        //this.props.layer
        //this.props.options
        this.props.deleteGeometory(this.props.options.layerId,this.props.feaprops.id);
    }

    _handleCancelClose =() =>{
        this.setState({showDeleteConfirmDialog:false});
    }

    _handleConfirmClose =() =>{
        this.setState({showDeleteConfirmDialog:false});
        this._deleteGeometory();
    }
    _handleFeatureChange= (e)=>{
        this.setState({featureId:e.target.value});
        if(this.props.options && this.props.layer && this.props.feaprops)
        {
            this.props.saveKernelFeature(this.props.options.layerId,this.props.feaprops.id,e.target.value);
        }
    }
    _getFeatureStyle()
    {
        const { classes,fealist} = this.props;
        const  feaItemList = fealist.map((item) =>{
            return <MenuItem dense key= {item.id}  value={item.id}>
                {item.name} 
            </MenuItem>
        });
        return <Tooltip title="样式" placement="left-end">
                <Select className={classes.select} 
                    value={this.state.featureId}
                    onChange={this._handleFeatureChange}
                    >
                    <MenuItem dense value={0}>
                        空 
                    </MenuItem>
                    {feaItemList}
                </Select>
            </Tooltip>
    }

    _getEditIcon()
    {
        if(this.props.options.status ==='1')
        {
            if(this.state.editingGeom)
            {
                return  <Typography>
                            {this._getFeatureStyle()}
                            <Tooltip title="停止编辑">
                                <IconButton size="small" aria-label="Add to favorites" onClick ={this._blockEditingFeature.bind(this)}>
                                    <BlockIcon/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="删除"> 
                                <IconButton  size="small" onClick = {this._showConfirmDeleteDialog.bind(this)}>
                                    <DeleteIcon/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="关闭">
                                <IconButton  size="small" onClick = {this._closeInfoBox.bind(this)}>
                                    <CloseIcon />
                                </IconButton>
                            </Tooltip>   
                        </Typography>
            }
            else
            {
                return  <Typography>
                        {this._getFeatureStyle()}
                        <Tooltip title="编辑">
                            <IconButton size="small" aria-label="Add to favorites" onClick ={this._editFeatureGeometry.bind(this)}>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="删除"> 
                            <IconButton  size="small" onClick = {this._showConfirmDeleteDialog.bind(this)}>
                                <DeleteIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="关闭">
                            <IconButton  size="small" onClick = {this._closeInfoBox.bind(this)}>
                                <CloseIcon />
                            </IconButton>
                        </Tooltip>   
                    </Typography>
            }   
        }
        else{
            return <Typography>
                        <Tooltip title="关闭">
                        <IconButton  size="small" onClick = {this._closeInfoBox.bind(this)}>
                            <CloseIcon />
                        </IconButton>
                        </Tooltip>
                    </Typography>
        }   
    }

    _handleAnnoChange = (e) =>{
        //this.props.layer.feature && this.props.layer.feature.properties && (this.props.layer.feature.properties.anno = e.target.value);
        if(this.props.options && this.props.layer && this.props.feaprops)
        {
            this.setState({anno: e.target.value});
            this.props.saveKernelAnno(this.props.options.layerId,this.props.feaprops.id,e.target.value);
        }
    }
    
    //<input onChange={ (e) => onChange(e.target.value)}
    _handleChange = (item) => (e) =>{
        e.stopPropagation();
        e.preventDefault();
        e.returnValue=false;
        let tValue = null;
        if(item.attrType === 'DATETIME')
        {
            tValue = e.target.value + ' 00:00:00';
        }
        else
        {
            tValue = e.target.value;
        }
        this.props.data.map((attrItem)  =>{
            if(item.attrId === attrItem.attrId )
            {
                attrItem.attrValue[0] = {value: tValue};
            }
            return attrItem;
        });

        this.setState({update: 'true'});
        this.props.saveAttributeValue(this.props.options.layerId,this.props.feaprops.id,item.attrId,tValue );
        return false;
    }

    /**
     *  attrFgrade: "NORMAL"
        attrId: "e1d054af-8c73-480d-9abb-687a2e5ba01a"
        attrIsedit: 1
        attrName: "名称"
        attrSeq: 2
        attrType: "STRING"
        dictId: null
        rankId: null
        shareGrade: "GROUP"
     */
    _createAttrItem = (item,valueList,status) =>{
        //STRING,INTEGER,DOUBLE,DATETIME

        // attrId: "e1d054af-8c73-480d-9abb-687a2e5ba01a"
        // attrName: "名称"
        // attrValue: []
        const { classes } = this.props;
        let disabled = false;

        if(status === 0)
            disabled = true;
        let resultList = valueList.filter((attr) =>{
            return attr.attrId === item.attrId;
        });

        let initAttrValue = '';
        if(resultList[0].attrValue && resultList[0].attrValue.length>0 && resultList[0].attrValue[0].value )
        {
            initAttrValue = resultList[0].attrValue[0].value;
        }

        if(item.attrType === 'INTEGER' || item.attrType === 'DOUBLE')
        {
            return <TextField
                    id={item.attrId}
                    key={item.attrId}
                    label= {item.attrName}
                    disabled = {disabled}
                    className={classes.textField}
                    value={initAttrValue}
                    onChange={this._handleChange(item).bind(this)}
                    type="number"
                    margin="none"
                    />
        }
        else if(item.attrType === 'STRING')
        {
            return <TextField
                    id={item.attrId}
                    key={item.attrId}
                    label= {item.attrName}
                    disabled = {disabled}
                    className={classes.textField}
                    value={initAttrValue}
                    onChange={this._handleChange(item).bind(this)}
                    margin="none"
                    />
        }
        else if(item.attrType === 'DATETIME')
        {
            initAttrValue = moment(initAttrValue).format("YYYY-MM-DD");
            return <DatePicker
                    id={item.attrId}
                    key={item.attrId}
                    label={item.attrName}
                    disabled = {disabled}
                    type="date"
                    className={classes.textField}
                    value={initAttrValue}
                    onChange={this._handleChange(item).bind(this)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    />
        }
        else
        {
            return <TextField
                    id={item.attrId}
                    key={item.attrId}
                    label= {item.attrName}
                    disabled = {disabled}
                    className={classes.textField}
                    value={initAttrValue}
                    onChange={this._handleChange(item).bind(this)}
                    margin="none"
                    />
        }
    }

    _createAttrList = (attrList,valueList,status)  =>{
        return attrList.map((item) =>{
            return this._createAttrItem(item,valueList,status);
        });
    }


    static getDerivedStateFromProps(nextProps, prevState) {
          if(nextProps.data && nextProps.options && nextProps.layer 
            && nextProps.layer.feature && nextProps.feaprops)
          {
              if(prevState.kernelId != nextProps.feaprops.id)
              {
                return {update: false,
                        editingGeom:false,
                        showDeleteConfirmDialog:false,
                        ///props
                        data:nextProps.data,
                        fealist:nextProps.fealist,
                        attrlist:nextProps.options.attrlist,
                        layerName:nextProps.options.layerName,
                        layerId:nextProps.options.layerId,
                        status:nextProps.options.status,
                        layer:nextProps.layer,
                        anno:nextProps.feaprops.anno,
                        featureId:nextProps.feaprops.featureId,
                        kernelId:nextProps.feaprops.id
                    };
              }
          }
          return null;
    }

    render(){
        const { classes } = this.props;
        console.log(this.state);

        return (
            <div className={classes.root} >
                <Card className={classes.card}  >
                    <CardHeader
                    avatar={
                        <Avatar aria-label="Recipe" className={classes.avatar}>
                        i
                        </Avatar>
                    }
                    action= {this._getEditIcon()}
                    title={this.props.layer && this.props.options && this.props.options.layerName}
                    subheader= {moment().format("hh:mm:ss")}
                    />
                    <CardContent>
                        <List>
                                <TextField
                                    id={this.props.feaprops.id}
                                    label= "标注"
                                    className={classes.textField}
                                    value={this.state.anno||""}
                                    onChange={this._handleAnnoChange.bind(this)}
                                    margin="none"
                                />
                            {this.props.options.attrlist && this._createAttrList(this.props.options.attrlist,this.props.data,this.props.options.status)}
                        </List>
                    </CardContent>
                </Card>
                <Dialog
                    open={this.state.showDeleteConfirmDialog}
                    keepMounted
                    onClose={this._handleCancelClose.bind(this)}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        是否删除该对象图形及所有属性信息？
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this._handleConfirmClose.bind(this)} color="primary">
                        删除
                    </Button>
                    <Button onClick={this._handleCancelClose.bind(this)} color="primary">
                        取消
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    data: state.infoData.propsdata,
    options: state.infoData.options,
    feaprops:state.infoData.feaprops,
    layer:state.infoData.layer,
    fealist:state.infoData.fealist
});

const mapDispatchToProps = {
    closeInfoBox,
    saveAttributeValue,
    saveKernelFeature,
    deleteGeometory,
    saveKernelAnno
};

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(InfoBox));