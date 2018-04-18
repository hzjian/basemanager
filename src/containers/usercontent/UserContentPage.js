import React, { Component } from 'react'
import classNames from "classnames";
import Task from './taskcomponent/task'
import PropTypes from "prop-types";
import { connect } from "react-redux";

import MapComponent from './mapcomponent/MapComponent'
import "leaflet/dist/leaflet.css"

import {
  invalidateTasksPage,
  selectTasksPage,
  fetchTopTasksIfNeeded
} from "../../actions/usertask";
class UserContentPage extends Component {
  constructor(props) {
    super(props);
    // this.handleNextPageClick = this.handleNextPageClick.bind(this);
    // this.handlePreviousPageClick = this.handlePreviousPageClick.bind(this);
    // this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
    const { dispatch, page } = this.props;
    dispatch(fetchTopTasksIfNeeded(page));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.page !== this.props.page) {
      const { dispatch, page } = nextProps;
      dispatch(fetchTopTasksIfNeeded(page));
    }
  }
   
  render() {
    const { page, error, tasks, isFetching } = this.props;
    const prevStyles = classNames("page-item", { disabled: page <= 1 });
    const nextStyles = classNames("page-item", {
      disabled: tasks.length === 0
    });
    return (
      <div className="container-fluid ">
      <div className="row">
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
          <div>任务列表
              {tasks.length > 0 &&
              <ul style={{ opacity: isFetching ? 0.5 : 1 }}>
              {tasks.map(task => (
                <div key={task.name} className="col-md-4">
                  <Task key={task.name} task={task} />
                </div>
              ))}
              </ul>}
          </div>
        </nav>

        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
          <MapComponent />
        </main>
      </div>
    </div>
    )
  }
}

UserContentPage.propTypes = {
  page: PropTypes.number.isRequired,
  tasks: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.object
};

function mapStateToProps(state) {
  const { selectedUserTasksPage, userTasksByPage } = state;
  const page = selectedUserTasksPage || 1;

  if (!userTasksByPage || !userTasksByPage[page]) {
    return {
      page,
      isFetching: false,
      didInvalidate: false,
      totalCount: 0,
      tasks: [],
      error: null
    };
  }

  return {
    page,
    error: userTasksByPage[page].error,
    isFetching: userTasksByPage[page].isFetching,
    didInvalidate: userTasksByPage[page].didInvalidate,
    totalCount: userTasksByPage[page].totalCount,
    tasks: userTasksByPage[page].tasks
  };
}

export default connect(mapStateToProps)(UserContentPage);