import { ChangeEvent, Component, FormEvent, KeyboardEvent } from 'react';
import s from './UserDataForm.module.scss';
import { v1 } from 'uuid';
import {
  Field, InputsType,
  UserDataFormProps,
  UserDataFormState,
} from './UserDataFormTypes';
import InputMask from 'react-input-mask';

class UserDataForm extends Component<UserDataFormProps, UserDataFormState> {

  constructor(props: UserDataFormProps) {
    super(props);

    this.state = {
      newFieldLabel: '',
      additionalFields: this.props.additionalFields,
      predefinedFields: this.props.predefinedFields,
      fieldsErrors: {}
    };
  }

  handleAddField = () => {
    const { newFieldLabel } = this.state;

    if (newFieldLabel.trim() === '') return;
    const newField: Field = {
      id: v1(),
      label: newFieldLabel,
      value: '',
      required: true,
      placeholder: 'ваша ссылка'
    }

    this.setState((prevState) => ({
      additionalFields: [
        ...prevState.additionalFields,
        newField,
      ],
      newFieldLabel: '',
    }));
  };

  handleKeyDownAddField = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.handleAddField();
    }
  };

  handleRemoveField = (id: string) => {
    this.setState((prevState) => ({
      additionalFields: prevState.additionalFields.filter((field) => field.id !== id),
    }));
  };

  handleChangeFieldValue = (fieldType: 'predefinedFields' | 'additionalFields', id: string, value: string) => {
    this.setState((prevState) => ({
        [fieldType]: prevState[fieldType].map((field) => field.id === id ? { ...field, value } : field),
      } as Pick<UserDataFormState, typeof fieldType>
    ));
  };

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const allFields = {
      predefinedFields: this.state.predefinedFields,
      additionalFields: this.state.additionalFields,
    };

    this.props.onSubmit(allFields);

    this.setState({
      newFieldLabel: '',
      additionalFields: [...this.props.additionalFields],
      predefinedFields: this.props.predefinedFields.map(field => ({...field, value: ''})),
    });
  };

  handleAdditionalFieldLabelCreator = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ newFieldLabel: e.target.value })
  }

  handleValidation = (e: FormEvent<HTMLInputElement>, type: InputsType) => {
    const input = e.target as HTMLInputElement;
    const fieldId = input.id;
    let errorMessage = '';
    let processedValue = input.value;

    switch (type) {
      case 'text':
        const textPattern = /[^A-Za-zА-Яа-яЁё\s]/g
        const invalidCharacters = processedValue.match(textPattern);
        processedValue = processedValue.replace(textPattern, '');
        if (invalidCharacters) {
          errorMessage = 'Вводите только латинские или кириллические буквы';
        }
        break;

      case 'tel':
        const phonePattern = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
        if (!phonePattern.test(processedValue)) {
          errorMessage = 'Формат: +7 (999) 999-99-99.';
        }
        break;

      case 'url':
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
          errorMessage = 'Формат URL: http://, https://, или @ivanov';
        }
        break;

      default:
        break;
    }

    input.value = input.value.replace(/[^A-Za-zА-Яа-яЁё]/g, '');

    input.value = processedValue;
    this.setState((prevState) => ({
      fieldsErrors: {
        ...prevState.fieldsErrors,
        [fieldId]: errorMessage,
      },
    }));
  }

  renderFields = (fields: Field[], fieldType: 'predefinedFields' | 'additionalFields') =>
    fields.map(({ id, label, type = 'text', value, required = false, placeholder = '', minLength = 2, pattern, title }) => {
      const inputClassName = `${s.input} ${this.state.fieldsErrors[id] ? s.inputError : ''}`;
      return (
        <div key={id} className={fieldType === 'additionalFields' ? s.additionalField : s.field}>
          <label htmlFor={id}>{label}:</label>
          {type === 'tel' ? (
            <InputMask
              mask="+7 (999) 999-99-99"
              value={value}
              onChange={(e) => this.handleChangeFieldValue(fieldType, id, e.target.value)}
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
          ) : (
            <input
              id={id}
              type={type}
              value={value}
              placeholder={placeholder}
              required={required}
              minLength={minLength}
              pattern={pattern}
              title={title}
              onInput={(e) => this.handleValidation(e, type)}
              onChange={(e) => this.handleChangeFieldValue(fieldType, id, e.target.value)}
              className={inputClassName}
            />
          )}
          {this.state.fieldsErrors[id] && (
            <div className={s.errorMessage}>{this.state.fieldsErrors[id]}</div>
          )}
          {fieldType === 'additionalFields' && (
            <button
              type="button"
              className={s.removeButton}
              onClick={() => this.handleRemoveField(id)}
            >
              Удалить
            </button>
          )}
        </div>
      )
      }
    )

  render() {
    const { predefinedFields, additionalFields, newFieldLabel } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className={s.userDataForm} noValidate>
        <fieldset className={s.predefinedFields}>
          {this.renderFields(predefinedFields, "predefinedFields")}
        </fieldset>

        <fieldset className={s.additionalFields}>
          <legend>Социальные сети</legend>
          <div className={s.addFieldContainer}>
            <input
              type="text"
              placeholder="Название социальной сети"
              value={newFieldLabel}
              onChange={this.handleAdditionalFieldLabelCreator}
              onKeyDown={this.handleKeyDownAddField}
            />
            <button type="button" onClick={this.handleAddField}>
              Добавить
            </button>
          </div>
          {this.renderFields(additionalFields, "additionalFields")}
        </fieldset>

        <button type="submit">Получить QR</button>
      </form>
    );
  }
}

export default UserDataForm;
