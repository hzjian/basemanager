import React, {useState ,useEffect } from 'react';
import { SketchPicker } from 'react-color';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';

const useStyles = makeStyles({
  color: {
    width: '36px',
    height: '14px',
    borderRadius: '2px',
  },
  swatch: {
    marginLeft: '8px',
    padding: '5px',
    background: '#fff',
    borderRadius: '1px',
    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
    display: 'inline-block',
    cursor: 'pointer',
  },
});

export const ColorPicker = (props) =>{
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [color, setColor] = useState('rgba(241,112,19,1)');
  const handleClick =(event) =>{
    setAnchorEl(event.currentTarget);
  }
  const handleClickAway =() =>
  {
    setAnchorEl(null)
  }
  const handleChange  = (color) =>
  {
    setColor(color.rgb);
    props.onChange(color);
  }
  const open = Boolean(anchorEl);
  const colorStyle = {
    width: '160px',
    height: '10px',
    borderRadius: '2px',
    background:color,
    //background: `rgba(${color.r }, ${ color.g }, ${color.b }, ${color.a })`,
  }

  useEffect(() => {
    if(props.color)
    {
      setColor(props.color);
    }
  },[ props ]);
  return (
    <React.Fragment>
      <div className={classes.swatch} onClick={handleClick }>
        <div style={ colorStyle } />
      </div>
      <Popover
        open={open}
        anchorEl= {anchorEl}
        onClose={handleClickAway}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handleClickAway}
        >
          <SketchPicker color = {color}  onChange = {handleChange}/>                   
      </Popover>
    </React.Fragment>
  )
}