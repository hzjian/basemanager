/**
 * Created by hao.cheng on 2017/4/13.
 */

import React, { Component } from 'react';
import { Card, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button } from 'antd';
import { Modal } from 'antd';
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
    closeDialog,
    saveGroupInfo,
    newGroupInfo,
  } from "../../actions/groupAction";

const FormItem = Form.Item;
const Option = Select.Option;

class BaseForm extends Component {
    constructor() {
        super();
        this.state = {
                        modalIsOpen: false,
                        groupGuid:"",
                        groupName: "",
                        groupAddress:"",
                        groupPhone:""
                      }
        this.closeModal = this.closeModal.bind(this);
        this.saveGroup = this.saveGroup.bind(this);
      }
      closeModal(e) {
        this.props.form.resetFields();
        const tmpGroup = {
            groupGuid: "",
            groupName: "",
            groupAddress:"",
            groupPhone:""};
        this.props.closeDialog(tmpGroup);
      }

      saveGroup(e) {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const tmpGroup = {
                    groupGuid: this.state.groupGuid,
                    groupName: values.groupName,
                    groupAddress:values.groupAddress,
                    groupPhone:values.groupPhone};
                if(this.props.isnewgroup){
                    this.props.newGroupInfo(tmpGroup);
                }
                else {
                    this.props.saveGroupInfo(tmpGroup);
                }
                this.props.closeDialog(tmpGroup);    
            }
        });
       
        this.props.form.resetFields();
      }


    render() {
        const { getFieldDecorator } = this.props.form;
        const { groupGuid,groupName,groupAddress,groupPhone } =  this.props.group;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        
        return (
        <div className="gutter-example">
            <Modal
              visible={this.props.modalIsOpen}
              onOk = {() => this.saveGroup()}
              onCancel={() => this.closeModal()}
              title="组织管理"
            >
                <Form onSubmit={this.handleSubmit}>                               
                    <FormItem
                        {...formItemLayout}
                        label={(
                            <span>
                                名称&nbsp;
                                <Tooltip title="名称">
                                <Icon type="question-circle-o" />
                                </Tooltip>
                            </span>
                        )}
                        hasFeedback
                    >
                        {getFieldDecorator('groupName', {
                            rules: [{ message: '请输名称!', whitespace: true }],
                            initialValue: groupName
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={(
                            <span>
                                地址&nbsp;
                                <Tooltip title="地址">
                                <Icon type="question-circle-o" />
                                </Tooltip>
                            </span>
                        )}
                        hasFeedback
                    >
                        {getFieldDecorator('groupAddress', {
                            rules: [{ message: '请输地址!', whitespace: true }],
                            initialValue: groupAddress
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={(
                            <span>
                                电话号码&nbsp;
                                <Tooltip title="电话号码">
                                <Icon type="question-circle-o" />
                                </Tooltip>
                            </span>
                        )}
                        hasFeedback
                    >
                        {getFieldDecorator('groupPhone', {
                            rules: [{ message: '请输入组织电话号码!', whitespace: true }],
                            initialValue: groupPhone
                        })(
                            <Input />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        </div>
        )
    }
}
const EditDialog = Form.create()(BaseForm);

const mapStateToProps = state =>({
    group: state.groupData.group,
    isnewgroup: state.groupData.isnewgroup,
    modalIsOpen: state.groupData.isShowingModal
});

export default connect(mapStateToProps,{closeDialog,saveGroupInfo,newGroupInfo})(EditDialog);