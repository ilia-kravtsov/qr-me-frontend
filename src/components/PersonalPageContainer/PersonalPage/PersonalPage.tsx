import React, { ChangeEvent, Component } from 'react';
import s from './PersonalPage.module.scss';
import { PersonalPageProps, PersonalSiteType } from './PersonalPageTypes';
import { Navigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { toastPositionConfig } from '../../../utils/utils';
import { Loader } from '../../Loader/Loader';

type PersonalSiteMethods = {
  checkEditCode: (editCode: string) => void;
  removePageCB: () => void;
};

export class PersonalPage extends Component<PersonalPageProps & PersonalSiteMethods, PersonalSiteType> {
  constructor(props: PersonalPageProps & PersonalSiteMethods) {
    super(props);

    this.state = {
      isEnterCodeOpen: false,
      editCodeFromUser: '',
    };
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ editCodeFromUser: e.target.value });
  };

  confirmEdit = () => {
    this.props.checkEditCode(this.state.editCodeFromUser);
    this.setState({ editCodeFromUser: '' });
  };

  editPage = () => {
    this.setState({ isEnterCodeOpen: !this.state.isEnterCodeOpen });
  };

  componentDidUpdate(prevProps: PersonalPageProps) {
    const { checkUserEditCodeStatus } = this.props;
    if (prevProps.checkUserEditCodeStatus !== 'error' && checkUserEditCodeStatus === 'error') {
      toast.error('Введен не верный код. Попробуйте снова.', toastPositionConfig);
    }

    if (prevProps.checkUserEditCodeStatus !== 'success' && checkUserEditCodeStatus === 'success') {
      toast.success('Код успешно проверен. Страница доступна для редактирования.', toastPositionConfig);
    }

    if (
      prevProps.checkUserEditCodeStatus === 'loading' &&
      (checkUserEditCodeStatus === 'success' || checkUserEditCodeStatus === 'error')
    ) {
      this.setState({ isEnterCodeOpen: false, editCodeFromUser: '' });
    }
  }

  render() {
    const { data, checkUserEditCodeStatus } = this.props;

    if (checkUserEditCodeStatus === 'success') {
      return <Navigate to="/form" state={{ data }} replace />;
    }

    const { isEnterCodeOpen, editCodeFromUser } = this.state;

    return (
      <div className={s.container}>
        <div className={s.editCard}>
          <h2>Визитная карточка</h2>
          <button type={'button'} onClick={this.editPage}>
            <img src="/personalpage/edit.svg" alt="Кнопка редактирования" />
          </button>
          {isEnterCodeOpen && (
            <div className={s.editModeContainer}>
              {checkUserEditCodeStatus === 'loading' ? (
                <div className={s.editCodeBox}>
                  <Loader />
                </div>
              ) : (
                <div className={s.editCodeBox}>
                  <input
                    className={s.editCodeInput}
                    type="number"
                    value={editCodeFromUser}
                    onChange={this.handleInputChange}
                    placeholder="КОД"
                  />
                  <button type="button" onClick={this.confirmEdit}>
                    <img src="/personalpage/edit-confirm.svg" alt="" className={s.editConfirm} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className={s.main}>
          {data.photo && (
            <div>
              <img src={data.photo} alt={`${data.first_name} ${data.last_name}`} className={s.photo} />
            </div>
          )}

          <div className={s.fio}>
            <h2>{data.last_name}</h2>
            <h2>{data.first_name}</h2>
            {data.middle_name && <h2>{data.middle_name}</h2>}
          </div>

          <div className={s.position}>
            <img src="/personalpage/user.svg" alt="Иконка с человечком" />
            {data.position && <p>{`${data.position}`}</p>}
          </div>

          <div className={s.contacts}>
            <h2 className={s.label}>Контакты</h2>

            <div className={s.gridContacts}>
              <div className={s.contactsData}>
                {data.company && (
                  <p className={s.columnWidth}>
                    <img src="/personalpage/company.svg" alt="" />
                    <span className={s.description}>{`${data.company}`}</span>
                  </p>
                )}

                {data.address && (
                  <p className={s.columnWidth}>
                    <img src="/personalpage/address.svg" alt="" />
                    <span className={s.description}>{`${data.address}`}</span>
                  </p>
                )}

                {data.about && (
                  <p className={s.columnWidth}>
                    <img src="/personalpage/description.svg" alt="" />
                    <span className={s.description}>{`${data.about}`}</span>
                  </p>
                )}
              </div>
              <div className={s.communication}>
                {data.phones && data.phones.length > 0 && (
                  <div className={s.phoneMargin}>
                    <ul>
                      {data.phones.map((phone) => (
                        <li key={phone.phone_id}>
                          <img className={s.phoneImage} src="/personalpage/phone.svg" alt="" />
                          {phone.number}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {data.emails && data.emails.length > 0 && (
                  <div className={s.mailMargin}>
                    <ul>
                      {data.emails.map((email) => (
                        <li key={email.email_id}>
                          <img className={s.mailImage} src="/personalpage/mail.svg" alt="" />
                          {email.email_address}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={s.gridLinks}>
            {data.websites && data.websites.length > 0 && (
              <div>
                <h2 className={s.label}>Веб-сайты</h2>
                <ul className={s.websiteLinks}>
                  {data.websites.map((website) => (
                    <li key={website.website_id}>
                      <img src="/personalpage/website.svg" alt="" />
                      <a href={website.website_address} target="_blank" rel="noopener noreferrer">
                        {website.website_address.slice(0, 20)}
                        {website.website_address.length > 20 ? '...' : ''}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {data.socials && data.socials.length > 0 && (
              <div>
                <h2 className={s.label}>Социальные сети</h2>
                <ul className={s.socialLinks}>
                  {data.socials.map((social) => {
                    const supportedPlatforms: string[] = [
                      'vk',
                      'facebook',
                      'instagram',
                      'twitter',
                      'tiktok',
                      'youtube',
                      'linkedin',
                      'github',
                      'pinterest',
                      'behance',
                      'skype',
                      'twitch',
                      'whatsapp',
                      'viber',
                      'classmates',
                      'patreon',
                      'telegram',
                    ];

                    let platformName: string = '';

                    if (social.social_url.startsWith('https://t.me/') || social.social_url.startsWith('@')) {
                      platformName = 'telegram';
                    } else if (social.social_url.startsWith('https://wa.me/')) {
                      platformName = 'whatsapp';
                    } else {
                      const match = social.social_url.match(/(?:https?:\/\/)?(?:www\.)?([^./]+)\./);
                      platformName = match && match[1] ? match[1].toLowerCase() : '';
                    }

                    const isSupported = supportedPlatforms.includes(platformName);
                    const iconPath = isSupported ? `/socials/${platformName}.svg` : `/socials/website.svg`;

                    const iconClassName = isSupported ? s.socialIcon : `${s.socialIcon} ${s.websiteIcon}`;

                    return (
                      <li key={social.social_row_id}>
                        <a href={social.social_url} target="_blank" rel="noopener noreferrer">
                          <img src={iconPath} alt={platformName} className={iconClassName} />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
          <ToastContainer />
        </div>
      </div>
    );
  }
}
