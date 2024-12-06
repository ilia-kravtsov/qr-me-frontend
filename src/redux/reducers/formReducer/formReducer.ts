import { FormReducerType } from '../../../components/UserDataFormContainer/UserDataForm/UserDataFormTypes';
import { v1 } from 'uuid';
import { FormActionTypes, SetUserDataTypes, SocialsActionTypes } from '../../actions/formActions/formActions';
import { FormActions } from '../../actions/formActions/formActionsTypes';
import { CheckUserEditCodeTypes } from '../../actions/personalPageActions/personalPageActions';

type ActionsType = FormActions;

const initialState: FormReducerType = {
  predefinedFields: [
    {
      id: v1(),
      label: 'Имя *',
      value: '',
      required: true,
      placeholder: 'Имя',
      title: 'Вводите только латинские или кириллические буквы',
    },
    {
      id: v1(),
      label: 'Фамилия *',
      value: '',
      required: true,
      placeholder: 'Фамилия',
      title: 'Вводите только латинские или кириллические буквы',
    },
    {
      id: v1(),
      label: 'Отчество',
      value: '',
      required: false,
      placeholder: 'Отчество',
      title: 'Вводите только латинские или кириллические буквы',
    },
    {
      id: v1(),
      label: 'Компания',
      value: '',
      required: false,
      placeholder: 'OOO "Гугл"',
      title: 'Вводите только буквы, цифры, пробелы, точки, дефисы, слэши, кавычки или "№".',
    },
    {
      id: v1(),
      label: 'Должность',
      value: '',
      required: false,
      placeholder: 'менеджер',
      title: 'Вводите только латинские или кириллические буквы',
    },
    {
      id: v1(),
      label: 'Адрес',
      value: '',
      required: false,
      placeholder: 'ул. Красноармейская, дом 4',
      title: 'Вводите только буквы, цифры, пробелы, точки, дефисы, слэши или "№".',
    },
    {
      id: v1(),
      label: 'Описание',
      value: '',
      required: false,
      placeholder: 'Описание',
      title: 'Максимальная длина 200 символов',
    },
  ],
  phones: [
    {
      id: v1(),
      label: 'Phone',
      type: 'tel',
      value: '',
      required: false,
      placeholder: '+7 999 999 99 99',
      title: '+7 999 999 99 99',
    },
  ],
  emails: [
    {
      id: v1(),
      label: 'Email',
      type: 'email',
      value: '',
      required: false,
      placeholder: 'ivanov@mail.ru',
      title: 'ivanov@mail.ru',
    },
  ],
  websites: [
    {
      id: v1(),
      label: 'Website',
      type: 'url',
      value: '',
      required: false,
      placeholder: 'https://some.ru',
      title: 'https://some.ru',
    },
  ],
  socialsIcons: [
    {
      id: 1,
      icon_link: 'https://img.icons8.com/?size=100&id=gRof6ATajUxk&format=png&color=000000',
      name: 'facebook',
    },
    {
      id: 2,
      icon_link: 'https://img.icons8.com/?size=100&id=WRrWnPAq4WVx&format=png&color=000000',
      name: 'instagram',
    },
  ],
  socialsLinks: [],
  submitSuccessData: {
    edit_code: '',
    page_url: '',
    user_id: '',
  },
  submitStatus: 'idle',
  socialsStatus: 'idle',
  setDataForPutStatus: 'idle',
  submitPutStatus: 'idle',
  submitError: null,
  submitPutError: null,
  getDataError: null,
  userEditCode: null,
  userId: null,
};

export const formReducer = (state = initialState, action: ActionsType): FormReducerType => {
  switch (action.type) {
    case FormActionTypes.SUBMIT_FORM:
      return { ...state, submitStatus: 'loading', submitError: null };
    case FormActionTypes.SUBMIT_FORM_SUCCESS:
      return {
        ...state,
        submitStatus: 'success',
        submitSuccessData: { ...state.submitSuccessData, ...action.payload },
      };
    case FormActionTypes.SUBMIT_FORM_ERROR:
      return { ...state, submitStatus: 'error', submitError: action.payload };
    case FormActionTypes.SUBMIT_FORM_IDLE:
      return { ...state, submitStatus: 'idle' };
    case SocialsActionTypes.GET_FORM_DATA:
      return { ...state, socialsStatus: 'loading', getDataError: null };
    case SocialsActionTypes.GET_FORM_DATA_SUCCESS:
      return { ...state, socialsStatus: 'success', socialsIcons: action.payload };
    case SocialsActionTypes.GET_FORM_DATA_ERROR:
      return { ...state, socialsStatus: 'error', getDataError: action.payload };
    case SetUserDataTypes.SET_USER_DATA_FOR_PUT_REQUEST:
      const {
        first_name,
        last_name,
        middle_name,
        about,
        company,
        position,
        address,
        phones,
        emails,
        websites,
        socials,
      } = action.payload;

      const updatedPredefinedFields = state.predefinedFields.map((field) => {
        switch (field.label) {
          case 'Имя *':
            return { ...field, value: first_name || '' };
          case 'Фамилия *':
            return { ...field, value: last_name || '' };
          case 'Отчество':
            return { ...field, value: middle_name || '' };
          case 'Компания':
            return { ...field, value: company || '' };
          case 'Должность':
            return { ...field, value: position || '' };
          case 'Адрес':
            return { ...field, value: address || '' };
          case 'Описание':
            return { ...field, value: about || '' };
          default:
            return field;
        }
      });
      const updatedPhones =
        phones?.map((phone) => ({
          id: phone.phone_id.toString(),
          label: 'Phone',
          type: 'tel',
          value: phone.number.toString(),
          required: false,
          placeholder: '+7 999 999 99 99',
          title: '+7 999 999 99 99',
        })) || [];
      const updatedEmails =
        emails?.map((email) => ({
          id: email.email_id.toString(),
          label: 'Email',
          type: 'email',
          value: email.email_address.toString(),
          required: false,
          placeholder: 'ivanov@mail.ru',
          title: 'ivanov@mail.ru',
        })) || [];
      const updatedWebsites =
        websites?.map((website) => ({
          id: website.website_id.toString(),
          label: 'Website',
          type: 'url',
          value: website.website_address.toString(),
          required: false,
          placeholder: 'https://some.ru',
          title: 'https://some.ru',
        })) || [];
      const updatedSocialsLinks =
        socials?.map((social) => ({
          id: social.social_id,
          social_url: social.social_url,
          social_row_id: social.social_row_id,
        })) || [];

      return {
        ...state,
        predefinedFields: updatedPredefinedFields,
        phones: updatedPhones,
        emails: updatedEmails,
        websites: updatedWebsites,
        socialsLinks: updatedSocialsLinks,
        setDataForPutStatus: 'success',
      };
    case CheckUserEditCodeTypes.CHECK_USER_EDIT_SUCCESS:
      return { ...state, userEditCode: action.payload.editCode, userId: action.payload.userId };
    case SetUserDataTypes.SET_USER_DATA_FOR_PUT_REQUEST_IDLE:
      return { ...state, setDataForPutStatus: 'idle' };
    case FormActionTypes.SUBMIT_FORM_PUT:
      return { ...state, submitPutStatus: 'loading' };
    case FormActionTypes.SUBMIT_FORM_PUT_SUCCESS:
      return { ...state, submitPutStatus: 'success' };
    case FormActionTypes.SUBMIT_FORM_PUT_ERROR:
      return { ...state, submitPutStatus: 'error', submitPutError: action.payload};
    default:
      return state;
  }
};
