import React, { Component } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { DatePicker,Select  } from 'antd';
import { Upload, message, Button, Icon } from 'antd';
import { Table, Input, Popconfirm } from 'antd';

import {
    fetchTaskData,changeUserList,updateFieldList,saveTaskField,addTaskField,
    changeTaskName ,changeTaskDesc,changeSdate,changeEdate,submitCreateTask
  } from '../actions/CreateTaskAction'

const Option = Select.Option;
const TextArea = Input.TextArea;
const props = {
    name: 'file',
    action: '//jsonplaceholder.typicode.com/posts/',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

 const FieldTypeSelect =({ editable, value, onChange }) => (
    <div>
      {editable?
        <Select defaultValue="文本" style={{ width: 120 }} onChange={e => onChange(e)}>
            <Option value="文本">文本</Option>
            <Option value="整数">整数</Option>
            <Option value="浮点数">浮点数</Option>
            <Option value="日期">日期</Option>
        </Select>:value}
    </div>
    );

 const IsEditSelect =({ editable, value, onChange }) => (
    <div>
        {editable?
        <Select defaultValue="是" style={{ width: 120 }} onChange={e => onChange(e)}>
            <Option value="是">是</Option>
            <Option value="否">否</Option>
        </Select>:value}
    </div>
    );

 const EditableCell = ({ editable, value, onChange }) => (
    <div>
      {editable
        ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
        : value
      }
    </div>
  );

class CreateTask extends Component {
    
    constructor(props) {
        super(props);

        this.fieldcolumns = [{
          title: '属性名称 ',
          dataIndex: 'fieldname',
          width: '25%',
          render: (text, record) => this.renderColumns(text, record, 'fieldname'),
        }, {
          title: '属性类型',
          dataIndex: 'fieldtype',
          width: '35%',
          render: (text, record) => this.renderFTypeColumns(text, record, 'fieldtype'),
        },{
          title: '是否可编辑',
          dataIndex: 'isedit',
          width: '20%',
          render: (text, record) => this.renderEditTypeColumns(text, record, 'isedit'),
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
                        <Popconfirm title="是否删除?" onConfirm={() => this.delete(record.key)}>
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

    renderFTypeColumns(text, record, column) {
        return (
            <FieldTypeSelect
            editable={record.editable}
            value={text}
            onChange={value => this.handleChange(value, record.key, column)}
            />
        );
    }

    renderEditTypeColumns(text, record, column) {
        return (
            <IsEditSelect
            editable={record.editable}
            value={text}
            onChange={value => this.handleChange(value, record.key, column)}
            />
        );
    }

    handleChange(value, key, column){
        console.log(value,key,column);
        const {fieldList}  = this.props.taskData;
        const target = fieldList.filter(item => key === item.key)[0];
        if (target) {
          target[column] = value;
          this.props.updateFieldList(fieldList);
          //this.setState({ data: newData });
        }
    }

    handleSelectUserChange(value) {
        console.log(value);
        this.props.changeUserList(value);
    }

    handleSelectKernelChange(value){
        console.log(value);
    }

    handleTaskNameChange(value)
    {
        this.props.changeTaskName(value);
    }

    handleTaskDescChange(value)
    {
        this.props.changeTaskDesc(value);
    }
    handleSdateChange(value){
        this.props.changeSdate(value);
    }

    handleEdateChange(value){
        this.props.changeEdate(value);
    }

    edit(key) {
        const {fieldList}  = this.props.taskData;
        const target = fieldList.filter(item => key === item.key)[0];
        if (target) {
          target.editable = true;
          this.props.updateFieldList(fieldList);
          //this.setState({ data: newData });
        }
    }
    save(key) {
        const {fieldList}  = this.props.taskData;
        const target = fieldList.filter(item => key === item.key)[0];
        if (target) {
            delete target.editable;
            //this.setState({ data: newData });
            this.props.saveTaskField(fieldList);
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
    handleAddField = () => {
        const {fieldList,fieldindex}  = this.props.taskData;
        const newData = {
            key: fieldindex,
            fieldname:"",
            fieldtype:"文本",
            isedit:"是",
            editable:true
        };
        fieldList.push(newData);
        this.props.addTaskField(fieldList,fieldindex);
    }

    componentDidMount(){
        this.props.fetchTaskData();
    }
    handleSubmit()
    {
        this.props.submitCreateTask();
    }

    render() 
    {
        const { userlist,kernellist,fieldList,startdate,enddate}  = this.props.taskData;
        const userOption = userlist.map((user) =>{
            return (<Option key={user.userguid}>{user.username}</Option>)
        });
        const kernelOption = kernellist.map((kernel) =>{
            return (<Option key={kernel.classid}>{kernel.classname}</Option>)
        });
        return (
        <form onSubmit={() =>this.handleSubmit()}>
            <div class="form-group">
                <label for="taskName">任务名称</label>
                <Input class="form-control" id="taskName" placeholder="任务名称"  onChange={(e) =>this.handleTaskNameChange(e)} />
            </div>
            <div class="form-group">
                <label for="taskDesc">任务描述</label>
                <TextArea class="form-control" id="taskDesc" rows="3" onChange={(e) =>this.handleTaskDescChange(e)} />
            </div>
            <div class="form-group">
                <label for="">起始日期</label>
                <DatePicker onChange={(e) =>this.handleSdateChange(e)} value = {startdate}/> <label for="">至</label> <DatePicker onChange={(e) =>this.handleEdateChange(e)} value = {enddate}/>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label>添加用户</label>
                    <Select  mode="multiple"  style={{ width: '100%' }}   placeholder="选择用户"  defaultValue = {[]}
                        onChange={(e)=>this.handleSelectUserChange(e)}>
                        {userOption}
                    </Select>
                </div>
                <div className="form-group col-md-6">
                    <label for="">核心对象</label>
                    <Select class="form-control" id="busdata"   onChange={(e) =>this.handleSelectKernelChange(e)}>
                       {kernelOption}
                    </Select>              
                </div>
            </div>
            <div>
                <Button className="editable-add-btn" onClick={this.handleAddField}>添加</Button>
                <Table bordered dataSource={fieldList} pagination = {false} columns={this.fieldcolumns} />
            </div>
            <div class="form-group">
                    <Upload {...props}>
                        <Button>
                            <Icon type="upload" /> 上传文件
                        </Button>
                    </Upload>
            </div>
            <div>
                <Button type="primary" htmlType="submit">创建任务</Button>
            </div>
        </form>
    )
  }
}

CreateTask.propTypes = {
    memberList: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.object
};

const mapStateToProps = state =>({
      taskData: state.cTaskData
});

export default connect( mapStateToProps,{ fetchTaskData,changeUserList,updateFieldList,saveTaskField,addTaskField ,
                        changeTaskName ,changeTaskDesc,changeSdate,changeEdate,submitCreateTask})
                      (CreateTask);
