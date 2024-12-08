import { FormActionTypes } from '../../actions/formActions/formActions';
import { formReducer } from './formReducer';
import { FormReducerType } from '../../../components/UserDataFormContainer/UserDataForm/UserDataFormTypes';
import {
  SubmitFormErrorAction,
  SubmitFormIdleAction,
  SubmitFormStartAction,
  SubmitFormSuccessAction,
} from '../../actions/formActions/formActionsTypes';

describe('formReducer', () => {
  let initialState: FormReducerType;

  beforeEach(() => {
    initialState = {
      predefinedFields: [],
      phones: [],
      emails: [],
      websites: [],
      socialsIcons: [],
      socialsLinks: [],
      submitSuccessData: {
        edit_code: '',
        user_id: '',
        page_url: ''
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
        user_id: '6789'
      }
    };

    const expectedState = {
      ...initialState,
      submitError: null,
      submitStatus: 'success',
      submitSuccessData: { ...initialState.submitSuccessData, ...action.payload }
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
});