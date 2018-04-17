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
import {
    invalidateMapsPage,
    selectMapsPage,
    fetchTopmapgeojsonIfNeeded, fetchTopmapgeojson
} from "../../actions/map";
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
        dispatch(fetchTopmapgeojson());
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.page !== this.props.page) {
            const { dispatch, page } = nextProps;
            // dispatch(fetchTopTasksIfNeeded(page));
            // dispatch(fetchTopmapgeojson());
        }
    }

    render() {
        const { page, error, tasks, isFetching,geojson } = this.props;
        const prevStyles = classNames("page-item", { disabled: page <= 1 });
        const nextStyles = classNames("page-item", {
            disabled: tasks.length === 0
        });
        return (
            <div className="container-fluid ">
                <div className="row">
                    <div>
                            <div class="card">
                                <div class="card-header">
                                    任务列表
                                    {tasks.length > 0 &&
                                    <ul className="list-group list-group-flush" style={{ opacity: isFetching ? 0.5 : 1 }}>
                                        {tasks.map(task => (
                                            <div key={task.name}>
                                                <Task key={task.name} task={task} />
                                            </div>
                                        ))}
                                    </ul>}
                                </div>
                                <nav aria-label="Page navigation example">
                                    <ul class="pagination">
                                        <li class="page-item">
                                            <a class="page-link" href="#" aria-label="Previous">
                                                <span aria-hidden="true">&laquo;</span>
                                                <span class="sr-only">Previous</span>
                                            </a>
                                        </li>
                                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                                        <li class="page-item">
                                            <a class="page-link" href="#" aria-label="Next">
                                                <span aria-hidden="true">&raquo;</span>
                                                <span class="sr-only">Next</span>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        <div class="card">
                            <div class="card-header">
                                任务列表
                            </div>
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" class="custom-control-input" id="customCheck1"/>
                                <label class="custom-control-label" for="customCheck1">影像地图</label>
                            </div>
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" class="custom-control-input" id="customCheck1"/>
                                <label class="custom-control-label" for="customCheck1">标注地图</label>
                            </div>
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" class="custom-control-input" id="customCheck1"/>
                                <label class="custom-control-label" for="customCheck1">平面地图</label>
                            </div>

                        </div>
                    </div>
                    <div className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                        <main role="main" >
                            <MapComponent id="map" geojsonarr={geojson}/>
                        </main>
                    </div>

                </div>
            </div>
        )
    }
}

// UserContentPage.propTypes = {
//   page: PropTypes.number.isRequired,
//   tasks: PropTypes.array.isRequired,
//   isFetching: PropTypes.bool.isRequired,
//   dispatch: PropTypes.func.isRequired,
//   error: PropTypes.object,
//     geojson: PropTypes.object.isRequired
// };

function mapStateToProps(state) {
    const { selectedUserTasksPage, userTasksByPage,selectedUserMapPage,userMapByPage } = state;
    const page = selectedUserMapPage || 1;
    if (!userTasksByPage || !userTasksByPage[page] ||!userMapByPage) {
        return {
            page,
            isFetching: false,
            didInvalidate: false,
            totalCount: 0,
            tasks: [],
            error: null,
            geojson:[]
        };
    }

    return {
        page,
        error: userTasksByPage[page].error,
        isFetching: userTasksByPage[page].isFetching,
        didInvalidate: userTasksByPage[page].didInvalidate,
        totalCount: userTasksByPage[page].totalCount,
        tasks: userTasksByPage[page].tasks,
        geojson:userMapByPage.geojson,

    };
}

export default connect(mapStateToProps)(UserContentPage);