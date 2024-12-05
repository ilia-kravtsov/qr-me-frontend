import { Component } from 'react';
import s from './Home.module.scss';

export class HomeDevelopers extends Component {
  render() {
    return (
      <section className={s.developers_section}>
        <h2 className={s.section_title}>Разработчики</h2>
        <div className={s.developers}>
          <div className={s.row_1}>
            <div className={s.developer}>
              <img src="home/2.jpg" alt="Developer 1" className={s.developer_photo} />
              <div className={s.developer_info}>
                <p className={s.developer_name}>Александр Михайленко</p>
                <p className={s.developer_role}>Backend</p>
                <div className={s.developer_icons}>
                  <a href="https://t.me/agmikhaylenko">
                    <img src="home/icon-telegram.svg" alt="Telegram" />
                  </a>
                  <a href="https://github.com/AGMikhaylenko/qr-me-backend">
                    <img src="home/icon-github.svg" alt="GitHub" />
                  </a>
                </div>
              </div>
            </div>
            <div className={s.developer}>
              <img src="home/3.jpg" alt="Developer 2" className={s.developer_photo} />
              <div className={s.developer_info}>
                <p className={s.developer_name}>Анастасия Егорова</p>
                <p className={s.developer_role}>Дизайнер</p>
                <div className={s.developer_icons}>
                  <a href="https://t.me/loriveki">
                    <img src="home/icon-telegram.svg" alt="Telegram" />
                  </a>
                </div>
              </div>
            </div>
            <div className={s.developer}>
              <img src="home/1.jpg" alt="Developer 3" className={s.developer_photo} />
              <div className={s.developer_info}>
                <p className={s.developer_name}>Илья Кравцов</p>
                <p className={s.developer_role}>Frontend</p>
                <div className={s.developer_icons}>
                  <a href="https://t.me/kravtsov_ilia">
                    <img src="home/icon-telegram.svg" alt="Telegram" />
                  </a>
                  <a href="https://github.com/ilia-kravtsov/qr-me-frontend.git">
                    <img src="home/icon-github.svg" alt="GitHub" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className={s.row_2}>
            <div className={s.developer}>
              <img src="home/4.jpg" alt="Developer 4" className={s.developer_photo} />
              <div className={s.developer_info}>
                <p className={s.developer_name}>Леонид Царев</p>
                <p className={s.developer_role}>Аналитик</p>
                <div className={s.developer_icons}>
                  <a href="https://t.me/g_guslin">
                    <img src="home/icon-telegram.svg" alt="Telegram" />
                  </a>
                </div>
              </div>
            </div>
            <div className={s.developer}>
              <img src="home/0.jpg" alt="Developer 5" className={s.developer_photo} />
              <div className={s.developer_info}>
                <p className={s.developer_name}>Алексей Барановский</p>
                <p className={s.developer_role}>Frontend</p>
                <div className={s.developer_icons}>
                  <a href="https://t.me/Morty_Morrrt">
                    <img src="home/icon-telegram.svg" alt="Telegram" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
