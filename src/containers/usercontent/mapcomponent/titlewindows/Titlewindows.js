import React, { Component } from 'react'
import { Button, Select, notification,Card,Icon,Input } from 'antd';
import {callApi} from "../../../../utils/apiUtils";
const { Option, OptGroup } = Select;
const Search = Input.Search;
const gridStyle = {
    display:"none"
};
class Titlewindows extends Component {

    close(){
        // document.getElementById("titlewindowid").style.display="none";
    }

    render() {
        return (
            <div className="titlewindow" style={gridStyle} id="titlewindowid">
                <Card title="属性信息" extra={[ <Button type="primary" icon="close" onClick={this.close()}  />]} style={{ width: 300 }}>
                    <div>
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
                        <Search
                            placeholder="input search text"
                            onSearch={value => console.log(value)}
                            enterButton
                        />
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
                </Card>
            </div>
        )
    }

}
export function titleWindowClose(state) {
        if(state=="true"){
            document.getElementById("titlewindowid").style.display="";
        }else{
            document.getElementById("titlewindowid").style.display="none";
        }
}
export default Titlewindows;
