import React, { Component } from 'react';
import s from './Header.module.scss';
import { Navigation } from '../Navigation/Navigation';

export class Header extends Component {
  render() {
    return <header className={s.header}>{/*<Navigation />*/}</header>;
  }
}
