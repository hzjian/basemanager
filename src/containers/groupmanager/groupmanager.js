import React, { Component } from 'react';

import KernelClassMgr from './kernelclassmgr/KernelClassMgr';
import GroupUserMgr from './groupusermgr/GroupUserMgr';

class GroupManager extends Component {

  render() {
    return (
      <div>
        <div className ="container">
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li className="nav-item">
                    <a className="nav-link active" id="group-member" data-toggle="pill" href="#pills-group-member" role="tab" aria-controls="pills-group-member" aria-selected="true">
                        组织成员
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="group-kernel" data-toggle="pill" href="#pills-group-kernel" role="tab" aria-controls="pills-group-kernel" aria-selected="false">
                        核心数据
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="group-datasource" data-toggle="pill" href="#pills-group-datasource" role="tab" aria-controls="pills-group-datasource" aria-selected="false">
                        数据分类
                    </a>
                </li>
            </ul>
            <div className="tab-content" id="pills-group">
                <div className="tab-pane fade show active" id="pills-group-member" role="tabpanel" aria-labelledby="pills-group-member">
                  <GroupUserMgr />
                </div>
                <div className="tab-pane fade" id="pills-group-kernel" role="tabpanel" aria-labelledby="pills-group-kernel">
                  <KernelClassMgr />
                </div>
                <div className="tab-pane fade" id="pills-group-datasource" role="tabpanel" aria-labelledby="pills-group-datasource">
                  
                </div>
            </div>
        </div>
      </div>
    )
  }
}
export default GroupManager;