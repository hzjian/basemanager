import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { TextField,Typography,List,ListItem , Button,InputLabel,Select,
          FormControl,Input } from '@material-ui/core';

import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';          
import { addBucket,getBucket } from './actions';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import {server as serverUrl} from '../../../app.json';

import FroalaEditorComponent from 'react-froala-wysiwyg';
//Import all Froala Editor plugins;
import 'froala-editor/js/plugins.pkgd.min.js';

const DISPLAY_SIZE = 400;
const styles = theme => ({
  root: {
      width: '100%',
      height: '100%',
      overflow: 'auto', 
    },
    rankItemInput:{
      width: '100px'
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '80%',
      height: '20%',
    },
    textContent: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '80%',
      height: '50%',
    },
    formControl:{
      margin: theme.spacing(1),
      minWidth: 500,
    },
    select: {
      marginTop: theme.spacing(2),
    },
    button: {
      margin: theme.spacing(2),
    },
});

const supportImageType = [
    'image/jpg',
    'image/jpeg',
    'image/png'
];

class EditBucket extends Component {

  constructor(props)
  {
    super(props);
    this.state ={
        id:'',
        type:'',
        title:'',
        image:'',
        content:'',
        thumbnail:'',
        imgwidth:0,
        imgheight:0,
        page:0,
        disRatio:1,
        htmlcontent:''
      }
  }

  handleChange = (name) =>(event) =>{
    this.setState({
      [name] : event.target.value,
    });
  }
  addDataHandle = () => {
      this.props.addBucket(this.state.id,this.state.type,this.state.title,this.state.content,this.state.image,this.state.thumbnail,this.state.imgwidth,this.state.imgheight).then(()=>{
        this.props.history.push({pathname:'/sysmanager/bucketmgr',params:{type:this.state.type,page:this.state.page}});
      });
  }

  cancelSaveHandle =() =>{
    this.props.history.push({pathname:'/sysmanager/bucketmgr',params:{type:this.state.type,page:this.state.page}});
  }

  generateThumbnail = (file, boundBox) =>{
    if (!boundBox || boundBox.length != 2){
      throw "You need to give the boundBox"
    }
    var reader = new FileReader();
    var canvas = document.createElement("canvas")
    var ctx = canvas.getContext('2d');
    return new Promise((resolve, reject) => {
      reader.readAsDataURL(file);
      reader.onload = function(event){
          var img = new Image();
          img.src = event.target.result;
          img.onload = function(){
              var scaleRatio = Math.min(...boundBox) / Math.max(img.width, img.height)
              let w = img.width*scaleRatio
              let h = img.height*scaleRatio
              canvas.width = w;
              canvas.height = h;
              ctx.drawImage(img, 0, 0, w, h);
              return resolve(canvas.toDataURL(file.type))
          }
      }
    });
  }

  componentDidMount() 
  {
    if(this.props.location!=null && this.props.location.params!=null )
    {
      if( this.props.location.params.id!=null)
      {
        this.setState({id: this.props.location.params.id});
        this.props.getBucket(this.props.location.params.id,this.props.location.params.type).then(() =>{
          if(this.props.editBucketData && this.props.editBucketData.bktData)
          {
            this.setState({...this.props.editBucketData.bktData});
          }
        });
      }
      if ( this.props.location.params.type!=null)
      {
        this.setState({type: this.props.location.params.type});
      }
      if ( this.props.location.params.page!=null)
      {
        this.setState({page: this.props.location.params.page});
      }
    }
  }

  handleModelChange = (value) =>{
    console.log(value);
    this.setState({htmlcontent:value});
    // const tmpDiv = <div dangerouslySetInnerHTML={value}></div>;
    // ReactDOM.render(tmpDiv,document.getElementById("htmlcontent"))
  }

  handleUrlChange = (value) =>
  {
    if(this.props.location!=null && this.props.location.params!=null && this.props.location.params.bucket!=null)
    {
      this.props.location.params.bucket.image= value;
    }
    this.setState({image: value});
  }
  imageLoad =(e) =>{
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext('2d');
    console.log(e.target.width+" "+e.target.height);
    //naturalHeight: 450
    //naturalWidth: 600
    var scaleRatio = 120 / Math.max(e.target.naturalWidth, e.target.naturalHeight);
    var disRatio = DISPLAY_SIZE / Math.max(e.target.naturalWidth, e.target.naturalHeight);
    let w = e.target.naturalWidth*scaleRatio
    let h = e.target.naturalHeight*scaleRatio
    canvas.width = w;
    canvas.height = h;
    ctx.drawImage(e.target, 0, 0, w, h);
    
    this.setState({thumbnail: canvas.toDataURL("image/jpeg"),imgwidth: e.target.naturalWidth, imgheight: e.target.naturalHeight,disRatio:disRatio});
  };

  verificationPicFile = (event)=>{
    if(event.target.files && event.target.files.length>0)
    {
      const file = event.target.files[0];
      const fileType = file.type;
      const isSupportType = supportImageType.indexOf(fileType) > -1;
      if (!isSupportType) {
        alert('?????????????????????png,jpg??????');
        return;
      }
      const isLtSize = file.size / 1024 / 1024 <= 4;
      if (!isLtSize) {
        alert('???????????????????????????4MB');
        return;
      }
      if (isLtSize) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (e) => {
            var data = e.target.result;
            var image = new Image();
              image.onload =()=>{
                  var width = image.width;
                  var height = image.height;
                  if (width < 4096 && height < 4096){
                    const thumbnail = this.generateThumbnail(file,[120, 120]);
                    var disRatio = DISPLAY_SIZE / Math.max(image.width,image.height);
                    thumbnail.then((data) => {
                      this.setState({thumbnail: data,imgwidth: width, imgheight: height,disRatio:disRatio });
                      console.log(data);
                    });
                    this.handleUrlChange(reader.result);
                  }else {
                      alert("?????????????????????4096???");
                      file.value = "";
                      return false;
                  }
              };
              image.src= data;
          }
      }
    }
    return false;
  }

  render() {
    const {classes} = this.props;
    this.config ={
      height:800,
      width:450,
      autofocus: true,
      toolbarButtonsXS: ['undo', 'redo', '|', 'bold', 'italic', 'underline', '|', 'fontSize', 'align', 'color'],
      language: 'zh_cn',
      colorsHEXInput: false,
      colorsBackground: ['#2E2E2E', '#767676', '#DF281B', '#F4821C', '#46AC43', '#2E5BF7', '#A249B3', 'REMOVE'],
      colorsText: ['#2E2E2E', '#767676', '#DF281B', '#F4821C', '#46AC43', '#2E5BF7', '#A249B3', 'REMOVE'],
      fontSize: ['14', '16', '18', '20'],
      fontSizeDefaultSelection: '16',
      htmlAllowComments: false,
      pasteAllowedStyleProps: ['font-size', 'color'],
      placeholderText: '???????????????',
      charCounterMax: 500,
      imageInsertButtons: [
      "imageUpload",	//????????????
      "imageByURL"	//URL??????
      ],
      //??????????????????
      videoInsertButtons: [
        "videoByURL",	//URL??????
        "videoEmbed",	//????????????
        "videoUpload"	//????????????
      ],
      imageMaxSize: 5 * 1024 * 1024,
      // Allow to upload PNG and JPG.
      imageAllowedTypes: ['jpeg', 'jpg', 'png'],
      imageUploadMethod: 'POST',
      imageUploadParam: 'file',
      imageUploadURL: serverUrl + "/api/admin/upload/image",
      imageUploadParams: {
        id: this.state.id,
        type:  this.state.type
      }
      
    };
    return (
    <form>
      <Paper className={classes.root}>
        <List>
            <ListItem>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="grouped-native-select">??????</InputLabel>
                <Select native id="grouped-native-select" defaultValue ={201}
                    value = { this.state.type }
                    onChange={this.handleChange('type').bind(this)}>
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
            </ListItem>
            <ListItem>
                <TextField id="standard-name"  multiline  rows={3} label="??????" className={classes.textField} value={this.state.title}
                    onChange={this.handleChange('title').bind(this)}  margin="dense" variant="outlined"/>
            </ListItem>
            <ListItem>
                <TextField id="standard-content"  multiline  rows={10} label="??????" className={classes.textContent} value={this.state.content}
                    onChange={this.handleChange('content').bind(this)}  margin="dense" variant="outlined"/>
            </ListItem>
            <ListItem>
              <Typography>
                <Input id ='upload-button-file' style={{'display':'none'}} disableUnderline type="file" name="filename" accept="image/*" placeholder="????????????" title="??????"  onChange={this.verificationPicFile.bind(this)}/>
                <label htmlFor="upload-button-file">
                  <Button variant="contained" component="span" className={classes.button}>
                    ????????????
                  </Button>
                </label>
                <img  style ={{ "height": this.state.imgheight * this.state.disRatio, "width":this.state.imgwidth * this.state.disRatio,"margin":"1px 1px 1px 20px" }} src={this.state.image} onLoad={this.imageLoad.bind(this)} />
              </Typography>
            </ListItem>
            <ListItem>
              <FroalaEditorComponent
                  config = {this.config}
                  model={this.state.htmlcontent}
                  
                  onModelChange={this.handleModelChange}
                />
            </ListItem>
            <ListItem>
              <div dangerouslySetInnerHTML={{__html:this.state.htmlcontent}}></div>
            </ListItem>
            <ListItem>
                <Typography>
                    <Button variant="contained" size="large" color="primary" className={classes.button} onClick= {this.addDataHandle.bind(this)}>
                        ??????
                    </Button>
                    <Button variant="contained" size="large" color="primary" className={classes.button} onClick= {this.cancelSaveHandle.bind(this)}>
                        ??????
                    </Button>
                </Typography>
            </ListItem>
        </List>
      </Paper>
    </form>  
    )
  }
}

const mapStateToProps = (state) =>({
  editBucketData: state.editBucketData
});

const mapDispatchToProps = {
  getBucket,
  addBucket,
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(EditBucket));