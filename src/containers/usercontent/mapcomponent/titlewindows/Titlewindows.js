import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
class Titlewindows extends Component {
    render() {
        return (
            <div className="titlewindow">

                <div className="card">

                    <div className="card-header  text-white bg-primary mb-3" >属性信息</div>
                    <div>
                        <nav className="navbar navbar-light bg-light justify-content-between">
                            {/*<div className="dropdown">*/}
                                {/*<button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="false" aria-expanded="true">*/}
                                    {/*条件*/}
                                {/*</button>*/}
                                {/*<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">*/}
                                    {/*<a className="dropdown-item" >高铁</a>*/}
                                    {/*<a className="dropdown-item" >火车</a>*/}
                                    {/*<a className="dropdown-item" >动车</a>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                            <select>
                                <option selected>高铁</option>
                                <option value="1">火车</option>
                                <option value="2">动车</option>
                            </select>
                            <br/>
                            <form className="form-inline">
                                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">搜索</button>
                            </form>
                        </nav>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">属性编辑</h5>
                        <p className="card-text">
                            <input type="text" class="form-control" placeholder="名称" aria-label="名称" aria-describedby="basic-addon1"/>
                            <input type="text" class="form-control" placeholder="状态" aria-label="状态" aria-describedby="basic-addon1"/>
                            <input type="text" class="form-control" placeholder="时间" aria-label="时间" aria-describedby="basic-addon1"/>
                            <input type="text" class="form-control" placeholder="属于" aria-label="属于" aria-describedby="basic-addon1"/>
                        </p>
                        <a href="#" class="btn btn-primary">编辑</a>
                        <a href="#" class="btn btn-primary">下一步</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Titlewindows;
