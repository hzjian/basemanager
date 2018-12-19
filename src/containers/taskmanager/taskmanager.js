import React, { Component } from 'react';

import * as createtask  from './createtask';
import * as tasklist from './tasklist';

class TaskManager extends Component {
  render() {
    return (
      <div className ="container">
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li className="nav-item">
                    <a className="nav-link active" id="new-task-tab" data-toggle="pill" href="#pills-new-task" role="tab" aria-controls="pills-new-task" aria-selected="true">
                        新建任务
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="execute-task-tab" data-toggle="pill" href="#pills-execute-task" role="tab" aria-controls="pills-execute-task" aria-selected="false">
                        可执行任务
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="history-task-tab" data-toggle="pill" href="#pills-history-task" role="tab" aria-controls="pills-history-task" aria-selected="false">
                        已关闭任务
                    </a>
                </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-new-task" role="tabpanel" aria-labelledby="new-task-tab">
                  <createtask.CreateTask/>
                </div>
                <div className="tab-pane fade" id="pills-execute-task" role="tabpanel" aria-labelledby="execute-task-tab">
                  可执行任务
                  <tasklist.TaskList />
                </div>
                <div className="tab-pane fade" id="pills-history-task" role="tabpanel" aria-labelledby="history-task-tab">
                  已关闭任务
                </div>
            </div>
        </div>
    )
  }
}

export default TaskManager;
