import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import s from './Navigation.module.scss';

export class Navigation extends Component {
  render() {
    return (
      <nav className={s.navigationContainer}>
        <ul className={s.navigationLinksList}>
          <li>
            <Link to="/" className={s.link}>
              <img src="/logo/web-app-manifest-192x192.png" alt="" className={s.logo} />
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}
