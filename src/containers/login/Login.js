import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "./actions";
import Container from '@material-ui/core/Container';
import "./login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state ={
      username: "",
      password: "",
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user && nextProps.role) {
      try {
        let rootpath ="/";
        if(nextProps.role[0] && nextProps.role[0].authority)
        {
          if(nextProps.role[0].authority === "ROLE_ADMIN")
          {
            rootpath ="/sysmanager";
          }
          else
          {
            rootpath ="/ucontent";
          }
        }
        const { from } = this.props.location.state || {
          from: { pathname: rootpath }
        };
        nextProps.history.replace(from);
      } catch (err) {
        nextProps.history.replace("/");
      }
    }
  }

  handleLogin = (event) => {
    event.preventDefault();
    this.props.dispatch(login(this.state.username, this.state.password));
  }

  handleChange = (e) =>{
    this.setState({ [e.target.name]: e.target.value })
  }
  render() {
    const { user, loginError } = this.props;
    return (
      <div className ="LoginRoot">
        <form className="login-form">
          <div className="form-title">十堰专用汽车协会应用管理平台</div>
          <div className="input-group">
            <span className="input-group-addon">
              <i className="fa fa-user" />
            </span>
            <input
              name="username"
              type="text"
              className="form-control"
              placeholder="用户名："
              onChange={this.handleChange}
              required
              autoFocus
            />
          </div>

          <div className="input-group">
            <span className="input-group-addon">
              <i className="fa fa-lock" />
            </span>
            <input
              name="password"
              type="password"
              className="form-control"
              placeholder="密码："
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="checkbox">
            <label>
              {/* <input type="checkbox" value="remember-me" /> 记住 */}
            </label>
          </div>


          <button
            className="btn btn-primary btn-block "
            onClick={this.handleLogin}
          >
            <i className="fa fa-sign-in" />{" "}登 录
          </button>

          {!user &&
            loginError &&
            <div className="alert alert-danger">
              {loginError.message}.
            </div>}
        </form>
      </div>
    );
  }
}

const mapStateToProps = state =>({
  user: state.auth.user,
  role:  state.auth.role,
  loginError: state.auth.loginError
})

export default connect(mapStateToProps)(Login);
