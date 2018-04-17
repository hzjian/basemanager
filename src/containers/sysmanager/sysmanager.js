import React, { Component } from 'react'
import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Modal from 'react-modal';
import GroupItem from './groupitem/groupitem';
import EditgrpDialog from './editgroup/editgrpdialog'

import {
    invalidateGroupsPage,
    selectGroupsPage,
    fetchTopGroupsIfNeeded,
    editGroupsInfo,
  } from "../../actions/groups";


  

 class SysManager extends Component {
    constructor(props) {
        super(props);
        this.handleEditGroupEvent = this.handleEditGroupEvent.bind(this);
        // this.handleNextPageClick = this.handleNextPageClick.bind(this);
        // this.handlePreviousPageClick = this.handlePreviousPageClick.bind(this);
        // this.handleRefreshClick = this.handleRefreshClick.bind(this);
    }

    handleEditGroupEvent(e,group){
        const { dispatch } = this.props;
        dispatch(editGroupsInfo(group));

    }
    componentDidMount() {
        const { dispatch, page } = this.props;
        dispatch(fetchTopGroupsIfNeeded(page));
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.page !== this.props.page) {
            const { dispatch, page } = nextProps;
            dispatch(fetchTopGroupsIfNeeded(page));
        }
    }

    render() {
        const { page, error, groups, isFetching ,group,isShowingModal} = this.props;
        const prevStyles = classNames("page-item", { disabled: page <= 1 });
        const nextStyles = classNames("page-item", {
            disabled: groups.length === 0
        });
        return (
        <div className ="container">
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li className="nav-item">
                    <a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">
                        组织管理
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">
                        数据字典维护
                    </a>
                </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                    {groups.length > 0 &&
                            <table className ="table" style={{ opacity: isFetching ? 0.5 : 1 }}>
                            <thead>
                                <tr>
                                <th>名称</th>
                                <th>地址</th>
                                <th>电话</th>
                                <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            {groups.map(group => (
                                <tr key={group.groupName} className="col-md-4">
                                    <td>{group.groupName}</td>
                                    <td>{group.groupAddress}</td>
                                    <td>{group.groupPhone}</td>
                                    <td> <i className="fa fa-edit" onClick ={ (e) => this.handleEditGroupEvent(e,group) }></i> <i className="fa fa-trash"></i></td>
                                </tr>
                            ))}
                            </tbody>
                            </table>}
                </div>
                <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                数据字典维护
                </div>
            </div>
            <EditgrpDialog modalIsOpen = {isShowingModal} group ={group} />
        </div>
        )
    }
}


SysManager.propTypes = {
    page: PropTypes.number.isRequired,
    groups: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    error: PropTypes.object
  };
  
  function mapStateToProps(state) {
    const { selectedGroupsPage, groupsByPage,editGroupsInfo } = state;
    const page = selectedGroupsPage || 1;
  
    if (!groupsByPage || !groupsByPage[page]) {
      return {
        page,
        isFetching: false,
        didInvalidate: false,
        totalCount: 0,
        groups: [],
        error: null
      };
    }
  
    return {
      page,
      error: groupsByPage[page].error,
      isFetching: groupsByPage[page].isFetching,
      didInvalidate: groupsByPage[page].didInvalidate,
      totalCount: groupsByPage[page].totalCount,
      groups: groupsByPage[page].groups,
      group: editGroupsInfo.payload,
      isShowingModal: editGroupsInfo.isShowingModal
    };
  }
  
  export default connect(mapStateToProps)(SysManager);