import { Component } from 'react';
import s from './Home.module.scss';

export class HomeSteps extends Component {
  render() {
    return (
      <section className={s.steps}>
        <h2 className={s.section_title}>Как это работает?</h2>
        <div className={s.steps_container}>
          <div className={s.step}>
            <div className={s.circle}>Шаг 1</div>
            <p className={s.section_paragraph}>Введите свои данные</p>
          </div>
          <div className={s.arrow_container}>
            <svg className={s.arrow} viewBox="0 0 210 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M208.768 20.7678C209.744 19.7915 209.744 18.2085 208.768 17.2322L192.858 1.32233C191.882 0.346021 190.299 0.346021 189.322 1.32233C188.346 2.29864 188.346 3.88155 189.322 4.85787L203.464 19L189.322 33.1421C188.346 34.1184 188.346 35.7014 189.322 36.6777C190.299 37.654 191.882 37.654 192.858 36.6777L208.768 20.7678ZM0 21.5H207V16.5H0V21.5Z"
                fill="#F5F5F5"
              />
            </svg>
          </div>
          <div className={s.step}>
            <div className={s.circle}>Шаг 2</div>
            <p className={s.section_paragraph}>Добавьте ссылки</p>
          </div>
          <div className={s.arrow_container}>
            <svg className={s.arrow} viewBox="0 0 210 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M208.768 20.7678C209.744 19.7915 209.744 18.2085 208.768 17.2322L192.858 1.32233C191.882 0.346021 190.299 0.346021 189.322 1.32233C188.346 2.29864 188.346 3.88155 189.322 4.85787L203.464 19L189.322 33.1421C188.346 34.1184 188.346 35.7014 189.322 36.6777C190.299 37.654 191.882 37.654 192.858 36.6777L208.768 20.7678ZM0 21.5H207V16.5H0V21.5Z"
                fill="#F5F5F5"
              />
            </svg>
          </div>
          <div className={s.step}>
            <div className={s.circle}>Шаг 3</div>
            <p className={s.section_paragraph}>Получите уникальный QR-код</p>
          </div>
        </div>
      </section>
    );
  }
}
