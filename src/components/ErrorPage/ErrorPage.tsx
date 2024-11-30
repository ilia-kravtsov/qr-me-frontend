import { Component } from 'react';
import { Link } from "react-router-dom";
import s from './ErrorPage.module.scss'

export class ErrorPage extends Component {
  render() {
    return (
      <div className={s.container}>
        <h1>404</h1>
        <h2>Упс! Что-то пошло не так, этой страницы не существует.</h2>
        <Link to={'/'}>
        <button className={s.returnButton}>на главную</button>
        </Link>
      </div>
    )
  }
}