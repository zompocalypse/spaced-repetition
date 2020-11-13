import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import UserContext from '../../contexts/UserContext';
import './Header.css';

class Header extends Component {
  static contextType = UserContext;

  handleLogoutClick = () => {
    this.context.processLogout();
  };

  renderLogoutLink() {
    return (
      <div>
        <span>Hello, {this.context.user.name}</span>
        <nav>
          <Link
            className="navMain"
            onClick={this.handleLogoutClick}
            to="/login"
          >
            Logout
          </Link>
        </nav>
      </div>
    );
  }

  renderLoginLink() {
    return (
      <nav>
        <Link to="/login" className="navMain">
          Login
        </Link>{' '}
        <Link to="/register" className="navMain">
          Sign up
        </Link>
      </nav>
    );
  }

  render() {
    return (
      <header className="header">
        <h1>
          <Link to="/" className="navTitle">
            Autolearn
          </Link>
        </h1>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </header>
    );
  }
}

export default Header;
