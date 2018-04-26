import React, { Component } from 'react'

import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Table, Button,Input, Popconfirm } from 'antd';

import {
    fetchGroupMember,saveGroupMember
} from '../actions/usergroupAction'

const EditableCell = ({ editable, value, onChange }) => (
  <div>
    {editable
      ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
      : value
    }
  </div>
);

class GroupUserMgr extends Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: '用户名称 ',
      dataIndex: 'username',
      width: '25%',
      render: (text, record) => this.renderColumns(text, record, 'username'),
    }, {
      title: '用户中文名',
      dataIndex: 'cnname',
      width: '35%',
      render: (text, record) => this.renderColumns(text, record, 'cnname'),
    },{
      title: '用户密码',
      dataIndex: 'password',
      width: '20%',
      render: (text, record) => this.renderColumns(text, record, 'password'),
    }, {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => {
        const { editable } = record;
        return (
          <div className="editable-row-operations">
            {
              editable ?
                <span>
                  <a onClick={() => this.save(record.key)}>保存</a>
                </span>
                : <div>
                    <a onClick={() => this.edit(record.key)}>编辑</a>
                    <Popconfirm title="是否保存?" onConfirm={() => this.delete(record.key)}>
                      <a>删除</a>
                    </Popconfirm>
                  </div>
            }
          </div>
        );
      },
    }];
  }

  renderColumns(text, record, column) {
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        onChange={value => this.handleChange(value, record.key, column)}
      />
    );
  }
  handleChange(value, key, column) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target[column] = value;
      this.setState({ data: newData });
    }
  }
  edit(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target.editable = true;
      this.setState({ data: newData });
    }
  }
  save(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      delete target.editable;
      this.setState({ data: newData });
      this.props.saveGroupMember(target);
    }
  }
  cancel(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      delete target.editable;
      this.setState({ data: newData });
    }
  }
  handleAdd = () => {
    const newData = {
      key: 0,
      name:"",
      descinfo:"",
      sname:"",
      editable:true
    };
    const { data }= this.state;
    data.push(newData);
    this.setState({
      data: data,
    });
  }

  componentDidMount(){
    this.props.fetchGroupMember(0);
  }

  componentWillReceiveProps(nextProps){
    this.setState({data:nextProps.usergroupdata.memberList});
  }
  render() {
    const { memberList,isFetching}  = this.props.usergroupdata;
    return (<div>
      <Button className="editable-add-btn" onClick={this.handleAdd}>添加</Button>
      <Table bordered dataSource={memberList} columns={this.columns} />
    </div>) 
  }
}

GroupUserMgr.propTypes = {
    memberList: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.object
};

const mapStateToProps = state =>({
      usergroupdata: state.userGroupData
});

export default connect( mapStateToProps,{ fetchGroupMember,saveGroupMember })(GroupUserMgr);