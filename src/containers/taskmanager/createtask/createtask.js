import React, { Component } from 'react'

import { DatePicker,Select } from 'antd';
import { Upload, message, Button, Icon } from 'antd';

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

export default class CreateTask extends Component {
    
  render() {
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

            <div class="form-group">
                <Upload {...props}>
                    <Button>
                        <Icon type="upload" /> 上传文件
                    </Button>
                </Upload>
            </div>
            <div className="form-group">
                <div className ="row">
                    <label for="busdata">核心对象</label>
                    <select class="form-control" id="busdata">
                        <option>小区</option>
                        <option>微网格</option>
                        <option>光缆</option>
                    </select>
                </div>
                <div className ="row">
                    <div class="custom-control custom-radio">
                        <input type="radio" id="customRadio1" name="customRadio" class="custom-control-input"/>
                        <label class="custom-control-label" for="customRadio1">点</label>
                    </div>
                    <div class="custom-control custom-radio">
                        <input type="radio" id="customRadio2" name="customRadio" class="custom-control-input"/>
                        <label class="custom-control-label" for="customRadio2">线</label>
                    </div>
                    <div class="custom-control custom-radio">
                        <input type="radio" id="customRadio3" name="customRadio" class="custom-control-input"/>
                        <label class="custom-control-label" for="customRadio3">面</label>
                    </div>
                </div>
            </div>
            <div>
                <label for="busdata">属性字段</label>
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">名称</th>
                        <th scope="col">类型</th>
                        <th scope="col"><i className="fa fa-plus"></i></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>名称</td>
                        <td><select>
                                <option>数字</option>
                                <option>文本</option>
                                <option>日期</option>
                            </select>
                        </td>
                        <td><i className="fa fa-trash"></i></td>
                        </tr>
                        <tr>
                        <td>地址</td>
                        <td><select>
                                <option>数字</option>
                                <option>文本</option>
                                <option>日期</option>
                            </select></td>
                        <td><i className="fa fa-trash"></i></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="form-group">
                <label for="busdata">参考数据列表</label><i className="fa fa-plus"/>
                <ul class="list-group">
                    <li class="list-group-item">朝阳区微网格</li>
                    <li class="list-group-item">商住两用小区</li>
                    <li class="list-group-item">朝阳区地埋光缆</li>
                </ul>
            </div> 
            

            <div class="form-group">
                <div className ="row">
                    <label for="userlist">添加用户</label>
                    <Icon type="dribbble-square" style={{ fontSize: 32, color: '#08c' }} />
                    <Icon type="dribbble-square" style={{ fontSize: 32, color: '#08c' }} />
                    <Icon type="dribbble-square" style={{ fontSize: 32, color: '#08c' }} />
                    <Icon type="user-add" style={{ fontSize: 32, color: '#08c' }} />
                </div>
            </div>
        </form>
    )
  }
}
