import React, { Component } from 'react'

import { DatePicker,Select  } from 'antd';
import { Upload, message, Button, Icon } from 'antd';
import { Table, Input, Popconfirm } from 'antd';

const Option = Select.Option;

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

 const EditableCell = ({ editable, value, onChange }) => (
    <div>
      {editable
        ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
        : value
      }
    </div>
  );

export default class CreateTask extends Component {
    
    constructor(props) {
        super(props);
        this.fieldcolumns = [{
          title: '属性名称 ',
          dataIndex: 'fieldname',
          width: '25%',
          render: (text, record) => this.renderColumns(text, record, 'username'),
        }, {
          title: '属性类型',
          dataIndex: 'fieldtype',
          width: '35%',
          render: (text, record) => this.renderColumns(text, record, 'cnname'),
        },{
          title: '是否可编辑',
          dataIndex: 'isedit',
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

    handleChange(value) {
        console.log(`selected ${value}`);
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
    render() 
    {
        const children = [];
        for (let i = 10; i < 36; i++) {
        children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
        }
        const memberList =[];
        return (
        <form>
           
            <div class="form-group">
                <label for="taskName">任务名称</label>
                <input type="email" class="form-control" id="taskName" placeholder="任务名称"/>
            </div>
            <div class="form-group">
                <label for="taskDesc">任务描述</label>
                <textarea class="form-control" id="taskDesc" rows="3"></textarea>
            </div>
            <div class="form-group">
                <label for="">起始日期</label>
                <DatePicker/> <label for="">至</label> <DatePicker/>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="userlist">添加用户</label>
                    <Select  mode="multiple"  style={{ width: '100%' }}   placeholder="Please select"  defaultValue={['a10']}
                        onChange={this.handleChange}>
                        {children}
                    </Select>
                </div>
                <div className="form-group col-md-6">
                    <label for="">核心对象</label>
                    <Select class="form-control" id="busdata">
                        <Option value="key1">小区</Option >
                        <Option value="key2">微网格</Option >
                        <Option value="key3">光缆</Option >
                    </Select>              
                </div>
            </div>
            <div>
                <Button className="editable-add-btn" onClick={this.handleAdd}>添加</Button>
                <Table bordered dataSource={memberList} columns={this.fieldcolumns} />
            </div>
            <div class="form-group">
                    <Upload {...props}>
                        <Button>
                            <Icon type="upload" /> 上传文件
                        </Button>
                    </Upload>
            </div>
        </form>
    )
  }
}
