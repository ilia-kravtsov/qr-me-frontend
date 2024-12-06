import { getSocialsData, sendFormData } from '../../../api/api';
import { Dispatch } from 'redux';
import {
  GetFormDataAttempt,
  GetFormDataSuccess,
  ServerDataType, SetUserDataForPutRequest, SetUserDataForPutRequestIdle, SetUserId,
  SubmitFormErrorAction,
  SubmitFormIdleAction,
  SubmitFormStartAction,
  SubmitFormSuccessAction,
} from './formActionsTypes';
import {
  ServerPOSTSuccessData,
  ServerResponse,
  socialsIcons,
} from '../../../components/UserDataFormContainer/UserDataForm/UserDataFormTypes';
import { handleError, handleUnknownError } from '../utils/utils';
import { RootState } from '../../store';
import { ServerPageData } from '../../../components/PersonalPageContainer/PersonalPage/PersonalPageTypes';

export enum FormActionTypes {
  SUBMIT_FORM = 'SUBMIT_FORM',
  SUBMIT_FORM_SUCCESS = 'SUBMIT_FORM_SUCCESS',
  SUBMIT_FORM_ERROR = 'SUBMIT_FORM_ERROR',
  SUBMIT_FORM_IDLE = 'SUBMIT_FORM_IDLE',
}
export enum SocialsActionTypes {
  GET_FORM_DATA = 'GET_FORM_DATA',
  GET_FORM_DATA_SUCCESS = 'GET_FORM_DATA_SUCCESS',
  GET_FORM_DATA_ERROR = 'GET_FORM_DATA_ERROR',
}

export enum SetUserDataTypes {
  SET_USER_ID = 'personalPage/SET_USER_ID',
  SET_USER_DATA_FOR_PUT_REQUEST = 'personalPage/SET_USER_DATA_FOR_PUT_REQUEST',
  SET_USER_DATA_FOR_PUT_REQUEST_IDLE = 'personalPage/SET_USER_DATA_FOR_PUT_REQUEST_IDLE',
}

export const setUserId = (userId: string, editCode: string):SetUserId => ({
  type: SetUserDataTypes.SET_USER_ID,
  payload: {
    userId,
    editCode
  },
});
export const submitFormAttempt = (): SubmitFormStartAction => ({
  type: FormActionTypes.SUBMIT_FORM,
});
export const submitFormIdle = (): SubmitFormIdleAction => ({
  type: FormActionTypes.SUBMIT_FORM_IDLE,
});
export const submitFormSuccess = (data: ServerPOSTSuccessData): SubmitFormSuccessAction => ({
  type: FormActionTypes.SUBMIT_FORM_SUCCESS,
  payload: data,
});
export const submitFormError = (errorMessage: string): SubmitFormErrorAction => ({
  type: FormActionTypes.SUBMIT_FORM_ERROR,
  payload: errorMessage,
});

export const submitFormData = (formData: ServerDataType) => async (dispatch: Dispatch) => {
  dispatch(submitFormAttempt());

  try {
    const response: ServerResponse = await sendFormData(formData);

    if ('success' in response && response.success) {
      const { data } = response;
      dispatch(submitFormSuccess(data));
      if (data) {
        dispatch(setUserId(data.user_id, data.edit_code));
      }
    } else {
      handleError(response.message || 'Unknown server response', dispatch);
    }
  } catch (error: unknown) {
    handleUnknownError(error, dispatch);
  }
};

// Имитирую запрос на сервер
// export const submitFormData = (formData: ServerDataType) => async (dispatch: Dispatch) => {
// 	dispatch(submitFormAttempt());
// 	try {
// 		await new Promise((resolve) =>
// 			setTimeout(() => {
// 				resolve('Success');
// 			}, 1000)
// 		);
// 		dispatch(submitFormSuccess({edit_code: '', page_url: '', user_id: ''}));
// 		console.log('Form submitted successfully:', formData);
// 	} catch (error: any) {
// 		dispatch(submitFormError(error.message));
// 		console.error('Failed to submit form:', error);
// 	}
// };

const getFormData = (): GetFormDataAttempt => ({
  type: SocialsActionTypes.GET_FORM_DATA,
});
const getFormDataSuccess = (socialsData: socialsIcons[]): GetFormDataSuccess => ({
  type: SocialsActionTypes.GET_FORM_DATA_SUCCESS,
  payload: socialsData,
});
const getFormDataError = (errorMessage: string) => ({
  type: SocialsActionTypes.GET_FORM_DATA_ERROR,
  payload: errorMessage,
});
export const getSocials = () => async (dispatch: Dispatch) => {
  dispatch(getFormData());
  console.log('getSocials');
  try {
    const socialsData: socialsIcons[] = await getSocialsData();
    dispatch(getFormDataSuccess(socialsData));
  } catch (error: any) {
    dispatch(getFormDataError(error.message));
    console.error('Failed to fetch socials data:', error);
  }
};

const setUserDataForPutRequest = (data: ServerPageData): SetUserDataForPutRequest => ({
    type: SetUserDataTypes.SET_USER_DATA_FOR_PUT_REQUEST,
    payload: data
})
const setUserDataForPutRequestIdle = ():SetUserDataForPutRequestIdle => ({
  type: SetUserDataTypes.SET_USER_DATA_FOR_PUT_REQUEST_IDLE,
})
export const setUserDataForPutRequestTC = (data: ServerPageData) => (dispatch: Dispatch) => {
  dispatch(setUserDataForPutRequest(data));
}


export const submitFormDataForPUT = (data: ServerDataType) => async (dispatch: Dispatch) => {

}