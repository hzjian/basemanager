import React, {Component} from "react";
import PropTypes from "prop-types";
import './taskinfo.css';
import "antd/dist/antd.css"
import {Modal} from 'antd';
import  'bootstrap/dist/css/bootstrap.min.css'
import imgtxt from '../../imgs/icon_txt.png';
import imgppt from '../../imgs/icon_ppt.png';
import imgword from '../../imgs/icon_word.png';
import imgexcel from '../../imgs/icon_excel.png';
import imgps from '../../imgs/icon_ps.png';
import img from '../../imgs/icon_img.png';
import wenj from '../../imgs/wenjian.png';
import dataimg from '../../imgs/dataimg.png'
import {connect} from "react-redux";
var  visable=false;
// const  ref = Modal.info();
class Taskinfo extends Component {
    state = { visible: false }
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
        render()
        {

            return   <div className="workbody-info">
                <Modal title="Basic Modal" type="primary" destroyOnClose={true}  ref="modal" maskClosable={true}   visible={this.state.visible}   onOk={this.handleOk} onCancel={this.handleCancel}>
                    <div className="work-contert">任务标题名称任务标题名称任务标题名称</div>
                    <div className="line-block f_left work-icon"><img src={imgtxt} /><img src={imgtxt} /><img src={imgtxt}/><img src={imgppt} /><img src={imgword} /><img src={imgexcel} /><img src={imgps} /><img src={img} /></div>
                    <div className="line-block clear"><label className="label-userphoto"><span className="userphoto">ka</span>康康sadasd</label><img src={dataimg.png} className="dataimg"/>  周六18：00</div>
                    <div className="line-block2 f_left">
                        <div className="workexplain">任务描述</div>
                        <div className="workexplain-txt">描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描在这里，你的一切工作将围绕「任务」展开。针对每条任务，你都可以拆分「子任务」、设定截止日期、上传和关联内容，与同事随时随地展开讨论。动动手指，√ 左侧方框，完成下面的子任务吧！</div>

                    </div>
                    <div className="discuss-ry">
                        <div className="line-block f_left">
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
                                <div className="f_left namecomment"><div>康康</div><p>打撒打撒打撒打撒打撒打,撒打撒打撒打撒打撒打撒打.撒打打,撒打撒打撒打撒打撒打撒打.撒打</p></div>
                                <div className="timecomment">2018-3-24</div>
                            </li>
                            <li>
                                <span className="userphoto">ka</span>
                                <div className="f_left namecomment"><div>康康</div>
                                    <p>打撒打撒打撒打撒打.撒打打,撒打撒打撒打撒打撒打撒打.撒打撒打撒</p></div>
                                <div className="timecomment">2018-4-11</div>
                            </li>
                            <li>
                                <span className="userphoto">ka</span>
                                <div className="f_left namecomment"><div>康康</div><p>打撒打撒打撒打撒打撒打,撒打撒打撒打撒打撒打撒打.撒打打,撒打撒打撒打撒打撒打撒打.撒打打,撒打撒打撒打撒打撒打撒打.撒打打,撒打撒打撒打撒打撒打撒打.撒打撒打撒</p></div>
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

    }
    onClick = (evt) => {
        this.setState({
            visible: true,
        });
    }
}

// Map.propTypes = {
//     geojson: PropTypes.shape({
//         // login: PropTypes.string.isRequired,
//         // avatar_url: PropTypes.string.isRequired,
//         // url: PropTypes.string.isRequired,
//         // html_url: PropTypes.string.isRequired
//     }).isRequired
// };
export function taskInfoWindow() {
    this.refs.modal.visible=true;
}
export default connect()(Taskinfo);
Taskinfo.defaultProps = {
    visable: visable,
    label: null,
    onClick: null
};
