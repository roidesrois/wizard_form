// Core
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import cx from "classnames";

// Actions
import { authActions } from "../../bus/auth/actions";

// Instruments
import Styles from "./styles.m.css";
import { book } from "../../routes/book";
import { Menu, Icon } from "antd";
import "antd/lib/menu/style/css";

const SubMenu = Menu.SubMenu;

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.get("isAuthenticated"),
    profile: state.profile
  };
};

@connect(
  mapStateToProps,
  { logoutAsync: authActions.logoutAsync }
)
export class Header extends Component {
  state = {
    current: "mail"
  };

  handleClick = e => {
    console.log("click ", e);
    this.setState({
      current: e.key
    });
  };

  _getNav = () => {
    const { isAuthenticated, profile } = this.props;

    return isAuthenticated ? (
      <>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
          style={{ width: "100%" }}
        >
          {/* <Menu.Item key = 'home'>
                        <Link to = { book.feed }>
                            <Icon type = 'home' /> Home
                        </Link>
                    </Menu.Item> */}

          <Menu.Item key="app">
            <Link to={book.questionnaire}>
              <Icon type="audit" /> Application
            </Link>
          </Menu.Item>

          <SubMenu
            style={{ float: "right" }}
            title={
              <span className="submenu-title-wrapper">
                <img src="https://lab.lectrum.io/redux/api/image/0ma55trt6xe2/O7YZ9Iczw7.jpg" />
                {profile.get("firstName")}
                &nbsp;
                {profile.get("lastName")}
              </span>
            }
          >
            {/*<Menu.Item key = 'setting:2'><Link to = { book.profile }>Profile</Link></Menu.Item>*/}
            <Menu.Item key="setting:3">
              <Link to={book.newPassword}>Change password</Link>
            </Menu.Item>
            <Menu.Item key="setting:4">
              <Link to={book.updateEmail}>Change email</Link>
            </Menu.Item>
            <Menu.Item key="setting:1" onClick={this._logout}>
              Logout
            </Menu.Item>
          </SubMenu>
        </Menu>
      </>
    ) : (
      <>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
          style={{ width: "100%" }}
        >
          <Menu.Item key="login">
            <Link to={book.login}>
              <Icon type="login" /> Login
            </Link>
          </Menu.Item>

          <Menu.Item key="user">
            <Link to={book.signup}>
              <Icon type="user" /> Registration
            </Link>
          </Menu.Item>
        </Menu>
      </>
    );
  };

  _logout = () => {
    this.props.logoutAsync();
  };

  render() {
    const navigation = this._getNav();

    return <header className={Styles.header}>{navigation}</header>;
  }
}
