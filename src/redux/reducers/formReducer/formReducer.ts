import {FormReducerType} from "../../../components/UserDataFormContainer/UserDataForm/UserDataFormTypes";
import { v1 } from "uuid";
import { FormActionTypes } from '../../actions/formActions/formActions';
import { FormActions } from '../../actions/formActions/formActionsTypes';

type ActionsType = FormActions;

const initialState: FormReducerType = {
  predefinedFields: [
    { id: v1(), label: 'Имя', value: '', required: true, placeholder: 'Имя', pattern: '[A-Za-zА-Яа-яЁё]+', title: 'Вводите только латинские или кириллические буквы' },
    { id: v1(), label: 'Фамилия', value: '', required: true, placeholder: 'Фамилия', pattern: '[A-Za-zА-Яа-яЁё]+', title: 'Вводите только латинские или кириллические буквы' },
    { id: v1(), label: 'Отчество', value: '', required: false, placeholder: 'Отчество', pattern: '[A-Za-zА-Яа-яЁё]+', title: 'Вводите только латинские или кириллические буквы' },
    { id: v1(), label: 'Описание', value: '', required: false, placeholder: 'Описание' },
    { id: v1(), label: 'Компания', value: '', required: false, placeholder: 'OOO "Google"' },
    { id: v1(), label: 'Должность', value: '', required: false, placeholder: 'менеджер' },
    { id: v1(), label: 'Адрес', value: '', required: false, placeholder: 'ул. Красноармейская, дом 4' },
  ],
  phones: [
    { id: v1(), label: 'Phone', type: 'tel', value: '', required: false, placeholder: '+7 999 999 99 99' },
    { id: v1(), label: 'Phone', type: 'tel', value: '', required: false, placeholder: '+7 999 999 99 99' },
  ],
  emails: [
    { id: v1(), label: 'Email', type: 'email', value: '', required: false, placeholder: 'ivanov@mail.ru' },
    { id: v1(), label: 'Email', type: 'email', value: '', required: false, placeholder: 'ivanov@mail.ru' },
  ],
  socials: [
    { id: v1(), label: 'Telegram', type: 'url', value: '', required: false, placeholder: 'ваша ссылка' },
    { id: v1(), label: 'Whatsapp', type: 'url', value: '', required: false, placeholder: 'ваша ссылка' },
  ],
  websites: [
    { id: v1(), label: 'Website', type: 'url', value: '', required: false, placeholder: 'ваша ссылка' },
    { id: v1(), label: 'Website', type: 'url', value: '', required: false, placeholder: 'ваша ссылка' },
  ],
  isSubmitting: false,
  isSubmitSuccessful: false,
  submitError: null,
};

export const formReducer = (state = initialState, action: ActionsType): FormReducerType => {
  switch (action.type) {
    case FormActionTypes.SUBMIT_FORM:
      return { ...state, isSubmitting: true, submitError: null };
    case FormActionTypes.SUBMIT_FORM_SUCCESS:
      return { ...state, isSubmitting: false, isSubmitSuccessful: true };
    case FormActionTypes.SUBMIT_FORM_ERROR:
      return { ...state, isSubmitting: false, submitError: action.payload };
    default:
      return state;
  }
};
