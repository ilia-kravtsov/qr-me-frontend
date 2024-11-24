import {FormReducerType, FormState} from "../../../components/UserDataFormContainer/UserDataForm/UserDataFormTypes";
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
    { id: v1(), label: 'Имя', value: '', required: true, placeholder: 'Имя' },
    { id: v1(), label: 'Фамилия', value: '', required: true, placeholder: 'Фамилия' },
    { id: v1(), label: 'Отчество (при наличии)', value: '', placeholder: 'Отчество' },
    { id: v1(), label: 'Телефон', type: 'tel', value: '', required: true, placeholder: '+7 999 999 99 99' },
    { id: v1(), label: 'Электронная почта', type: 'email', value: '', required: true, placeholder: 'ivanov@mail.ru' },
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
    case FormActionTypes.SAVE_FORM_DATA:
      return { ...state, isSubmitting: false, submitError: null, ...action.payload };
    case FormActionTypes.SUBMIT_FORM_ERROR:
      return { ...state, isSubmitting: false, submitError: action.payload };
    default:
      return state;
  }
};
