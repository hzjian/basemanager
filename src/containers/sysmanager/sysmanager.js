import React, { Component } from 'react';


 class SysManager extends Component {

    render() {
        return (
        <div className ="container">
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li className="nav-item">
                    <a className="nav-link active" id="pills-group-tab" data-toggle="pill" href="#pills-group" role="tab" aria-controls="pills-group" aria-selected="true">
                        组织管理
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="pills-user-tab" data-toggle="pill" href="#pills-user" role="tab" aria-controls="pills-user" aria-selected="false">
                        用户管理
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="pills-dictionary-tab" data-toggle="pill" href="#pills-dictionary" role="tab" aria-controls="pills-dictionary" aria-selected="false">
                        数据字典维护
                    </a>
                </li>
            </ul>
            <div>
                <div className="tab-pane fade" id="pills-user" role="tabpanel" aria-labelledby="pills-user-tab">
                    用户管理
                </div>
                <div className="tab-pane fade" id="pills-dictionary" role="tabpanel" aria-labelledby="pills-dictionary-tab">
                    数据字典维护
                </div>
            </div>
        </div>
        )
    }
}
  
export default SysManager;