import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { TextField,Typography,List,ListItem , Button,InputLabel,Select,
          FormControl,Input } from '@material-ui/core';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';          
import { addCompany,getCompany } from './actions';

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


class EditCompany extends Component {

  constructor(props)
  {
    super(props);
    this.state ={
      id:'',
      name:'',
      companyDesc:'',
      logoSrc:'',
      logoThumbnail:'',
      imgwidth:0,
      imgheight:0,
      page:0,
      disRatio:1
      }
  }
  
  handleChange = (name) =>(event) =>{
    this.setState({
      [name] : event.target.value,
    });
  }

  addDataHandle = () => {
      this.props.addCompany(this.state.id,this.state.name,this.state.companyDesc,this.state.logoSrc,this.state.logoThumbnail,this.state.imgwidth,this.state.imgheight).then(()=>{
        this.props.history.push({pathname:'/sysmanager/companymgr',params:{page:this.state.page}});
      });
  }

  cancelSaveHandle =() =>{
    this.props.history.push({pathname:'/sysmanager/companymgr',params:{page:this.state.page}});
  }

  generateThumbnail = (file, boundBox) =>{
    if (!boundBox || boundBox.length != 2){
      throw "You need to give the boundBox"
    }
    var scaleRatio = Math.min(...boundBox) / Math.max(file.width, file.height)
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

  componentDidMount() 
  {
    if(this.props.location!=null && this.props.location.params!=null && this.props.location.params.id!=null)
    {
      this.setState({id:this.props.location.params.id});
      this.props.getCompany(this.props.location.params.id).then(() =>{
        if(this.props.editCompanyData && this.props.editCompanyData.companyData)
        {
          this.setState({...this.props.editCompanyData.companyData});
        }
      });
    }
    if(this.props.location!=null && this.props.location.params!=null && this.props.location.params.page!=null)
    {
      this.setState({page:this.props.location.params.page});
    }

  }

  handleUrlChange = (value) =>
  {
    if(this.props.location && this.props.location.params && this.props.location.params.company)
    {
      this.props.location.params.company.logoSrc= value;
    }
    this.setState({logoSrc: value});
  }
  verificationPicFile = (event)=>{
    if(event.target.files && event.target.files.length>0)
    {
      const file = event.target.files[0];
      const fileType = file.type;
      const isSupportType = supportImageType.indexOf(fileType) > -1;
      if (!isSupportType) {
        alert('格式不对，支持png,jpg图标');
        return;
      }
      const isLtSize = file.size / 1024 / 1024 <= 2;
      if (!isLtSize) {
        alert('文件太大，最大支持2MB');
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
                  if (width < 2048 && height < 2048){
                    const thumbnail = this.generateThumbnail(file,[120, 120]);
                    var disRatio = DISPLAY_SIZE / Math.max(width, height);
                    thumbnail.then((data) => {
                      this.setState({logoThumbnail: data,imgwidth: width, imgheight: height,disRatio:disRatio});
                      console.log(data);
                    });
                    this.handleUrlChange(reader.result);
                  }else {

                      alert("文件尺寸应小于2048！");
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
    return (
      <Paper className={classes.root}>
        <List>
            <ListItem>
                <TextField id="standard-name"  multiline  rows={3} label="公司名称" className={classes.textField} value={this.state.name}
                    onChange={this.handleChange('name').bind(this)}  margin="dense" variant="outlined"/>
            </ListItem>
            
            <ListItem>
                <TextField id="standard-content"  multiline  rows={10} label="公司介绍" className={classes.textContent} value={this.state.companyDesc}
                    onChange={this.handleChange('companyDesc').bind(this)}  margin="dense" variant="outlined"/>
            </ListItem>
            <ListItem>
              <Typography>
                <Input id ='upload-button-file' style={{'display':'none'}} disableUnderline type="file" name="filename" accept="image/*" placeholder="选取图片" title="选取"  onChange={this.verificationPicFile.bind(this)}/>
                <label htmlFor="upload-button-file">
                  <Button variant="contained" component="span" className={classes.button}>
                    LOGO上传
                  </Button>
                </label>
                <img  style ={{ "height": this.state.imgheight * this.state.disRatio, "width":this.state.imgwidth * this.state.disRatio,"margin":"1px 1px 1px 1px" }} src={this.state.logoSrc} onLoad = {this.imageLoad.bind()}/>
              </Typography>
            </ListItem>
            <ListItem>
                <Typography>
                    <Button variant="contained" size="large" color="primary" className={classes.button} onClick= {this.addDataHandle.bind(this)}>
                        确定
                    </Button>
                    <Button variant="contained" size="large" color="primary" className={classes.button} onClick= {this.cancelSaveHandle.bind(this)}>
                        取消
                    </Button>
                </Typography>
            </ListItem>
        </List>
      </Paper>
    )
  }
}

const mapStateToProps = (state) =>({
  editCompanyData: state.editCompanyData
});

const mapDispatchToProps = {
  addCompany,
  getCompany,
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(EditCompany));