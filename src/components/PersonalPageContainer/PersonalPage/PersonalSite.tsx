import { ChangeEvent, Component } from 'react';
import s from './PersonalPage.module.scss';
import { PersonalPageProps, PersonalSiteType } from './PersonalPageTypes';
import { Navigate } from 'react-router-dom';

type PersonalSiteMethods = {
  checkEditCode: (editCode: string) => void
  removePageCB: () => void
}

export class PersonalSite extends Component<PersonalPageProps & PersonalSiteMethods, PersonalSiteType> {

  constructor(props: PersonalPageProps & PersonalSiteMethods) {
    super(props);

    this.state = {
      isEnterCodeOpen: false,
      editCodeFromUser: '',
    }
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ editCodeFromUser: e.target.value });
  };

  confirmEdit = () => {
    this.setState({ isEnterCodeOpen: false });
    this.props.checkEditCode(this.state.editCodeFromUser);
  };

  removePage = () => {

  }

  editPage = () => {
    this.setState({ isEnterCodeOpen: true });
  }

  render() {
    const { data, checkUserEditCodeStatus } = this.props;

    if (checkUserEditCodeStatus === 'success') {
      return (
        <Navigate
          to="/form"
          state={{ data }}
          replace
        />
      );
    }

    const { isEnterCodeOpen, editCodeFromUser } = this.state;

    return (
      <div className={s.container}>
        {data.photo && (
          <div>
            <img src={data.photo} alt={`${data.first_name} ${data.last_name}`} className={s.photo} />
          </div>
        )}
        <h2>{data.first_name}</h2>
        <h2>{data.last_name}</h2>
        {data.middle_name && <h2>{data.middle_name}</h2>}
        {data.company && <p>{`Company: ${data.company}`}</p>}
        {data.position && <p>{`Position: ${data.position}`}</p>}
        {data.address && <p>{`Address: ${data.address}`}</p>}
        {data.about && <p>{`About: ${data.about}`}</p>}

        {data.phones && data.phones.length > 0 && (
          <div>
            <h3>Phones</h3>
            <ul>
              {data.phones.map((phone) => (
                <li key={phone.phone_id}>{phone.number}</li>
              ))}
            </ul>
          </div>
        )}

        {data.emails && data.emails.length > 0 && (
          <div>
            <h3>Emails</h3>
            <ul>
              {data.emails.map((email) => (
                <li key={email.email_id}>{email.email_address}</li>
              ))}
            </ul>
          </div>
        )}

        {data.websites && data.websites.length > 0 && (
          <div>
            <h3>Websites</h3>
            <ul>
              {data.websites.map((website) => (
                <li key={website.website_id}>
                  <a href={website.website_address} target="_blank" rel="noopener noreferrer">
                    {website.website_address}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {data.socials && data.socials.length > 0 && (
          <div>
            <h3>Socials</h3>
            <ul>
              {data.socials.map((social) => (
                <li key={social.social_row_id}>
                  <a href={social.social_url} target="_blank" rel="noopener noreferrer">
                    {social.social_url}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <button type={'button'} onClick={this.removePage}>Удалить страницу</button>
          <button type={'button'} onClick={this.editPage}>Редактировать страницу</button>
        </div>

        {isEnterCodeOpen && (
          <div className={s.editModeContainer}>
            <input
              type="number"
              value={editCodeFromUser}
              onChange={this.handleInputChange}
              placeholder="Введите код"
            />
            <button type="button" onClick={this.confirmEdit}>Подтвердить</button>
          </div>
        )}
      </div>
    );
  }
}