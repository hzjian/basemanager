import React, { Component } from 'react'
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { Button,Input,Dialog,DialogTitle,DialogContent,DialogActions,DialogContentText } from '@material-ui/core'
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
    fetchKernelData,
    saveKernelData,
  } from '../../actions/KernelClassAction';

const Option = Select.Option;
const TextArea = Input.TextArea;
const FieldTypeSelect =({ editable, value, onChange }) => (
    <div>
      {editable?
        <Select defaultValue="文本" style={{ width: 120 }} onChange={e => onChange(e)}>
            <MenuItem value="文本">文本</MenuItem>
            <MenuItem value="整数">整数</MenuItem>
            <MenuItem value="浮点数">浮点数</MenuItem>
            <MenuItem value="日期">日期</MenuItem>
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
class KernelClassDialog extends Component {

    constructor(props){
        super(props);
        this.state ={visible: true};
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
                          <Dialog
                            open= {false}
                            keepMounted
                            onClose={this.handleClose}
                            aria-labelledby="alert-dialog-slide-title"
                            aria-describedby="alert-dialog-slide-description"
                            >
                            <DialogTitle id="alert-dialog-slide-title">
                                {"Use Google's location service?"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-slide-description">
                                    是否删除
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => this.delete(record.key)} color="primary">
                                是
                                </Button>
                                <Button onClick={this.handleClose} color="primary">
                                否
                                </Button>
                            </DialogActions>
                        </Dialog>
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
    handleKernelClassNameChange(value)
    {
        console.log(value);
        this.props.changeTaskName(value);
    }

    handleKernelClassDescChange(value)
    {
        this.props.changeTaskDesc(value);
    }

    handleChange(value, key, column){
        console.log(value,key,column);
        const {fieldlist}  = this.props.taskData;
        const target = fieldlist.filter(item => key === item.key)[0];
        if (target) {
          target[column] = value;
          this.props.updateFieldList(fieldlist);
          //this.setState({ data: newData });
        }
    }
    
    handleAddField = () => {
        const {fieldlist,fieldindex}  = this.props.kClassData;
        const newData = {
            key: fieldindex,
            fieldname:"",
            fieldtype:"文本",
            isedit:"是",
            editable:true
        };
        fieldlist.push(newData);
        this.props.addTaskField(fieldlist,fieldindex);
    }

    showModal = () => {
        this.setState({
          visible: true,
        });
      }
      hideModal = () => {
        this.setState({
          visible: false,
        });
      }

  render() {
    const { userlist,kernellist,fieldlist}  = this.props.kClassData;
    return (
      <div>
         <Dialog
          title="Modal"
          visible={this.state.visible}
          onOk={this.hideModal}
          onCancel={this.hideModal}
          okText="确认"
          cancelText="取消"
        >
            <div class="form-group">
                <label for="kernelClassName">核心对象类别名称</label>
                <Input class="form-control" id="kernelClassName" placeholder="核心对象类别名称"  onChange={(e) =>this.handleKernelClassNameChange(e.target.value)} />
            </div>
            <div class="form-group">
                <label for="taskDesc">核心对象类别描述</label>
                <TextArea class="form-control" id="taskDesc" rows="3" onChange={(e) =>this.handleKernelClassDescChange(e.target.value)} />
            </div>
            <div>
                <Button className="editable-add-btn" onClick={this.handleAddField}>添加</Button>
                {/* <Table bordered dataSource={fieldlist} pagination = {false} columns={this.fieldcolumns} /> */}
            </div>
        </Dialog>
      </div>
    )
  }
}


KernelClassDialog.propTypes = {
    memberList: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.object
};

const mapStateToProps = state =>({
    kClassData: state.kClassData
});

export default connect( mapStateToProps,{ })(KernelClassDialog);