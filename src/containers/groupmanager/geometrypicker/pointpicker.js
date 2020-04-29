import React, { useState,useEffect } from 'react';
import { withStyles,makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { List,ListItem,Button,FormControl } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { ColorPicker } from '../../utils/colorpicker';
 
const pointStyles = makeStyles({
  root: {
    width: '400px',
    borderRadius: '2px',
    marginLeft:'8px',
  },
  title: {
    padding: '4px 30px',
  },
  imageselect: {
    padding: '4px 30px',
    width: '300px',
  },
  listItem :{
    width: '360px',
  },
  sliderpane:{
    width: '200px',
  },
  slider: {
    marginLeft: '12px',
  },
  input: {
    width: 42,
  },
});

export const PointPicker = (props) =>{
  const classes = pointStyles();
  const supportImageType = [
    'image/jpg',
    'image/jpeg',
    'image/png'
  ];
  const [ style, setStyle] = useState({
    type:'image',
    url:'',
    pointSize: 12,
    fillColor:'rgba(255,255,255,0)',
    borderColor:'rgba(255,255,255,0)',
    borderSize:1,
  });
  const verificationPicFile = (event)=>{
    if(event.target.files && event.target.files.length>0)
    {
      const file = event.target.files[0];
      const fileType = file.type;
      const isSupportType = supportImageType.indexOf(fileType) > -1;
      if (!isSupportType) {
        alert('格式不对，支持png,jpg图标');
        return;
      }
      const isLtSize = file.size / 1024 / 1024 <= 1;
      if (!isLtSize) {
        alert('文件太大，最大支持1MB');
        return;
      }
      if (isLtSize) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (e) => {
            var data = e.target.result;
            var image = new Image();
              image.onload=function(){
                  var width = image.width;
                  var height = image.height;
                  if (width < 500 && height < 500){
                    handleUrlChange(reader.result);
                  }else {
                      alert("文件尺寸应小于500！");
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

  const handleUrlChange = (value) =>
  {
    setStyle({...style, url: value});
    if(props.onChange)
    {
      props.onChange({...style, url: value});
    }
  }

  const handleTypeChange = (event) =>{
    if(event.target.value === 'vector')
    {
      setStyle({...style, type: event.target.value,url:''});
      if(props.onChange)
      {
        props.onChange({...style, type: event.target.value,url:''});
      }
    }
    else{
      setStyle({...style, type: event.target.value});
      if(props.onChange)
      {
        props.onChange({...style, type: event.target.value});
      }
    }
  }
  const handleColorChange = (name) =>(clr) =>
  {
    const color = `rgba(${clr.rgb.r}, ${clr.rgb.g}, ${clr.rgb.b}, ${clr.rgb.a})`;
    setStyle({...style,[name]: color});
    if(props.onChange)
    {
      props.onChange({...style,[name]: color});
    }
  }

  const handleSliderChange = (name) =>(event,value) =>
  {
    setStyle({...style, [name]: value});
    if(props.onChange)
    {
      props.onChange({...style, [name]: value});
    }
  }
  const handleOnChange = (name) =>(event) =>
  {
    setStyle({...style, [name]: event.target.value});
    if(props.onChange)
    {
      props.onChange({...style, [name]: event.target.value});
    }
  }

  useEffect(() => {
    if(props.style && style.fillColor ==="rgba(255,255,255,0)" )
    {
      setStyle(props.style);
    }
  },[props]);

  return (
    <Paper className = {classes.root}>
        <FormControl className ={classes.title}>
          <FormLabel component="legend">图标类型</FormLabel>
          <RadioGroup row
            aria-label="Gender"
            name="gender1"
            value={style.type}
            onChange={handleTypeChange}
            style={{marginTop: "5px"}}>
            <FormControlLabel value="image"  control={<Radio color="primary"/>} label="图片" />
            <FormControlLabel value="vector" control={<Radio color="primary"/>} label="矢量" />
          </RadioGroup>
        </FormControl>
        {
          (style.type === 'image') &&
          <FormControl className = {classes.imageselect}>
            <Input id ='upload-button-file' style={{'display':'none'}} disableUnderline type="file" name="filename" accept="image/x-png,image/gif,image/jpeg,image/bmp" placeholder="选取图片" title="选取"  onChange={verificationPicFile}/>
            <label htmlFor="upload-button-file">
              <Button variant="contained" component="span" className={classes.button}>
                上传
              </Button>
            </label>
            <img  style ={{ "height":"40px", "width":"40px","margin":"1px 1px 1px 20px" }} src={style.url}/>
          </FormControl>
        }
        {
          (style.type === 'vector') &&
          <div>
          <List>
            <ListItem className = {classes.listItem}>
              <FormControlLabel labelPlacement="start" control={<ColorPicker color={style.fillColor}  onChange ={handleColorChange('fillColor')}/>} label="填充颜色" />
            </ListItem>
            <ListItem>
              <FormControlLabel labelPlacement="start" control={
                  <Grid className={classes.sliderpane} container spacing={2} alignItems="center">
                    <Grid item xs>
                      <Slider className={classes.slider} step= {1}  min = {1} max = {30} value={ style.pointSize } onChange={handleSliderChange('pointSize')} aria-labelledby="input-slider" />
                    </Grid>
                    <Grid item>
                      <Input disableUnderline className={classes.input}
                        value={ style.pointSize } margin="dense"  onChange={handleOnChange('pointSize')}
                        inputProps={{ step: 1,min: 1,max: 30,type: 'number','aria-labelledby': 'input-slider',}}
                      />
                    </Grid>
                  </Grid>
                } label="填充大小" />
            </ListItem>
            <ListItem className = {classes.listItem}>
              <FormControlLabel labelPlacement="start" control={<ColorPicker color={style.borderColor} onChange ={handleColorChange('borderColor')}/>} label="边框颜色" />
            </ListItem>
            <ListItem>
              <FormControlLabel labelPlacement="start" control={
                  <Grid className={classes.sliderpane} container spacing={2} alignItems="center">
                    <Grid item xs>
                      <Slider  className={classes.slider} step= {1}  min = {1} max = {10} value={ style.borderSize } onChange={handleSliderChange('borderSize')} aria-labelledby="input-slider" />
                    </Grid>
                    <Grid item>
                      <Input disableUnderline className={classes.input}
                        value={ style.borderSize } margin="dense"  onChange={handleOnChange('borderSize')}
                        inputProps={{ step: 1,min: 1,max: 30,type: 'number','aria-labelledby': 'input-slider',}}
                      />
                    </Grid>
                  </Grid>
                } label="边框粗细" />
            </ListItem>
          </List>
          </div>
        }
    </Paper>
  )
}