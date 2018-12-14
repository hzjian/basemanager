import React, { Component } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {ID_TOKEN,SYSID } from '../../../utils/apiUtils'

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';

import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {
    fetchTaskData,changeUserList,updateFieldList,saveTaskField,addTaskField,
    changeTaskName ,changeTaskDesc,changeSdate,changeEdate,submitCreateTask
  } from '../actions/CreateTaskAction'



const Option = Select.Option;
const TextArea = Input.TextArea;

 const FieldTypeSelect =({ editable, value, onChange }) => (
    <div>
      {editable?
        <Select defaultValue="文本" style={{ width: 120 }} onChange={e => onChange(e)}>
            <option  value="文本">文本</option>
            <option value="整数">整数</option>
            <option value="浮点数">浮点数</option>
            <option value="日期">日期</option>
        </Select>:value}
    </div>
    );

 const IsEditSelect =({ editable, value, onChange }) => (
    <div>
        {editable?
        <Select defaultValue="是" style={{ width: 120 }} onChange={e => onChange(e)}>
            <option value="是">是</option>
            <option value="否">否</option>
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

    handleSelectUserChange(value) {
        console.log(value);
        this.props.changeUserList(value);
    }

    handleSelectKernelChange(value){
        console.log(value);
    }

    handleTaskNameChange(value)
    {
        console.log(value);
        this.props.changeTaskName(value);
    }

    handleTaskDescChange(value)
    {
        this.props.changeTaskDesc(value);
    }
    handleSdateChange(date){
        //date.format("YYYY-MM-DD HH:mm:ss")
        this.props.changeSdate(date);
    }

    handleEdateChange(date){
        this.props.changeEdate(date);
    }

    edit(key) {
        const {fieldlist}  = this.props.taskData;
        const target = fieldlist.filter(item => key === item.key)[0];
        if (target) {
          target.editable = true;
          this.props.updateFieldList(fieldlist);
          //this.setState({ data: newData });
        }
    }
    save(key) {
        const {fieldlist}  = this.props.taskData;
        const target = fieldlist.filter(item => key === item.key)[0];
        if (target) {
            delete target.editable;
            //this.setState({ data: newData });
            this.props.saveTaskField(fieldlist);
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
        const {fieldlist,fieldindex}  = this.props.taskData;
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
    handleFileChange = (info) =>{
        let fileList = info.fileList;
        fileList = fileList.filter((file) => {
            if (file.response) {
                return file.response.status === 'success';
            }
            return true;
        });

        //this.setState({ fileList });
    }
    componentDidMount(){
        this.props.fetchTaskData();
       
    }
    handleSubmit()
    {
        const { taskname,taskdesc,userlist,kernellist,fieldlist,startdate,enddate}  = this.props.taskData;
        const startdatestr = startdate?startdate.format("YYYY-MM-DD HH:mm:ss"):'';
        const enddatestr = enddate?enddate.format("YYYY-MM-DD HH:mm:ss"):'';
        this.props.submitCreateTask({ taskname,taskdesc,userlist,kernellist,fieldlist,startdatestr,enddatestr});
    }

    render() 
    {
        const { userlist,kernellist,fieldlist,startdate,enddate}  = this.props.taskData;
        const userOption = userlist.map((user) =>{
            return (<Option key={user.userguid}>{user.username}</Option>)
        });
        const kernelOption = kernellist.map((kernel) =>{
            return (<Option key={kernel.classid}>{kernel.classname}</Option>)
        });
        const fileOption = {
            action : '/service/file/task/'+ 'CURRENT_TASKID',
            headers: {
                [ID_TOKEN]: SYSID + "." + localStorage.getItem(ID_TOKEN)
            },
            onChange : (info)=>{ this.handleFileChange(info)}
        }
        return (
        <form onSubmit={() =>this.handleSubmit()}>
            <div class="form-group">
                <label for="taskName">任务名称</label>
                <Input class="form-control" id="taskName" placeholder="任务名称"  onChange={(e) =>this.handleTaskNameChange(e.target.value)} />
            </div>
            <div class="form-group">
                <label for="taskDesc">任务描述</label>
                <TextArea class="form-control" id="taskDesc" rows="3" onChange={(e) =>this.handleTaskDescChange(e.target.value)} />
            </div>
            <div className="form-group">
                <label for="">起始日期</label>
                <TextField type="date"  defaultValue="2017-05-24" onChange={(date) =>this.handleSdateChange(date)} value = {startdate}/> 
                <label for="">至</label> 
                <TextField type="date"  defaultValue="2017-05-24" onChange={(date) =>this.handleEdateChange(date)} value = {enddate}/>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label>添加用户</label>
                    <Select  mode="multiple"  style={{ width: '100%' }}   placeholder="选择用户"  defaultValue = {[]}
                        onChange={(e)=>this.handleSelectUserChange(e)}>
                        {userOption}
                    </Select>
                </div>
                <div className="form-group col-md-6">
                    <label for="">核心对象</label>
                    <Select className="form-control" id="busdata"   onChange={(e) =>this.handleSelectKernelChange(e)}>
                       {kernelOption}
                    </Select>              
                </div>
            </div>
            <div>
                <Button className="editable-add-btn" onClick={this.handleAddField}>添加</Button>

               {/* <Table bordered dataSource={fieldlist} pagination = {false} columns={this.fieldcolumns} /> */}
            </div>
            <div className="form-group">
                <input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"/>
                <label htmlFor="contained-button-file">
                    <Button variant="contained" component="span">
                    上传文件
                    </Button>
                </label>
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
