import React from "react";
import PropTypes from "prop-types";
import  './task.css';
import  'bootstrap/dist/css/bootstrap.min.css'
import imglayer from '../imgs/Elevation_Layer_32.png';
import imgweb from '../imgs/czimg.png';
import imgauthor from '../imgs/workuser.png';

const Task = ({ task }) => {
  const { taskName, geomLayername, userName } = task;
 
  return (
      <div class="listli">
          <div class="llist_workname"><span class="list_number">1</span><p>{taskName} </p><a href="#" class="work_link">查看</a><a href="#" class="work_open">打开</a></div>

          <p class="work_bewrite"> 前言 在上一篇文章，我们已经实现了React的组 前言 在上一篇文章，我们已经实现了React的组</p>
          <div class="work_author"><span class="wk_nm_photo">ka</span><span>kankangg</span><span>发布：2018-12-20</span><img src={imgauthor} /><span> 266</span></div>
      </div>

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
