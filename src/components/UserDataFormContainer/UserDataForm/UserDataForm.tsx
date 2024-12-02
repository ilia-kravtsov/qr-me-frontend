import { ChangeEvent, Component, FormEvent } from 'react';
import s from './UserDataForm.module.scss';
import { v1 } from 'uuid';
import {
  ArrayFieldType,
  Field, FieldType, socialsIcons, socialsLinks,
  UserDataFormProps,
  UserDataFormState,
} from './UserDataFormTypes';
import InputMask from 'react-input-mask';
import { Loader } from '../../Loader/Loader';

class UserDataForm extends Component<UserDataFormProps, UserDataFormState> {

  constructor(props: UserDataFormProps) {
    super(props);

    this.state = {
      predefinedFields: this.props.predefinedFields,
      phones: this.props.phones,
      emails: this.props.emails,
      websites: this.props.websites,
      socialsIcons: this.props.socialsIcons,
      socialsLinks: [{ id: 1, social_url: '' }],
      fieldsErrors: {},
    };
  }

  addField = (fieldType: ArrayFieldType) => {
    const newField = {
      id: v1(),
      label: fieldType === 'phones' ? 'Phone' : fieldType === 'emails' ? 'Email' : 'Website',
      type: fieldType === 'phones' ? 'tel' : fieldType === 'emails' ? 'email' : 'url',
      value: '',
      required: false,
      placeholder:
        fieldType === 'phones'
          ? '+7 999 999 99 99'
          : fieldType === 'emails'
            ? 'ivanov@mail.ru'
            : 'https://some.ru',
    };

    this.setState((prevState) => ({
      ...prevState,
      [fieldType]: [newField, ...prevState[fieldType]],
    }));
  };

  handleRemoveField = (id: string, fieldType: ArrayFieldType) => {
    this.setState((prevState) => ({
      ...prevState,
      [fieldType]: prevState[fieldType].filter((field) => field.id !== id),
    }));
  };

  handleChangeFieldValue = (fieldType: FieldType, id: string, value: string) => {
    this.setState((prevState) => {
      const fields = prevState[fieldType] as Field[];

      const updatedFields = fields.map((field) =>
        field.id === id ? { ...field, value } : field
      );

      return { ...prevState, [fieldType]: updatedFields };
    });
  };

  handleChangeSocialsFields = (socialId: number, e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    this.setState((prevState) => {
      const updatedSocialsLinks = prevState.socialsLinks.map(link => {
        if (link.id === socialId) {
          return { ...link, social_url: value };
        }
        return link;
      });

      return { socialsLinks: updatedSocialsLinks };
    });
  }

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const allFields = {
      predefinedFields: this.state.predefinedFields,
      phones: this.state.phones,
      emails: this.state.emails,
      websites: this.state.websites,
      socials: this.state.socialsLinks,
    };

    if (!this.isFormValid()) {
      return;
    }

    this.props.onSubmit(allFields);

    this.setState({
      predefinedFields: this.props.predefinedFields,
      phones: this.props.phones,
      emails: this.props.emails,
      websites: this.props.websites,
      socialsIcons: this.props.socialsIcons,
      socialsLinks: [],
      fieldsErrors: {},
    });
  };

  handleSocialIconClick = (socialId: number) => {
    this.setState((prevState) => {
      const isSocialExists = prevState.socialsLinks.some(link => link.id === socialId);

      if (isSocialExists) {
        return {
          socialsLinks: prevState.socialsLinks.filter(link => link.id !== socialId)
        };
      } else {
        return {
          socialsLinks: [...prevState.socialsLinks, { id: socialId, social_url: '' }]
        };
      }
    });
  }

  handleValidation = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>, label: string) => {
    const input = e.target as HTMLInputElement;
    const fieldId = input.id;
    let errorMessage = '';
    let processedValue = input.value;

    switch (label) {
      case 'Имя *':
      case 'Фамилия *':
      case 'Отчество':
      case 'Должность': {
        const textPattern = /[^A-Za-zА-Яа-яЁё\-]/g;
        const invalidCharacters = processedValue.match(textPattern);
        processedValue = processedValue.replace(textPattern, '');
        if (invalidCharacters) {
          errorMessage = 'Вводите только латинские или кириллические буквы.';
        }
        break;
      }

      case 'Адрес': {
        const addressAndCompanyPattern = /[^A-Za-zА-Яа-яЁё0-9\s./№,-]/g;
        const invalidCharacters = processedValue.match(addressAndCompanyPattern);
        processedValue = processedValue.replace(addressAndCompanyPattern, '');
        if (invalidCharacters) {
          errorMessage = 'Вводите только буквы, цифры, пробелы, точки, дефисы, слэши или "№".';
        }
        break;
      }

      case 'Компания': {
        const addressAndCompanyPattern = /[^A-Za-zА-Яа-яЁё0-9\s./№"'«»@&\-]/g;
        const invalidCharacters = processedValue.match(addressAndCompanyPattern);
        processedValue = processedValue.replace(addressAndCompanyPattern, '');
        if (invalidCharacters) {
          errorMessage = 'Вводите только буквы, цифры, пробелы, точки, дефисы, слэши, кавычки или "№".';
        }
        break;
      }

      case 'Телефон': {
        const phonePattern = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
        if (!phonePattern.test(processedValue)) {
          errorMessage = 'Формат: +7 (999) 999-99-99.';
        }
        break;
      }

      case 'Email': {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (processedValue.length && processedValue.length > 6 && !processedValue.includes('@')) {
          if (!emailPattern.test(processedValue)) {
            errorMessage = 'Формат почты example@mail.ru.';
          }
        }
        break;
      }

      case 'Telegram': {
        const urlPattern = /^(https?:\/\/)/;
        const telegramPattern = /^@([A-Za-z0-9_]{5,})$/;

        if (
          processedValue.startsWith('http://') ||
          processedValue.startsWith('https://') ||
          telegramPattern.test(processedValue)
        ) {
          errorMessage = '';
        } else if (
          processedValue.length > 6 &&
          !urlPattern.test(processedValue) &&
          !telegramPattern.test(processedValue)
        ) {
          errorMessage = 'Формат URL: http://, https://, или @username.';
        }
        break;
      }

      case 'Website': {
        const urlPattern = /^(https?:\/\/)/;

        if (
          processedValue.startsWith('http://') ||
          processedValue.startsWith('https://')
        ) {
          errorMessage = '';
        } else if (
          processedValue.length > 7 &&
          !urlPattern.test(processedValue)
        ) {
          errorMessage = 'Формат URL: http://, https://';
        }
        break;
      }

      default:
        break;
    }

    input.value = processedValue;

    this.setState((prevState) => ({
      fieldsErrors: {
        ...prevState.fieldsErrors,
        [fieldId]: errorMessage,
      },
    }));
  };

  handleBlurValidation = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>, label: string) => {
    const input = e.target as HTMLInputElement;
    let errorMessage = '';
    let processedValue = input.value;

    switch (label) {
      case 'Email': {
        if (processedValue.length) {
          if (processedValue.includes('@')) {
            const atIndex = processedValue.indexOf('@');
            const afterAt = processedValue.slice(atIndex + 1);
            const domainPattern = /^[a-zA-Z0-9-]{2,}\.[a-zA-Z]{2,}$/;

            if (!domainPattern.test(afterAt)) {
              errorMessage = 'После "@" должен быть домен с точкой и хотя бы двумя символами после точки, например "domain.com".';
            }
          } else {
            errorMessage = 'Введите корректный email с символом "@"';
          }
        }
        break;
      }

      case 'Website': {
        if (processedValue.length) {
          if (
            processedValue.startsWith('http://') ||
            processedValue.startsWith('https://')
          ) {
            errorMessage = '';
          } else {
            errorMessage = 'Формат ссылки: http://, https://';
          }
          break;
        }
        break;
      }

      case 'Адрес': {
        const addressPattern = /\d/;
        if (processedValue.length) {
          if (!addressPattern.test(processedValue)) {
            errorMessage = 'Адрес должен содержать хотя бы одну цифру.';
          }
          break;
        }
        break;
      }

      case 'Phone': {
        const phonePattern = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;

        if (processedValue.length) {
          if (!phonePattern.test(processedValue)) {
            errorMessage = 'Формат: +7 (999) 999-99-99.';
          }
        }
        break;
      }

      default:
        break;
    }

    const fieldId = input.id;
    this.setState((prevState) => ({
      fieldsErrors: {
        ...prevState.fieldsErrors,
        [fieldId]: errorMessage,
      },
    }));
  };

  handleValidationSocials = (e: FormEvent<HTMLInputElement>, socialId: number) => {
    const input = e.target as HTMLInputElement;
    const value = input.value;

    const urlPattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i;
    const telegramPattern = /^@([A-Za-z0-9_]{5,})$/;

    let errorMessage = '';
    if (value.length > 15 && !urlPattern.test(value) && !telegramPattern.test(value)) {
      errorMessage = 'Формат: https://some.ru http:// @username';
    }

    const errorKey = `social_${socialId}`;
    this.setState((prevState) => ({
      fieldsErrors: {
        ...prevState.fieldsErrors,
        [errorKey]: errorMessage,
      },
    }));
  };

  handleBlurValidationSocials = (e: FormEvent<HTMLInputElement>, socialId: number) => {
    const input = e.target as HTMLInputElement;
    const value = input.value.trim();

    const urlPattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i;
    const telegramPattern = /^@([A-Za-z0-9_]{5,})$/;

    let errorMessage = '';
    if (value.length > 0) {
      if (!urlPattern.test(value) && !telegramPattern.test(value)) {
        errorMessage = 'Формат: https://some.ru http:// @username';
      }
    }

    const errorKey = `social_${socialId}`;
    this.setState((prevState) => ({
      fieldsErrors: {
        ...prevState.fieldsErrors,
        [errorKey]: errorMessage,
      },
    }));
  };

  renderFields = (fields: Field[], fieldType: FieldType) => {
    if (!fields || fields.length === 0) return null;

    return (
      <div className={s.renderFieldsContainer}>
        {['websites', 'emails', 'phones'].includes(fieldType) && (
          <button
            onClick={() => this.addField(fieldType as ArrayFieldType)}
            className={s.addFieldButton}
            type={'button'}
          >
            +
          </button>
        )}
        {fields.map(
          ({
             id,
             label,
             type = 'text',
             value,
             required = false,
             placeholder = '',
             minLength = 2,
             pattern,
             title,
           }) => {
            const inputClassName = `${s.input} ${
              this.state.fieldsErrors[id] ? s.inputError : ''
            }`;
            const maxLength = 200;
            const handleInputChange = (
              e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => this.handleChangeFieldValue(fieldType, id, e.target.value);

            const renderInput = () => {
              if (label === 'Описание') {
                return (
                  <textarea
                    id={id}
                    value={value}
                    placeholder={placeholder}
                    required={required}
                    minLength={minLength}
                    maxLength={maxLength}
                    title={title}
                    onBlur={(e) => this.handleBlurValidation(e, label)}
                    onInput={(e) => this.handleValidation(e, label)}
                    onChange={handleInputChange}
                    className={`${inputClassName} ${s.description}`}
                  />
                );
              }

              if (type === 'tel') {
                return (
                  <InputMask
                    mask="+7 (999) 999-99-99"
                    value={value}
                    onBlur={(e) => this.handleBlurValidation(e, label)}
                    onInput={(e) => this.handleValidation(e, label)}
                    onChange={handleInputChange}
                  >
                    {(inputProps) => (
                      <input
                        {...inputProps}
                        id={id}
                        type="tel"
                        placeholder={placeholder}
                        required={required}
                        className={s.input}
                      />
                    )}
                  </InputMask>
                );
              }

              return (
                <input
                  id={id}
                  type={type}
                  value={value}
                  placeholder={placeholder}
                  required={required}
                  minLength={minLength}
                  maxLength={maxLength}
                  pattern={pattern}
                  title={title}
                  onBlur={(e) => this.handleBlurValidation(e, label)}
                  onInput={(e) => this.handleValidation(e, label)}
                  onChange={handleInputChange}
                  className={inputClassName}
                />
              );
            };

            return (
              <div key={id} className={s.field}>
                <label htmlFor={id} className={s.fieldLabel}>
                  {label}
                </label>
                {renderInput()}
                {this.state.fieldsErrors[id] && (
                  <div className={s.errorMessage}>
                    {this.state.fieldsErrors[id]}
                  </div>
                )}
                {['websites', 'emails', 'phones'].includes(fieldType) && (
                  <button
                    type="button"
                    className={s.removeFieldButton}
                    onClick={() => this.handleRemoveField(id, fieldType as ArrayFieldType)}
                  >
                    -
                  </button>
                )}
              </div>
            );
          }
        )}
      </div>
    );
  };

  renderSocialsIcons = (fields: socialsIcons[]) => {
    const { socialsLinks } = this.state;

    return fields.map(({ id, name, icon_link }) => {
      const isHighlighted = socialsLinks.some((link) => link.id === id);
      const iconClassName = `${s.socialIcon} ${isHighlighted ? s.highlighted : ''}`;
      return (
        <li key={id}>
          <img src={icon_link} alt={name} onClick={() => this.handleSocialIconClick(id)} className={iconClassName} />
        </li>
      );
    });
  };

  renderSocialsFields = (socialsLinks: socialsLinks[]) => {
    const { fieldsErrors } = this.state;

    return socialsLinks.map(({ id }) => {
      const errorKey = `social_${id}`;
      const errorMessage = fieldsErrors[errorKey];

      return (
        <li key={id}>
          <input
            type="url"
            onChange={(e) => this.handleChangeSocialsFields(id, e)}
            onBlur={(e) => this.handleBlurValidationSocials(e, id)}
            onInput={(e) => this.handleValidationSocials(e, id)}
            placeholder="https://some.ru"
            className={`${s.input} ${errorMessage ? s.inputError : ''}`}
          />
          {errorMessage && <div className={s.errorMessage}>{errorMessage}</div>}
        </li>
      );
    });
  };

  isFormValid = () => {
    const { fieldsErrors } = this.state;
    const hasNoErrors = Object.values(fieldsErrors).every(error => error === '');
    const hasNoEmptyRequiredFields = this.state.predefinedFields.every(field => !field.required || field.value?.trim());
    return hasNoErrors && hasNoEmptyRequiredFields;
  };

  render() {
    const { predefinedFields, phones, emails, websites, socialsIcons, socialsLinks } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className={s.userDataForm} noValidate>
        <fieldset className={s.predefinedFields}>{this.renderFields(predefinedFields, 'predefinedFields')}</fieldset>

        <fieldset className={s.predefinedFields}>
          <legend>Телефоны:</legend>
          {this.renderFields(phones, 'phones')}
        </fieldset>

        <fieldset className={s.predefinedFields}>
          <legend>Электронная почта:</legend>
          {this.renderFields(emails, 'emails')}
        </fieldset>

        <fieldset className={s.predefinedFields}>
          <legend>Сайты:</legend>
          {this.renderFields(websites, 'websites')}
        </fieldset>

        <fieldset className={s.additionalFields}>
          <legend>Социальные сети</legend>
          <div className={s.socialsContainer}>
            <ul className={s.socialsIcons}>{this.renderSocialsIcons(socialsIcons)}</ul>
            <ul className={s.sodcialsFields}>{this.renderSocialsFields(socialsLinks)}</ul>
          </div>
        </fieldset>

        <button type="submit" disabled={!this.isFormValid()} className={s.submitButton}>
          {this.props.submitStatus === 'loading' ? <Loader /> : 'Получить QR код и ссылку'}
        </button>

        {Object.values(this.state.fieldsErrors).some((error) => error.includes('не уникально')) && (
          <div className={s.formError}>Пожалуйста, убедитесь, что все значения уникальны.</div>
        )}
      </form>
    );
  }
}

export default UserDataForm;
