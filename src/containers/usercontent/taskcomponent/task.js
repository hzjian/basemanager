import React from "react";
import PropTypes from "prop-types";




const Task = ({ task }) => {
  const { taskName, geomLayername, user_name } = task;
 
  return (
    <li>
        {taskName}-{geomLayername}-{user_name}
     </li>
  );
};

Task.propTypes = {
  task: PropTypes.shape({
    login: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    html_url: PropTypes.string.isRequired
  }).isRequired
};

export default Task;
