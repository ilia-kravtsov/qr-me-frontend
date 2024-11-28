import s from './AddField.module.scss'
import { Component } from 'react';
import { AddFieldType } from './AddFieldTypes';

export class AddField extends Component<AddFieldType> {
  render() {
    const {newFieldLabel, handleAdditionalFieldLabelCreator, handleKeyDownAddField, handleAddField} = this.props;

    <div className={s.addFieldContainer}>
      <input
        type="text"
        placeholder="Название социальной сети"
        value={newFieldLabel}
        onChange={handleAdditionalFieldLabelCreator}
        onKeyDown={handleKeyDownAddField}
      />
      <button type="button" onClick={handleAddField}>
        Добавить
      </button>
    </div>
  }
}