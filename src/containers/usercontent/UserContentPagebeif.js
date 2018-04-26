import React, { Component } from 'react'
import classNames from "classnames";
import Task from './taskcomponent/task'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import antd from 'antd';
import { Layout,Pagination,Card} from 'antd';
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
const {Content  } = Layout;

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
        // dispatch(fetchTopmapgeojson());
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
            <div>
                <Layout>
                    <Content style={{ overflow: 'auto', height: '80vh',width:'30%',background: '#fff', position: 'fixed', left: 0 }}>
                        <div>
                            <Card title="属性信息"  style={{ width: '80%' }}>
                                    {tasks.length > 0 &&
                                    <ul  style={{ opacity: isFetching ? 0.5 : 1 }}>
                                        {tasks.map(task => (
                                            <div key={task.name}>
                                                <Task key={task.name} task={task} />
                                            </div>
                                        ))}
                                    </ul>}
                                <Pagination  total={50} pageSize={10} showTotal={total => `'共${total}条`}/>
                            </Card>
                            <div class="card">
                                <div class="card-header">
                                    图层信息
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
                    </Content>
                    <Layout style={{ marginLeft: 350}}>
                        <Content style={{ margin: '0px 0px 0', overflow: 'initial' }}>
                                <div>
                                    <main role="main" >
                                        <MapComponent style={{ marginLeft: 250,height: '80vh',width:'83%' }} id="map" geojsonarr={geojson}/>
                                    </main>
                                </div>
                        </Content>
                    </Layout>
                </Layout>
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