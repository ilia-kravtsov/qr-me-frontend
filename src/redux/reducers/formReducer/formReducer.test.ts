import { FormActionTypes, SetUserDataTypes, SocialsActionTypes } from '../../actions/formActions/formActions';
import { formReducer } from './formReducer';
import { FormReducerType } from '../../../components/UserDataFormContainer/UserDataForm/UserDataFormTypes';
import {
  GetFormDataAttempt, GetFormDataError,
  GetFormDataSuccess, SetUserDataForPutRequest, SetUserDataForPutRequestIdle,
  SubmitFormErrorAction,
  SubmitFormIdleAction, SubmitFormPut, SubmitFormPutError, SubmitFormPutSuccess,
  SubmitFormStartAction,
  SubmitFormSuccessAction,
} from '../../actions/formActions/formActionsTypes';
import { v1 } from 'uuid';
import { CheckUserEditCodeTypes } from '../../actions/personalPageActions/personalPageActions';
import { CheckUserEditCodeSuccess } from '../../actions/personalPageActions/personalPageActionsTypes';

describe('formReducer', () => {
  let initialState: FormReducerType;

  beforeEach(() => {
    initialState = {
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
      phones: [],
      emails: [],
      websites: [],
      socialsIcons: [],
      socialsLinks: [],
      submitSuccessData: {
        edit_code: '',
        user_id: '',
        page_url: '',
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
  });

  test('submitStatus should changed after SUBMIT_FORM action', () => {
    const action: SubmitFormStartAction = {
      type: FormActionTypes.SUBMIT_FORM,
    };

    const expectedState = {
      ...initialState,
      submitStatus: 'loading',
      submitError: null,
    };

    const result = formReducer(initialState, action);

    expect(result).toEqual(expectedState);
    expect(initialState.submitStatus).toEqual('idle');
  });

  test('submitStatus, submitError, submitSuccessData must update after SUBMIT_FORM_SUCCESS action', () => {
    const action: SubmitFormSuccessAction = {
      type: FormActionTypes.SUBMIT_FORM_SUCCESS,
      payload: {
        edit_code: '1234',
        page_url: 'https://www.google.com',
        user_id: '6789',
      },
    };

    const expectedState = {
      ...initialState,
      submitError: null,
      submitStatus: 'success',
      submitSuccessData: { ...initialState.submitSuccessData, ...action.payload },
    };

    const result = formReducer(initialState, action);

    expect(result).toEqual(expectedState);
  });

  test('submitStatus should be "error" and submitError should be updated after SUBMIT_FORM_ERROR action', () => {
    const action: SubmitFormErrorAction = {
      type: FormActionTypes.SUBMIT_FORM_ERROR,
      payload: 'An error occurred',
    };

    const expectedState = {
      ...initialState,
      submitStatus: 'error',
      submitError: 'An error occurred',
    };

    const result = formReducer(initialState, action);

    expect(result).toEqual(expectedState);
    expect(initialState.submitError).toEqual(null);
    expect(initialState.submitStatus).toEqual('idle');
  });

  test('submitStatus should be "idle" after SUBMIT_FORM_IDLE action', () => {
    const action: SubmitFormIdleAction = {
      type: FormActionTypes.SUBMIT_FORM_IDLE,
    };

    const expectedState = {
      ...initialState,
      submitStatus: 'idle',
    };

    const result = formReducer(initialState, action);

    expect(result).toEqual(expectedState);
  });

  test('socialsStatus should be "loading" and getDataError should be null after GET_FORM_DATA action', () => {
    const action: GetFormDataAttempt = {
      type: SocialsActionTypes.GET_FORM_DATA,
    };

    const expectedState = {
      ...initialState,
      socialsStatus: 'loading',
      getDataError: null,
    };

    const result = formReducer(initialState, action);

    expect(result).toEqual(expectedState);
    expect(initialState.socialsStatus).toEqual('idle');
  });

  test('socialsStatus should be "success" and socialsIcons should be updated with action payload after GET_FORM_DATA_SUCCESS action', () => {
    const payload = [
      {
        id: 3,
        icon_link: 'https://img.icons8.com/3d-plastilina/50/reddit--v2.png',
        name: 'reddit',
      },
      {
        id: 4,
        icon_link: 'https://img.icons8.com/3d-plastilina/50/dribbble.png',
        name: 'dribbble',
      },
    ];

    const action: GetFormDataSuccess = {
      type: SocialsActionTypes.GET_FORM_DATA_SUCCESS,
      payload,
    };

    const expectedState = {
      ...initialState,
      socialsStatus: 'success',
      socialsIcons: payload,
    };

    const result = formReducer(initialState, action);

    expect(result).toEqual(expectedState);
    expect(initialState.socialsStatus).toEqual('idle');
    expect(initialState.socialsIcons).toEqual([]);
  });

  test('should set socialsStatus to "error" and update getDataError with payload after GET_FORM_DATA_ERROR action', () => {
    const errorPayload = 'Network Error';
    const action: GetFormDataError = {
      type: SocialsActionTypes.GET_FORM_DATA_ERROR,
      payload: errorPayload,
    };

    const expectedState = {
      ...initialState,
      socialsStatus: 'error',
      getDataError: errorPayload,
    };

    const result = formReducer(initialState, action);

    expect(result).toEqual(expectedState);
    expect(initialState.socialsStatus).toEqual('idle');
    expect(initialState.getDataError).toBeNull();
  });

  test('should update predefinedFields, phones, emails, websites, and socialsLinks with the data from action payload', () => {
    const actionPayload = {
      first_name: 'Иван',
      last_name: 'Иванов',
      middle_name: 'Иванович',
      about: 'Описание пользователя',
      company: 'ООО Ромашка',
      position: 'Разработчик',
      address: 'г. Москва, ул. Пушкина, д. Колотушкина',
      phones: [
        { phone_id: 1, number: '+7 999 123 45 67' },
        { phone_id: 2, number: '+7 912 345 67 89' }
      ],
      emails: [
        { email_id: 1, email_address: 'example@mail.ru' },
        { email_id: 2, email_address: 'hello@world.com' }
      ],
      websites: [
        { website_id: 1, website_address: 'https://example.com' },
        { website_id: 2, website_address: 'https://mysite.ru' }
      ],
      socials: [
        { social_id: 1, social_url: 'https://vk.com/id123', social_row_id: 101 },
        { social_id: 2, social_url: 'https://twitter.com/someuser', social_row_id: 102 }
      ],
    };

    const action: SetUserDataForPutRequest = {
      type: SetUserDataTypes.SET_USER_DATA_FOR_PUT_REQUEST,
      payload: actionPayload,
    };

    const expectedState = {
      ...initialState,
      predefinedFields: [
        { label: 'Имя *', value: 'Иван' },
        { label: 'Фамилия *', value: 'Иванов' },
        { label: 'Отчество', value: 'Иванович' },
        { label: 'Компания', value: 'ООО Ромашка' },
        { label: 'Должность', value: 'Разработчик' },
        { label: 'Адрес', value: 'г. Москва, ул. Пушкина, д. Колотушкина' },
        { label: 'Описание', value: 'Описание пользователя' },
      ],
      phones: [
        {
          id: '1',
          label: 'Phone',
          type: 'tel',
          value: '+7 999 123 45 67',
          required: false,
          placeholder: '+7 999 999 99 99',
          title: '+7 999 999 99 99',
        },
        {
          id: '2',
          label: 'Phone',
          type: 'tel',
          value: '+7 912 345 67 89',
          required: false,
          placeholder: '+7 999 999 99 99',
          title: '+7 999 999 99 99',
        }
      ],
      emails: [
        {
          id: '1',
          label: 'Email',
          type: 'email',
          value: 'example@mail.ru',
          required: false,
          placeholder: 'ivanov@mail.ru',
          title: 'ivanov@mail.ru',
        },
        {
          id: '2',
          label: 'Email',
          type: 'email',
          value: 'hello@world.com',
          required: false,
          placeholder: 'ivanov@mail.ru',
          title: 'ivanov@mail.ru',
        }
      ],
      websites: [
        {
          id: '1',
          label: 'Website',
          type: 'url',
          value: 'https://example.com',
          required: false,
          placeholder: 'https://some.ru',
          title: 'https://some.ru',
        },
        {
          id: '2',
          label: 'Website',
          type: 'url',
          value: 'https://mysite.ru',
          required: false,
          placeholder: 'https://some.ru',
          title: 'https://some.ru',
        }
      ],
      socialsLinks: [
        { id: 1, social_url: 'https://vk.com/id123', social_row_id: 101 },
        { id: 2, social_url: 'https://twitter.com/someuser', social_row_id: 102 }
      ],
      setDataForPutStatus: 'success',
    };

    const result = formReducer(initialState, action);

    expect(result.predefinedFields[0].value).toEqual(expectedState.predefinedFields[0].value);
    expect(result.predefinedFields[0].label).toEqual(expectedState.predefinedFields[0].label);
    expect(result.phones).toEqual(expectedState.phones);
    expect(result.emails).toEqual(expectedState.emails);
    expect(result.websites).toEqual(expectedState.websites);
    expect(result.socialsIcons).toEqual(expectedState.socialsIcons);
    expect(result.socialsLinks).toEqual(expectedState.socialsLinks);
    expect(initialState.setDataForPutStatus).toEqual('idle');
    expect(initialState.phones).toEqual([]);
    expect(initialState.emails).toEqual([]);
  });

  test('userEditCode и userId должны обновиться после CHECK_USER_EDIT_SUCCESS действия', () => {
    const action: CheckUserEditCodeSuccess = {
      type: CheckUserEditCodeTypes.CHECK_USER_EDIT_SUCCESS,
      payload: {
        editCode: 'abcd1234',
        userId: '5678',
      },
    };

    const expectedState = {
      ...initialState,
      userEditCode: action.payload.editCode,
      userId: action.payload.userId,
    };

    const result = formReducer(initialState, action);

    expect(result).toEqual(expectedState);
    expect(initialState.userEditCode).toBeNull();
    expect(initialState.userId).toBeNull();
  });

  test('setDataForPutStatus должен обновиться на "idle" после SET_USER_DATA_FOR_PUT_REQUEST_IDLE действия', () => {
    const action: SetUserDataForPutRequestIdle = {
      type: SetUserDataTypes.SET_USER_DATA_FOR_PUT_REQUEST_IDLE,
    };

    const modifiedState: FormReducerType = {
      ...initialState,
      setDataForPutStatus: 'success',
    };

    const expectedState = {
      ...modifiedState,
      setDataForPutStatus: 'idle',
    };

    const result = formReducer(modifiedState, action);

    expect(result).toEqual(expectedState);
    expect(modifiedState.setDataForPutStatus).toBe('success');
  });

  test('submitPutStatus должен обновиться на "loading" после действия SUBMIT_FORM_PUT', () => {
    const action: SubmitFormPut = {
      type: FormActionTypes.SUBMIT_FORM_PUT,
    };

    const expectedState = {
      ...initialState,
      submitPutStatus: 'loading',
    };

    const result = formReducer(initialState, action);

    expect(result).toEqual(expectedState);
    expect(initialState.submitPutStatus).toBe('idle');
  });

  test('submitPutStatus должен обновиться на "success" после действия SUBMIT_FORM_PUT_SUCCESS', () => {
    const action: SubmitFormPutSuccess = {
      type: FormActionTypes.SUBMIT_FORM_PUT_SUCCESS,
      payload: {
        success: true
      }
    };

    const expectedState = {
      ...initialState,
      submitPutStatus: 'success',
    };

    const result = formReducer(initialState, action);

    expect(result).toEqual(expectedState);
    expect(initialState.submitPutStatus).toBe('idle');
  });

  test('submitPutStatus должен обновиться на "error" и submitPutError должен содержать payload после действия SUBMIT_FORM_PUT_ERROR', () => {

    const errorPayload = 'Произошла ошибка';

    const action: SubmitFormPutError = {
      type: FormActionTypes.SUBMIT_FORM_PUT_ERROR,
      payload: errorPayload,
    };

    const expectedState = {
      ...initialState,
      submitPutStatus: 'error',
      submitPutError: errorPayload,
    };

    const result = formReducer(initialState, action);

    expect(result.submitPutStatus).toEqual(expectedState.submitPutStatus);
    expect(initialState.submitPutStatus).toBe('idle');
    expect(initialState.submitPutError).toBe(null);
  });

});
