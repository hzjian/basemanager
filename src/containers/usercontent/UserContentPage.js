import React, { Component } from 'react'

class UserContentPage extends Component {

   
  render() {
    return (
      <div class="container-fluid">
      <div class="row">
        <nav class="col-md-2 d-none d-md-block bg-light sidebar">
          <div class="sidebar-sticky">
            <ul class="nav flex-column">
              <div>任务列表</div>
            </ul>
          </div>
        </nav>

        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
          <h1 class="h2">地图区域</h1>
          
        </main>
      </div>
    </div>
    )
  }
}


export default UserContentPage;