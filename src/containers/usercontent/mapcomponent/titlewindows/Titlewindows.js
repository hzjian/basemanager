import React, { Component } from 'react'
import { Button, Select, notification,Card,Icon,Input,Form } from 'antd';
import {callApi} from "../../../../utils/apiUtils";
const FormItem = Form.Item;
const { Option, OptGroup } = Select;
const Search = Input.Search;
const gridStyle = {
    display:"none"
};
class Titlewindows extends Component {
    render() {
        return (
            <div className="titlewindow" style={gridStyle} id="titlewindowid">
                <Card title="属性信息" extra={[ <Button type="primary" icon="close" onClick={titleWindowClose}  />]} style={{ width: 300,header:25 }}>
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
                            placeholder="请输入查询条件"
                            onSearch={value => console.log(value)}
                            enterButton
                        />
                    </div>

                    <div className="card-body">
                        <h5 className="card-title">属性编辑</h5>
                        <Form onSubmit={this.handleSubmit}>
                            <Input placeholder="任务名称"/>
                            <Input placeholder="任务状态"/>
                            <Input placeholder="任务时间"/>
                            <Input placeholder="任务属于"/>
                        </Form>
                    <br/>
                        <a href="#" class="btn btn-primary">编辑</a>
                        &nbsp;
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
