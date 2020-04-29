import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { List,ListItem,Select,MenuItem} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import { ColorPicker } from '../../utils/colorpicker';
 
const polygonStyles = makeStyles({
  root: {
    width: '400px',
    borderRadius: '2px',
    marginLeft:'8px',
  },
  title: {
    padding: '4px 30px',
  },
  select: {
    padding: '1px 1px 1px 8px',
    width: '150px',
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

export const PolygonPicker = (props) =>{
  const classes = polygonStyles();
  const [ style, setStyle] = useState({
    fillColor:'rgba(255,255,255,0)',
    borderColor:'rgba(255,255,255,0)',
    borderSize:0,
    borderDash:0
  });
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
      <List>
        <ListItem className = {classes.listItem}>
          <FormControlLabel labelPlacement="start" control={<ColorPicker color={style.fillColor}  onChange ={handleColorChange('fillColor')}/>} label="填充颜色" />
        </ListItem>
        <ListItem className = {classes.listItem}>
          <FormControlLabel labelPlacement="start" control={<ColorPicker color={style.borderColor}  onChange ={handleColorChange('borderColor')}/>} label="边框颜色" />
        </ListItem>
        <ListItem>
          <FormControlLabel labelPlacement="start" control={
              <Grid className={classes.sliderpane} container spacing={2} alignItems="center">
                <Grid item xs>
                  <Slider className={classes.slider} step= {1}  min = {1} max = {30} value={ style.borderSize } onChange={handleSliderChange('borderSize')} aria-labelledby="input-slider" />
                </Grid>
                <Grid item>
                  <Input disableUnderline className={classes.input}
                    value={ style.borderSize } margin="dense"  onChange={handleOnChange('borderSize')}
                    inputProps={{ step: 1,min: 1,max: 30,type: 'number','aria-labelledby': 'input-slider',}}
                  />
                </Grid>
              </Grid>
            } label="边框宽度" />
        </ListItem>
        <ListItem className = {classes.listItem}>
            <FormControlLabel labelPlacement="start" control={
              <Select disableUnderline className={classes.select} 
                value={style.borderDash}
                onChange={handleOnChange('borderDash')}
                >
                <MenuItem value ='0'  > ————— </MenuItem>
                <MenuItem value ='10' > ---------------</MenuItem>
              </Select>
            } label="边框线型" />
        </ListItem>
      </List>
    </Paper>
  )
}