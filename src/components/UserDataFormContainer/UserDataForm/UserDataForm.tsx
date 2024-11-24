import { ChangeEvent, Component, FormEvent, KeyboardEvent } from 'react';
import s from './UserDataForm.module.scss';
import { v1 } from 'uuid';
import {
  Field,
  UserDataFormProps,
  UserDataFormState,
} from './UserDataFormTypes';

class UserDataForm extends Component<UserDataFormProps, UserDataFormState> {

  constructor(props: UserDataFormProps) {
    super(props);

    this.state = {
      newFieldLabel: '',
      additionalFields: this.props.additionalFields,
      predefinedFields: this.props.predefinedFields,
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

  renderFields = (fields: Field[], fieldType: 'predefinedFields' | 'additionalFields') =>
    fields.map(({ id, label, type = 'text', value, required = false, placeholder = ''}) => (
      <div key={id} className={fieldType === 'additionalFields' ? s.additionalField : s.field}>
        <label htmlFor={id}>{label}:</label>
        <input
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          required={required}
          onChange={(e) => this.handleChangeFieldValue(fieldType, id, e.target.value)}
        />
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
    ));

  render() {
    const { predefinedFields, additionalFields, newFieldLabel } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className={s.userDataForm}>
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
