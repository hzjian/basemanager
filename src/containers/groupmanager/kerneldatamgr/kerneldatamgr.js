import React, { Component } from 'react'

import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Table, Button,Input, Popconfirm } from 'antd';

import {
  fetchKernelData,
  saveKernelData,
} from '../actions/usergroupAction'

const kdata =[];
const EditableCell = ({ editable, value, onChange }) => (
  <div>
    {editable
      ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
      : value
    }
  </div>
);

class KernelDataMgr extends Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: '核心对象名称 ',
      dataIndex: 'name',
      width: '25%',
      render: (text, record) => this.renderColumns(text, record, 'name'),
    }, {
      title: '核心对象描述',
      dataIndex: 'descinfo',
      width: '35%',
      render: (text, record) => this.renderColumns(text, record, 'descinfo'),
    },{
      title: '服务名称',
      dataIndex: 'sname',
      width: '20%',
      render: (text, record) => this.renderColumns(text, record, 'sname'),
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
      this.props.saveKernelData(target);
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
    this.props.fetchKernelData(0);
  }

  handleEditEvent(e,kernel){
    console.log(kernel);
  }

  handleDeleteEvent(e,kernel){
    console.log(kernel);
  }

  componentWillReceiveProps(nextProps){
    this.setState({data:nextProps.usergroupdata.kernelList});
  }
  render() {
    const { kernelList,isFetching}  = this.props.usergroupdata;
    return (<div>
      <Button className="editable-add-btn" onClick={this.handleAdd}>添加</Button>
      <Table bordered dataSource={kernelList} columns={this.columns} />
    </div>) 
  }
}

KernelDataMgr.propTypes = {
  kernelList: PropTypes.number.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.object
};

const mapStateToProps = state =>({
      usergroupdata: state.userGroupData
});

export default connect( mapStateToProps,{ fetchKernelData,saveKernelData })(KernelDataMgr);