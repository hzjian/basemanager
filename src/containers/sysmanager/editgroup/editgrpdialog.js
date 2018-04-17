import React, { Component } from 'react'

import Modal from 'react-modal';
import PropTypes from "prop-types";
import { connect } from "react-redux";


import {
  closeGroupInfoDialog,
  saveGroupInfo,
} from "../../../actions/groups";
  
  // Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
  // 
  
Modal.setAppElement('#root')

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class EditgrpDialog extends Component {
    constructor() {
        super();
        this.state = {
                        modalIsOpen: false,
                        group:{}
                      }
        this.closeModal = this.closeModal.bind(this);
        this.saveGroup = this.saveGroup.bind(this);
      }
      closeModal(e) {
        const { dispatch } = this.props;
        dispatch(closeGroupInfoDialog());

        // this.setState(prevState => ({
        //   modalIsOpen: false,
        //   group:{}
        // }));
      }

      saveGroup(e) {
        const { dispatch } = this.props;
        dispatch(saveGroupInfo(this.state.group));
      }

      componentWillReceiveProps(nextProps) {
        this.setState(prevState => ({
          modalIsOpen: nextProps.modalIsOpen,
          group : nextProps.group
        }));
      }
    
      render() {
        return (
          <div>
            <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel="组织管理"
            >
              
              <div>I am a modal</div>
              <div>
                <input />
                <button>tab navigation</button>
                <button>stays</button>
                <button>inside</button>
                <button onClick={this.saveGroup}>保存</button>
                <button onClick={this.closeModal}>关闭</button>
              </div>
            </Modal>
          </div>
        );
      }
}

export default connect()(EditgrpDialog);