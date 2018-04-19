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
    callback(key) {
        console.log(key);
    }

    render() {
        // const { page, error, tasks, isFetching,geojson } = this.props;
        // const prevStyles = classNames("page-item", { disabled: page <= 1 });
        // const nextStyles = classNames("page-item", {
        //     disabled: tasks.length === 0
        // });
        return (
            <div>
                <Layout>
                    <Content class="content" >
                        <div>
                            <Tabs onChange={this.callback} type="card">
                                <TabPane tab="热门任务" key="1">
                                    <ul class="gammawork">
                                        <li class="">
                                            <div class="llist_workname"><span class="list_number">1</span><p>高铁站 </p><a href="#" class="work_open">打开</a><a href="#" class="work_link">查看</a></div>
                                            <p class="work_bewrite"> 前言 在上一篇文章，我们已经实现了React的组 前言 在上一篇文章，我们已经实现了React的组</p>
                                            <div class="work_author"><span class="wk_nm_photo">ka</span><span>kankangg</span><span>发布：2018-12-20</span><img src="imgs/workuser.png" /><span> 266参与</span></div>
                                        </li>
                                        <li class="">
                                            <div class="llist_workname"><span class="list_number">2</span><p>高铁站 </p><a href="#" class="work_open">打开</a><a href="#" class="work_link">查看</a></div>
                                            <p class="work_bewrite"> 前言 在上一篇文章，我们已经实现了React的组 前言 在上一篇文章，我们已经实现了React的组</p>
                                            <div class="work_author"><span class="wk_nm_photo">ka</span><span>kankangg</span><span>发布：2018-12-20</span><img src="imgs/workuser.png" /><span> 266参与</span></div>
                                        </li>
                                        <li class="">
                                            <div class="llist_workname"><span class="list_number">3</span><p>高铁站 </p><a href="#" class="work_open">打开</a><a href="#" class="work_link">查看</a></div>
                                            <p class="work_bewrite"> 前言 在上一篇文章，我们已经实现了React的组 前言 在上一篇文章，我们已经实现了React的组</p>
                                            <div class="work_author"><span class="wk_nm_photo">ka</span><span>kankangg</span><span>发布：2018-12-20</span><img src="imgs/workuser.png" /><span> 266参与</span></div>
                                        </li>
                                    </ul>
                                    <Pagination  total={50} pageSize={10} />
                                </TabPane>
                                <TabPane tab="最新任务" key="2">
                                    <ul class="gammawork">
                                        <li class="">
                                            <div class="llist_workname"><span class="list_number">1</span><p>高校数据采集 </p><a href="#" class="work_open">打开</a><a href="#" class="work_link">查看</a></div>
                                            <p class="work_bewrite"> 前言 在上一篇文章，我们已经实现了React的组 前言 在上一篇文章，我们已经实现了React的组</p>
                                            <div class="work_author"><span class="wk_nm_photo">ka</span><span>kankangg</span><span>发布：2018-12-20</span><img src="imgs/workuser.png" /><span> 266参与</span></div>
                                        </li>
                                        <li class="">
                                            <div class="llist_workname"><span class="list_number">2</span><p>景区数据采集</p><a href="#" class="work_open">打开</a><a href="#" class="work_link">查看</a></div>
                                            <p class="work_bewrite"> 前言 在上一篇文章，我们已经实现了React的组 前言 在上一篇文章，我们已经实现了React的组</p>
                                            <div class="work_author"><span class="wk_nm_photo">ka</span><span>kankangg</span><span>发布：2018-12-20</span><img src="imgs/workuser.png" /><span> 266参与</span></div>
                                        </li>
                                        <li class="">
                                            <div class="llist_workname"><span class="list_number">3</span><p>高铁站 </p><a href="#" class="work_open">打开</a><a href="#" class="work_link">查看</a></div>
                                            <p class="work_bewrite"> 前言 在上一篇文章，我们已经实现了React的组 前言 在上一篇文章，我们已经实现了React的组</p>
                                            <div class="work_author"><span class="wk_nm_photo">ka</span><span>kankangg</span><span>发布：2018-12-20</span><img src="imgs/workuser.png" /><span> 266参与</span></div>
                                        </li>
                                    </ul>
                                    <Pagination  total={50} pageSize={10} />
                                </TabPane>
                            </Tabs>
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
                                        <MapComponent style={{ marginLeft: 250,height: '80vh',width:'83%' }} id="map" />
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