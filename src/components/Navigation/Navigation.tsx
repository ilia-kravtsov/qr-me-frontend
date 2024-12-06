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
              Home
            </Link>
          </li>
          <li>
            <Link to="/form" className={s.link}>
              Форма
            </Link>
          </li>
          <li>
            <Link to="/users/123123" className={s.link}>
              Персональная страница
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}
