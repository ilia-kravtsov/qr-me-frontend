import React, { ChangeEvent, Component, FormEvent } from 'react';
import s from './UserDataForm.module.scss';
import { v1 } from 'uuid';
import {
  ArrayFieldType,
  Field,
  FieldType,
  socialsIcons,
  socialsLinks,
  UserDataFormProps,
  UserDataFormState,
} from './UserDataFormTypes';
import  ReactInputMask from 'react-input-mask';
import { Loader } from '../../Loader/Loader';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastPositionConfig } from '../../../utils/utils';
import { QR } from '../../QR/QR';

class UserDataForm extends Component<UserDataFormProps, UserDataFormState> {
  constructor(props: UserDataFormProps) {
    super(props);

    this.state = {
      predefinedFields: this.props.predefinedFields,
      phones: this.props.phones,
      emails: this.props.emails,
      websites: this.props.websites,
      socialsIcons: this.props.socialsIcons,
      socialsLinks: this.props.socialsLinks ? this.props.socialsLinks : [],
      fieldsErrors: {},
      isQrGenerated: false,
      setDataForPutStatus: this.props.setDataForPutStatus,
      updatedUserLink: '',
    };
  }

  componentDidUpdate(prevProps: UserDataFormProps) {
    if (this.props.submitStatus === 'success' && prevProps.submitStatus !== 'success') {
      toast.dismiss();
      toast.success('Form submitted successfully', toastPositionConfig);
      this.setState({ isQrGenerated: true });
    }
    if (this.props.submitStatus === 'idle' && prevProps.submitStatus !== 'idle') {
      this.setState({ isQrGenerated: false });
    }
    if (this.props.submitStatus === 'error' && prevProps.submitStatus !== 'error') {
      toast.error(this.props.submitError || 'An unexpected error occurred', toastPositionConfig);
    }
    if (prevProps.submitPutStatus !== this.props.submitPutStatus) {
      if (this.props.submitPutStatus === 'success') {
        toast.dismiss();
        toast.success('Данные успешно обновлены!', toastPositionConfig);
        if (this.props.userId) {
          this.setState({
            updatedUserLink: `http://localhost:3000/${this.props.userId}`,
          });
        }
      }
    }
  }

  addField = (fieldType: ArrayFieldType) => {
    const newField = {
      id: v1(),
      label: fieldType === 'phones' ? 'Phone' : fieldType === 'emails' ? 'Email' : 'Website',
      type: fieldType === 'phones' ? 'tel' : fieldType === 'emails' ? 'email' : 'url',
      value: '',
      required: false,
      placeholder:
        fieldType === 'phones' ? '+7 999 999 99 99' : fieldType === 'emails' ? 'ivanov@mail.ru' : 'https://some.ru',
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

      const updatedFields = fields.map((field) => (field.id === id ? { ...field, value } : field));

      return { ...prevState, [fieldType]: updatedFields };
    });
  };

  handleChangeSocialsFields = (socialId: number, e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    this.setState((prevState) => {
      const updatedSocialsLinks = prevState.socialsLinks.map((link) => {
        if (link.id === socialId) {
          return { ...link, social_url: value };
        }
        return link;
      });

      return { socialsLinks: updatedSocialsLinks };
    });
  };

  handleSocialIconClick = (socialId: number) => {
    this.setState((prevState) => {
      const isSocialExists = prevState.socialsLinks.some((link) => link.id === socialId);

      if (isSocialExists) {
        return {
          socialsLinks: prevState.socialsLinks.filter((link) => link.id !== socialId),
        };
      } else {
        return {
          socialsLinks: [...prevState.socialsLinks, { id: socialId, social_url: '' }],
        };
      }
    });
  };

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

      case 'Phone': {
        const textPattern = /[A-Za-zА-Яа-яЁё]/g;
        const phonePattern = /^(?:\+7|8)\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
        const invalidCharacters = processedValue.match(textPattern);
        processedValue = processedValue.replace(textPattern, '');

        if (processedValue === '') {
          errorMessage = '';
        } else if (invalidCharacters) {
          errorMessage = 'Вводите только цифры';
        } else if (!phonePattern.test(processedValue) && processedValue.length === 18) {
          errorMessage = 'Формат: +7 (999) 999-99-99 или 8 (999) 999-99-99.';
        } else {
          errorMessage = '';
        }

        break;
      }

      case 'Email': {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (processedValue.length && processedValue.length > 8 && !processedValue.includes('@')) {
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

        if (processedValue.startsWith('http://') || processedValue.startsWith('https://')) {
          errorMessage = '';
        } else if (processedValue.length > 7 && !urlPattern.test(processedValue)) {
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
              errorMessage =
                'После "@" должен быть домен с точкой и хотя бы двумя символами после точки, например "domain.com".';
            }
          } else {
            errorMessage = 'Введите корректный email с символом "@"';
          }
        }
        break;
      }

      case 'Website': {
        if (processedValue.length) {
          if (processedValue.startsWith('http://') || processedValue.startsWith('https://')) {
            errorMessage = '';
          } else {
            errorMessage = 'Формат ссылки: http://, https://';
          }
          break;
        }
        break;
      }

      case 'Phone': {
        const textPattern = /[A-Za-zА-Яа-яЁё]/g;
        const phonePattern = /^(?:\+7|8)\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
        const invalidCharacters = processedValue.match(textPattern);
        processedValue = processedValue.replace(textPattern, '');

        if (processedValue === '') {
          errorMessage = '';
        } else if (invalidCharacters) {
          errorMessage = 'Вводите только цифры и символы +, (, ), -, пробел.';
        } else if (!phonePattern.test(processedValue)) {
          errorMessage = 'Формат: +7 (999) 999-99-99 или 8 (999) 999-99-99.';
        } else {
          errorMessage = '';
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
          ({ id, label, type = 'text', value, required = false, placeholder = '', minLength = 2, pattern, title }) => {
            const inputClassName = `${s.input} ${this.state.fieldsErrors[id] ? s.inputError : ''}`;
            const maxLength = 200;
            const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
              this.handleChangeFieldValue(fieldType, id, e.target.value);

            const renderInput = () => {
              if (label === 'Описание' || label === 'Адрес') {
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
                const InputMaskComponent = ReactInputMask as unknown as React.FC<any>;

                return (
                  <InputMaskComponent
                    mask="+7 (999) 999-99-99"
                    value={value}
                    onBlur={(e: FormEvent<HTMLInputElement>) => this.handleBlurValidation(e, label)}
                    onInput={(e: FormEvent<HTMLInputElement>) => this.handleValidation(e, label)}
                    onChange={handleInputChange}
                  >
                    {(inputProps: any) => (
                      <input {...inputProps} id={id} type="tel" placeholder={placeholder} required={required} />
                    )}
                  </InputMaskComponent>
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
                  <div className={fieldType === 'predefinedFields' ? s.errorPredefined : s.errorContact}>
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
          },
        )}
      </div>
    );
  };

  renderSocialsIcons = (fields: socialsIcons[]) => {
    const { socialsLinks } = this.state;
    if (fields.length === 0) {
      return (
        <li className={s.placeholder}>
          <span>Социальные сети не добавлены</span>
        </li>
      );
    }

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

    return socialsLinks.map(({ id, social_url }) => {
      const errorKey = `social_${id}`;
      const errorMessage = fieldsErrors[errorKey];

      return (
        <li key={id} className={s.socialListItem}>
          <input
            type="url"
            onChange={(e) => this.handleChangeSocialsFields(id, e)}
            onBlur={(e) => this.handleBlurValidationSocials(e, id)}
            onInput={(e) => this.handleValidationSocials(e, id)}
            value={social_url ? social_url : ''}
            placeholder="https://some.ru"
            className={`${errorMessage ? s.inputError : ''}`}
          />
          {errorMessage && <div className={s.errorSocial}>{errorMessage}</div>}
        </li>
      );
    });
  };

  isFormValid = () => {
    const { fieldsErrors } = this.state;
    const hasNoErrors = Object.values(fieldsErrors).every((error) => error === '');
    const hasNoEmptyRequiredFields = this.state.predefinedFields.every(
      (field) => !field.required || field.value?.trim(),
    );
    return hasNoErrors && hasNoEmptyRequiredFields;
  };

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const allFields = {
      predefinedFields: this.state.predefinedFields,
      phones: this.state.phones,
      emails: this.state.emails,
      websites: this.state.websites,
      socials: this.state.socialsLinks,
    };

    const hasDuplicateValues = () => {
      const combinedFields = [
        ...this.state.predefinedFields,
        ...this.state.phones,
        ...this.state.emails,
        ...this.state.websites,
      ];

      const values = combinedFields.map((field) => field.value);
      const socialUrls = this.state.socialsLinks.map((social) => social.social_url);
      const allValues = [...values, ...socialUrls];

      const filteredValues = allValues.filter((value) => value && value.trim() !== '');
      const uniqueValues = new Set(filteredValues);
      if (filteredValues.length !== uniqueValues.size) {
        const duplicates = filteredValues.filter((value, index, arr) => arr.indexOf(value) !== index);

        if (duplicates.length > 0) {
          const updatedDuplicates = Array.from(new Set(duplicates)).map((value) => `\n${value}`);

          toast.error(`Дублирующиеся значения: ${updatedDuplicates}`, {
            position: 'bottom-left',
            autoClose: 5000,
            className: `${s.toastError}`,
          });
        }

        return true;
      }

      return false;
    };

    if (!this.isFormValid()) {
      return;
    }

    if (hasDuplicateValues()) {
      console.error('В полях формы найдены дублирующиеся значения!');
      return;
    }

    this.props.onSubmit(allFields);

    this.setState({
      predefinedFields: this.props.predefinedFields,
      phones: [],
      emails: [],
      websites: [],
      socialsIcons: this.props.socialsIcons,
      socialsLinks: [],
      fieldsErrors: {},
    });
  };

  renderSubmitButton() {
    const { setDataForPutStatus } = this.state;
    const { submitPutStatus, submitStatus } = this.props;

    return (
      <button type="submit" disabled={!this.isFormValid()} className={s.submitButton}>
        {setDataForPutStatus === 'success' ? (
          submitPutStatus === 'loading' ? (
            <Loader />
          ) : (
            'Обновить данные'
          )
        ) : submitStatus === 'loading' ? (
          <Loader />
        ) : (
          'Получить QR код'
        )}
      </button>
    );
  }

  renderUserLinkAfterPutRequest() {
    const { updatedUserLink } = this.state;

    if (updatedUserLink) {
      return (
        <div className={s.successMessage}>
          <a href={updatedUserLink} target="_blank" rel="noopener noreferrer">
            Перейти на обновлённую страницу
          </a>
        </div>
      );
    }

    return null;
  }

  render() {
    const { predefinedFields, phones, emails, websites, socialsIcons, socialsLinks, isQrGenerated } = this.state;
    const { submitSuccessData } = this.props;
    let page_url: string;
    let edit_code: string;

    if (submitSuccessData) {
      page_url = submitSuccessData.page_url;
      edit_code = submitSuccessData.edit_code;
    } else {
      page_url = 'https://trello.com/b/4h2Ekh1t/%D0%BA%D0%BE%D0%BC%D0%B0%D0%BD%D0%B4%D0%B0-4-sprint-1-1311-2611';
      edit_code = '';
    }

    return (
      <form onSubmit={this.handleSubmit} className={s.userDataForm} noValidate>
        <fieldset className={s.predefinedFields}>
          <legend>Основная информация</legend>
          {this.renderFields(predefinedFields, 'predefinedFields')}
        </fieldset>

        <fieldset className={s.shortAdditionalFields}>
          <legend>Телефоны:</legend>
          {this.renderFields(phones, 'phones')}
        </fieldset>

        <fieldset className={s.shortAdditionalFields}>
          <legend>Электронные почты</legend>
          {this.renderFields(emails, 'emails')}
        </fieldset>

        <fieldset className={s.shortAdditionalFields}>
          <legend>Веб-сайт</legend>
          {this.renderFields(websites, 'websites')}
        </fieldset>

        <fieldset className={s.additionalFields}>
          <legend>Социальные сети</legend>
          <div className={s.socialsContainer}>
            <ul className={s.socialsIcons}>{this.renderSocialsIcons(socialsIcons)}</ul>
            <ul className={s.sodcialsFields}>{this.renderSocialsFields(socialsLinks)}</ul>
          </div>
        </fieldset>

        {this.renderSubmitButton()}

        {Object.values(this.state.fieldsErrors).some((error) => error.includes('не уникально')) && (
          <div className={s.formError}>Пожалуйста, убедитесь, что все значения уникальны.</div>
        )}

        {isQrGenerated && <QR value={page_url} edit_code={edit_code} />}
        {this.renderUserLinkAfterPutRequest()}

        <ToastContainer />
      </form>
    );
  }
}

export default UserDataForm;
