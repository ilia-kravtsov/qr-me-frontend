import { UserActionTypes, CheckUserEditCodeTypes } from '../../actions/personalPageActions/personalPageActions';
import { personalPageReducer } from './personalPageReducer';
import { PersonalPageReducer } from '../../../components/PersonalPageContainer/PersonalPage/PersonalPageTypes';
import {
  CheckUserEditCode, CheckUserEditCodeError, CheckUserEditCodeSuccess,
  GetUserDataAttemptAction, GetUserDataErrorAction,
  GetUserDataSuccessAction,
} from '../../actions/personalPageActions/personalPageActionsTypes';


const initialState: PersonalPageReducer = {
  success: false,
  data: {
    first_name: 'Иван',
    last_name: 'Иванов',
    middle_name: 'Иванов',
    about: 'I am good',
    address: 'Lenina street 14',
    position: 'teamlead',
    company: 'ООО Гугл',
    websites: [{ website_id: 5, website_address: 'https://www.google.com' }],
    phones: [{ phone_id: 1, number: '+78888888888' }],
    emails: [{ email_id: 2, email_address: 'ivanov@mail.com' }],
    socials: [{ social_id: 3, social_row_id: 4, social_url: 'https://www.facebook.com' }],
  },
  getUserDataStatus: 'idle',
  getUserDataError: null,
  checkUserEditCodeStatus: 'idle',
  checkUserEditCodeError: null,
};

describe('personalPageReducer', () => {

  test('getUserDataStatus should change after GET_USER_DATA action', () => {
    const action: GetUserDataAttemptAction = { type: UserActionTypes.GET_USER_DATA };
    const expectedState = {
      ...initialState,
      getUserDataStatus: 'loading',
      getUserDataError: null,
    };

    const result = personalPageReducer(initialState, action);

    expect(result).toEqual(expectedState);
    expect(initialState.getUserDataStatus).toEqual('idle');
  });

  test('getUserDataStatus, success, and data must update after GET_USER_DATA_SUCCESS action', () => {
    const action: GetUserDataSuccessAction = {
      type: UserActionTypes.GET_USER_DATA_SUCCESS,
      payload: {
        success: true,
        data: {
          photo: 'new_photo.jpg',
          first_name: 'Петр',
          last_name: 'Петров',
          middle_name: 'Петрович',
          about: 'About new user',
          address: 'Pushkina street 10',
          company: 'ООО Яндекс',
          position: 'developer',
          phones: [{ phone_id: 2, number: '+79999999999' }],
          emails: [{ email_id: 3, email_address: 'petrov@mail.com' }],
          websites: [{ website_id: 6, website_address: 'https://www.yandex.com' }],
          socials: [{ social_id: 4, social_row_id: 5, social_url: 'https://www.twitter.com' }],
        },
      },
    };

    const expectedState = {
      ...initialState,
      success: true,
      data: action.payload.data,
      getUserDataStatus: 'success',
      getUserDataError: null,
    };

    const result = personalPageReducer(initialState, action);

    expect(result).toEqual(expectedState);
  });

  test('getUserDataStatus should be "error" and getUserDataError should be updated after GET_USER_DATA_ERROR action', () => {
    const action: GetUserDataErrorAction = {
      type: UserActionTypes.GET_USER_DATA_ERROR,
      payload: 'An error occurred',
    };

    const expectedState = {
      ...initialState,
      getUserDataStatus: 'error',
      getUserDataError: 'An error occurred',
    };

    const result = personalPageReducer(initialState, action);

    expect(result).toEqual(expectedState);
    expect(initialState.getUserDataError).toEqual(null);
    expect(initialState.getUserDataStatus).toEqual('idle');
  });

  test('checkUserEditCodeStatus should change after CHECK_USER_EDIT_CODE action', () => {
    const action: CheckUserEditCode = { type: CheckUserEditCodeTypes.CHECK_USER_EDIT_CODE };
    const expectedState = {
      ...initialState,
      checkUserEditCodeStatus: 'loading',
      checkUserEditCodeError: null,
    };

    const result = personalPageReducer(initialState, action);

    expect(result).toEqual(expectedState);
    expect(initialState.checkUserEditCodeStatus).toEqual('idle');
  });

  test('checkUserEditCodeStatus should be "success" after CHECK_USER_EDIT_SUCCESS action', () => {
    const action: CheckUserEditCodeSuccess = {
      type: CheckUserEditCodeTypes.CHECK_USER_EDIT_SUCCESS,
      payload: {
        userId: '123',
        editCode: '232352345'
      } };
    const expectedState = {
      ...initialState,
      checkUserEditCodeStatus: 'success',
      checkUserEditCodeError: null,
    };

    const result = personalPageReducer(initialState, action);

    expect(result).toEqual(expectedState);
  });

  test('checkUserEditCodeStatus should be "error" and checkUserEditCodeError should be updated after CHECK_USER_EDIT_ERROR action', () => {
    const action: CheckUserEditCodeError = {
      type: CheckUserEditCodeTypes.CHECK_USER_EDIT_ERROR,
      payload: { errorMessage: 'Edit code error occurred' },
    };

    const expectedState = {
      ...initialState,
      checkUserEditCodeStatus: 'error',
      checkUserEditCodeError: 'Edit code error occurred',
    };

    const result = personalPageReducer(initialState, action);

    expect(result).toEqual(expectedState);
    expect(initialState.checkUserEditCodeError).toEqual(null);
    expect(initialState.checkUserEditCodeStatus).toEqual('idle');
  });
});