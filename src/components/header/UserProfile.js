import React from "react";
import PropTypes from "prop-types";

const UserProfile = ({ user, handleLogout }) => {
  return (
    <li className="dropdown nav-item">
      <a
        href=""
        className="dropdown-toggle nav-link"
        data-toggle="dropdown"
        role="button"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <span className="fa fa-user" style={{ marginRight: "0.5em" }} />
        {user || "Anonymous"}
        <span className="caret" />
      </a>
      <ul className="dropdown-menu" style={{ right: 0, left: "auto" }}>
        <a className="dropdown-item" href="" onClick={handleLogout}>
          <i className="fa fa-sign-out" style={{ marginRight: "0.5em" }} />
          退出
        </a>
        <div className="dropdown-divider" />
        <a
          className="dropdown-item"
          href="http://www.tulibj.com/"
          target="_blank"
          title="图理科技"
          rel="noopener noreferrer"
        >
          <i className="fa fa-github" style={{ marginRight: "0.5em" }} />图理科技
        </a>
      </ul>
    </li>
  );
};

UserProfile.propTypes = {
  user: PropTypes.string,
  handleLogout: PropTypes.func.isRequired
};

export default UserProfile;
