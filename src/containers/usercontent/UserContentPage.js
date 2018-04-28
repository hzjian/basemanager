import React, { Component } from 'react'
import classNames from "classnames";
import Task from './taskcomponent/task'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import antd from 'antd';
import { Layout,Pagination,Card,Tabs } from 'antd';
import MapComponent from './mapcomponent/MapComponent'
import "leaflet/dist/leaflet.css"
import "./usercontent.css"

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
const TabPane = Tabs.TabPane;
class UserContentPage extends Component {
    // constructor(props) {
    //     super(props);
    //     this.handleNextPageClick = this.handleNextPageClick.bind(this);
    //     this.handlePreviousPageClick = this.handlePreviousPageClick.bind(this);
    //     this.handleRefreshClick = this.handleRefreshClick.bind(this);
    // }

    componentDidMount() {
        const { dispatch, page } = this.props;
        dispatch(fetchTopTasksIfNeeded(0));
        // dispatch(fetchTopmapgeojson());
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.page !== this.props.page) {
            const { dispatch, page } = nextProps;
            // dispatch(fetchTopTasksIfNeeded(page));
            // dispatch(fetchTopmapgeojson());
        }
    }
    callback(key) {
        console.log(key);
    }

    render() {
        const { page, error, tasks, isFetching,geojson,drawdata } = this.props;
        const prevStyles = classNames("page-item", { disabled: page <= 1 });
        const nextStyles = classNames("page-item", {
            disabled: tasks.length === 0
        });
        return (
            <div>
                <Layout>
                    <Content class="content" >
                        <div>
                            <Tabs onChange={this.callback} type="card">
                                <TabPane tab="热门任务" key="1">
                                    {tasks.length > 0 &&
                                    <div  style={{ opacity: isFetching ? 0.5 : 1 }}>
                                        {tasks.map(task => (
                                            <div key={task.name}>
                                                <Task keyvalue={task.keyvalue} taskName={task.taskName} statDate={task.statDate} classId={task.classId} userName={task.userName}/>
                                            </div>
                                        ))}
                                    </div>}
                                    <div class="workpag">
                                        <Pagination  total={tasks.length} pageSize={10} />
                                    </div>
                                </TabPane>
                                <TabPane tab="最新任务" key="2">
                                    {tasks.length > 0 &&
                                    <div  style={{ opacity: isFetching ? 0.5 : 1 }}>
                                        {tasks.map(task => (
                                            <div key={task.name}>
                                                <Task key={task.name} taskName={task.taskName} geomLayername={task.geomLayername} userName={task.userName}/>
                                            </div>
                                        ))}
                                    </div>}
                                    <div class="workpag">
                                     <Pagination  total={30} pageSize={10} />
                                    </div>
                                </TabPane>
                            </Tabs>

                        </div>
                    </Content>
                    <div class="mapcontent">
                    <Layout >
                        <Content style={{ margin: '0px 0px 0', overflow: 'initial' }}>
                                <div>
                                    <main role="main" >
                                            <MapComponent  id="map" geojsonarr={geojson} drawdata={drawdata}/>
                                    </main>
                                </div>
                        </Content>
                    </Layout>
                    </div>
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
    const { selectedUserTasksPage, userTasksByPage,selectedUserMapPage,userMapByPage,drawAddMap } = state;
    const page =0 ;
    if (!userTasksByPage || !userTasksByPage[page] ||!userMapByPage || !drawAddMap) {
        return {
            page,
            isFetching: false,
            didInvalidate: false,
            totalCount: 0,
            tasks: [],
            error: null,
            geojson:[],
            drawdata:null
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
        drawdata:drawAddMap.drawdata

    };
}

export default connect(mapStateToProps)(UserContentPage);