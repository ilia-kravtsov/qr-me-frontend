import { Component } from 'react';
import s from './Home.module.scss';
import { Link } from 'react-router-dom';

export class HomeBanner extends Component {
  render() {
    return (
      <section className={s.intro_section}>
        <div>
          <h1 className={s.intro_text}>Создайте свой персональный сайт за несколько минут!</h1>
          <p className={s.section_paragraph}>
            Все ваши социальные сети и контакты в одном месте с уникальным QR-кодом.
          </p>
          <Link to={'/form'}>
            <button className={s.btn}>Создать</button>
          </Link>
        </div>
        <div className={s.intro_image}>
          <img src="home/qr_3.png" alt="Телефон с визиткой" />
        </div>
      </section>
    );
  }
}
