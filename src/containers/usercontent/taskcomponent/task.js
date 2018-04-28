import React, {Component} from "react";
import PropTypes from "prop-types";
import  './task.css';
import { Button,Modal} from 'antd';
import imglayer from '../imgs/Elevation_Layer_32.png';
import imgweb from '../imgs/czimg.png';
import imgauthor from '../imgs/workuser.png';
import Taskinfo from "./taskinfo/Taskinfo";
import imgtxt from '../imgs/icon_txt.png';
import imgppt from '../imgs/icon_ppt.png';
import imgword from '../imgs/icon_word.png';
import imgexcel from '../imgs/icon_excel.png';
import imgps from '../imgs/icon_ps.png';
import img from '../imgs/icon_img.png';
import wenj from '../imgs/wenjian.png';
import dataimg from '../imgs/dataimg.png'
import MapComponent from '../mapcomponent/MapComponent'
import {openeditlayerEdit,taskMaptoLayer} from '../mapcomponent/MapComponent'
import {
    invalidateMapsPage,
    selectMapsPage,
    fetchTopmapgeojsonIfNeeded, fetchTopmapgeojson
} from "../../../actions/map";
import {connect} from "react-redux";
var visable=false;
var MapBounds=null;
class Task extends Component {
     // {taskName, geomLayername, userName} = task;
    // var taskName=task.taskName;
    onClick = (evt) => {
        visable=true;
    }
    state = {
        loading: false,
        visible: false,
    }
    showModal  = (key) => {
        this.setState({
            visible: true,
        });
    }
    openlayer = (classId) => {
        const { dispatch, page } = this.props;
        dispatch(fetchTopmapgeojson(MapBounds,classId));
        taskMaptoLayer(classId);

    }
    // handleOk = () => {
    //     this.setState({ loading: true });
    //     setTimeout(() => {
    //         this.setState({ loading: false, visible: false });
    //     }, 3000);
    // }
    handleCancel = () => {
        this.setState({ visible: false });
    }
    render()
    {
        return (

            <div class="listli">
                <div class="llist_workname"><span class="list_number">1</span><p>{this.props.taskName} </p><span onClick={(e) =>this.showModal(this.props.key)} class="work_link">查看</span>
                    <span id="openbutton" onClick={(e) =>this.openlayer(this.props.classId)}  class="work_open">打开</span></div>
                <p class="work_bewrite"> 前言 在上一篇文章，我们已经实现了React的组 前言 在上一篇文章，我们已经实现了React的组</p>
                <div class="work_author"><span
                    class="wk_nm_photo">{ this.props.userName.substring(0,2).toLocaleUpperCase()}</span><span>{this.props.userName}</span><span>发布：{this.props.statDate}</span><img
                    src={imgauthor}/><span> 266</span></div>
                <Modal footer={null} className="ant-modal-content" title="任务详情" width={780} type="primary" destroyOnClose={true}  maskClosable={true}   visible={this.state.visible}  onCancel={this.handleCancel}>
                    <div className="work-contert-tt">{this.props.taskName}</div>
                    <div className="line-block  work-icon"><img src={imgtxt}/><img src={imgppt} /><img src={imgword} /><img src={imgexcel} /><img src={imgps} /><img src={img} /></div>
                    <div className="line-block clear"><label className="label-userphoto"><span className="userphoto">ka</span>康康sadasd</label><img src={dataimg.png} className="dataimg"/>  周六18：00</div>
                    <div className="line-block2 ">
                        <div className="workexplain">任务描述</div>
                        <div className="workexplain-txt">描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描在这里，你的一切工作将围绕「任务」展开。针对每条任务</div>
                    </div>
                    <div className="discuss-ry">
                        <div className="line-block user—no">
                            <span className="work-personnel">任务成员</span><span className="userphoto">ka</span><span className="userphoto">ka</span><span className="userphoto">ka</span><span className="userphoto">ka</span><span className="userphoto">ka</span>
                        </div>
                        <ul className="commentblock">
                            <li>
                                <span className="userphoto">ka</span>
                                <div className="f_left namecomment"><div>康康</div><p>打撒打</p></div>
                                <div className="timecomment">刚刚</div>
                            </li>
                            <li>
                                <span className="userphoto">ka</span>
                                <div className="f_left namecomment"><div>康康</div><p>打撒打撒打撒打撒打撒打,撒打撒打撒打撒打</p></div>
                                <div className="timecomment">2018-3-24</div>
                            </li>
                            <li>
                                <span className="userphoto">ka</span>
                                <div className="f_left namecomment"><div>康康</div>
                                    <p>打撒打撒打撒打撒打.撒打打,撒打撒打撒打撒打撒打撒打.撒打撒打撒</p></div>
                                <div className="timecomment">2016-5-11</div>
                            </li>
                            <li>
                                <span className="userphoto">ka</span>
                                <div className="f_left namecomment"><div>康康</div><p>打撒打撒打撒打撒打撒打,撒打撒打撒打撒打撒打撒打.</p></div>
                                <div className="timecomment">2012-12-22</div>
                            </li>

                        </ul>
                        <div className="fpbl-block f_left">
                            <div className="textarea-kuang"><textarea className="tareablck"></textarea><div className="wjbtn"><a href="#" className="fabu">发布</a><img src={wenj} className="wenjian"/></div></div>
                        </div>
                    </div>
                    <div className="clear"></div>
                </Modal>

            </div>

        );
    }
};

// Task.propTypes = {
//   task: PropTypes.shape({
//     // login: PropTypes.string.isRequired,
//     // avatar_url: PropTypes.string.isRequired,
//     // url: PropTypes.string.isRequired,
//     // html_url: PropTypes.string.isRequired
//   }).isRequired
// };
Taskinfo.defaultProps = {
    taskName: null,
    userName:null,
    classId:null,
    statDate:null,
    geomType:null,
    keyvalue:null
};
export default connect() (Task);
export function mapbands(mapbounds) {
    MapBounds=mapbounds;
}

