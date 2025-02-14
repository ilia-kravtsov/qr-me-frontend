import { Component } from 'react';
import s from './Home.module.scss';

export class HomeAdvantages extends Component {
  render() {
    return (
      <section className={s.advantages}>
        <h2 className={s.section_title}>Преимущества</h2>
        <div className={s.advantages_grid}>
          <div className={s.number}>1</div>
          <p className={s.section_paragraph}>Без регистрации и паролей — создайте страницу мгновенно.</p>
          <div className={s.number}>3</div>
          <p className={s.section_paragraph}>Генерация уникального QR-кода для быстрого доступа.</p>
          <div className={s.number}>2</div>
          <p className={s.section_paragraph}>Добавьте ссылки на ваши социальные сети, мессенджеры и другие контакты.</p>
          <div className={s.number}>4</div>
          <p className={s.section_paragraph}>Удобно делитесь своим профилем с друзьями и коллегами.</p>
        </div>
      </section>
    );
  }
}
