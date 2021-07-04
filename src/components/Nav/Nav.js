import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Nav.css';
export class Nav extends Component {
  //can not use an <a></a> tag for links in React, it causes a page re render.  Need to use the 'Link" tag as below. On the css side however, they act like an 'a tag'.  Nothing changes in the css.

  //Notice the active inline syntax for links below "activeStyle" and "activeClassName"---if the second, define the properties in the css document.
  render() {
    return (
      <nav className="Navbar">
        <div className="h1-logo">
          <h1>
            <Link to="/">Movie with friends!</Link>
          </h1>
        </div>
        <div className="right-side-nav">
          <ul>
            <li>
              <NavLink activeClassName="selected" to="/sign-up">
                Sign up
              </NavLink>
            </li>
            <li>
              <NavLink
                activeStyle={{ borderBottom: '1px solid white' }}
                to="/login"
              >
                Login
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
export default Nav;
