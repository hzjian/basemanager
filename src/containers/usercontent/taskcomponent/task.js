import React from "react";
import PropTypes from "prop-types";
import  './task.css';
import  'bootstrap/dist/css/bootstrap.min.css'
import imglayer from '../imgs/Elevation_Layer_32.png';
import imgweb from '../imgs/czimg.png';


const Task = ({ task }) => {
  const { taskName, geomLayername, userName } = task;
 
  return (
      <li class="list-group-item">{taskName} <img src={imglayer} class="img-rounded"/><img src={imgweb} class="img-rounded"/></li>

  );
};

Task.propTypes = {
  task: PropTypes.shape({
    // login: PropTypes.string.isRequired,
    // avatar_url: PropTypes.string.isRequired,
    // url: PropTypes.string.isRequired,
    // html_url: PropTypes.string.isRequired
  }).isRequired
};

export default Task;
