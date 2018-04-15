import React, { Component } from 'react'
import MapComponent from './mapcomponent/MapComponent'
import "leaflet/dist/leaflet.css"
class UserContentPage extends Component {

   
  render() {
    return (
      <div className="container-fluid ">
      <div className="row">
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
              <div>任务列表</div>
        </nav>

        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
          <MapComponent />
        </main>
      </div>
    </div>
    )
  }
}


export default UserContentPage;