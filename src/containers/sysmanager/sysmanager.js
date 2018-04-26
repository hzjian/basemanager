import React, { Component } from 'react'
import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Modal from 'react-modal';
import GroupItem from './groupmgr/groupitem/groupitem';
import EditDialog from './groupmgr/editgroup/editdialog'

import {
    fetchTopGroupsIfNeeded,
    editGroupsInfo,
    deleteGroup,
    addNewGroup
  } from "./actions/groupAction";

 class SysManager extends Component {
    constructor(props) {
        super(props);
        this.handleEditGroupEvent = this.handleEditGroupEvent.bind(this);
        this.handleDeleteGroupEvent = this.handleDeleteGroupEvent.bind(this);
        this.handleAddGroupEvent = this.handleAddGroupEvent.bind(this);
        // this.handleNextPageClick = this.handleNextPageClick.bind(this);
        // this.handlePreviousPageClick = this.handlePreviousPageClick.bind(this);
        // this.handleRefreshClick = this.handleRefreshClick.bind(this);
    }

    handleEditGroupEvent(e,group){
        this.props.editGroupsInfo(group);
    }

    handleDeleteGroupEvent(e,group){
        this.props.deleteGroup(group);
    }

    handleAddGroupEvent(e)
    {
        this.props.addNewGroup();
    }
    componentDidMount() {

        this.props.fetchTopGroupsIfNeeded(this.props.groupdata.page);
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.groupdata.delGroupGuid && nextProps.groupdata.delGroupGuid.length >1) {
            const idx = this.props.groupdata.groups.findIndex( g =>{ return g.groupGuid == nextProps.groupdata.delGroupGuid });
            this.props.groupdata.groups.splice(idx,1);
        }
    }

    render() {
        const { page, error, groups, isFetching ,group,isShowingModal} = this.props.groupdata;
        const prevStyles = classNames("page-item", { disabled: page <= 1 });
        const nextStyles = classNames("page-item", {
            disabled: groups.length === 0
        });
        return (
        <div className ="container">
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li className="nav-item">
                    <a className="nav-link active" id="pills-group-tab" data-toggle="pill" href="#pills-group" role="tab" aria-controls="pills-group" aria-selected="true">
                        组织管理
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="pills-user-tab" data-toggle="pill" href="#pills-user" role="tab" aria-controls="pills-user" aria-selected="false">
                        用户管理
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="pills-dictionary-tab" data-toggle="pill" href="#pills-dictionary" role="tab" aria-controls="pills-dictionary" aria-selected="false">
                        数据字典维护
                    </a>
                </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-group" role="tabpanel" aria-labelledby="pills-group-tab">
                    {groups.length > 0 &&
                            <table className ="table" style={{ opacity: isFetching ? 0.5 : 1 }}>
                            <thead>
                                <tr>
                                <th>名称</th>
                                <th>地址</th>
                                <th>电话</th>
                                <th><i className="fa fa-plus"  onClick ={(e) => this.handleAddGroupEvent(e) }></i></th>
                                </tr>
                            </thead>
                            <tbody>
                            {groups.map(group => (
                                <tr key={group.groupName} className="col-md-4">
                                    <td>{group.groupName}</td>
                                    <td>{group.groupAddress}</td>
                                    <td>{group.groupPhone}</td>
                                    <td> <i className="fa fa-edit"  onClick ={(e) => this.handleEditGroupEvent(e,group) }></i>
                                         <i className="fa fa-trash" onClick ={(e) => this.handleDeleteGroupEvent(e,group)}></i></td>
                                </tr>
                            ))}
                            </tbody>
                            </table>}
                </div>
                <div className="tab-pane fade" id="pills-user" role="tabpanel" aria-labelledby="pills-user-tab">
                    用户管理
                </div>
                <div className="tab-pane fade" id="pills-dictionary" role="tabpanel" aria-labelledby="pills-dictionary-tab">
                    数据字典维护
                </div>
            </div>
            <EditDialog modalIsOpen = {isShowingModal} group ={group} />
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
  
  const mapStateToProps = state =>({
        groupdata: state.groupData
  });
  
  export default connect(mapStateToProps,{ 
                                            fetchTopGroupsIfNeeded, 
                                            editGroupsInfo,
                                            deleteGroup,
                                            addNewGroup
                        })
                        (SysManager);