import {FormReducerType} from "../../../components/UserDataFormContainer/UserDataForm/UserDataFormTypes";
import { v1 } from "uuid";
import {SaveFormDataAction, SubmitFormErrorAction, SubmitFormStartAction} from "../../actions/formActions/formActionsTypes";
import {FormActionTypes} from "../../actions/formActions/formActions";

export type FormActions =
  | SubmitFormStartAction
  | SaveFormDataAction
  | SubmitFormErrorAction;

type ActionsType = FormActions;

const initialState: FormReducerType = {
  predefinedFields: [
    { id: v1(), label: 'Имя', value: '', required: true, placeholder: 'Имя', pattern: '[A-Za-zА-Яа-яЁё]+', title: 'Вводите только латинские или кириллические буквы' },
    { id: v1(), label: 'Фамилия', value: '', required: true, placeholder: 'Фамилия', pattern: '[A-Za-zА-Яа-яЁё]+', title: 'Вводите только латинские или кириллические буквы' },
    { id: v1(), label: 'Отчество', value: '', required: false, placeholder: 'Отчество', pattern: '[A-Za-zА-Яа-яЁё]+', title: 'Вводите только латинские или кириллические буквы' },
    { id: v1(), label: 'Телефон', type: 'tel', value: '', required: false, placeholder: '+7 999 999 99 99' },
    { id: v1(), label: 'Электронная почта', type: 'email', value: '', required: false, placeholder: 'ivanov@mail.ru' },
    { id: v1(), label: 'Компания', value: '', required: false, placeholder: 'OOO "Google"' },
    { id: v1(), label: 'Должность', value: '', required: false, placeholder: 'менеджер' },
    { id: v1(), label: 'Адрес', value: '', required: false, placeholder: 'ул. Красноармейская, дом 4' },
  ],
  additionalFields: [
    { id: v1(), label: 'Telegram', type: 'url', value: '', required: false, placeholder: 'ваша ссылка' },
    { id: v1(), label: 'Whatsapp', type: 'url', value: '', required: false, placeholder: 'ваша ссылка' },
  ],
  isSubmitting: false,
  submitError: null,
};

export const formReducer = (state = initialState, action: ActionsType): FormReducerType => {
  switch (action.type) {
    case FormActionTypes.SUBMIT_FORM:
      return { ...state, isSubmitting: true, submitError: null };
    case FormActionTypes.SUBMIT_FORM_ERROR:
      return { ...state, isSubmitting: false, submitError: action.payload };
    default:
      return state;
  }
};
