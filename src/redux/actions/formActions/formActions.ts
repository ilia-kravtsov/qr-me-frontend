import { getSocialsData, sendFormData, updateUserData } from '../../../api/api';
import { Dispatch } from 'redux';
import {
  GetFormDataAttempt,
  GetFormDataSuccess,
  ServerDataForPUTRequest,
  ServerDataType,
  SetUserDataForPutRequest,
  SetUserDataForPutRequestIdle,
  SetUserId,
  SubmitFormErrorAction,
  SubmitFormIdleAction,
  SubmitFormPut,
  SubmitFormPutError,
  SubmitFormPutResponseStatus,
  SubmitFormPutSuccess,
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
export enum FormActionTypes {
  SUBMIT_FORM_PUT = 'SUBMIT_FORM_PUT',
  SUBMIT_FORM_PUT_SUCCESS = 'SUBMIT_FORM_PUT_SUCCESS',
  SUBMIT_FORM_PUT_ERROR = 'SUBMIT_FORM_PUT_ERROR',
}

export const setUserId = (userId: string, editCode: string): SetUserId => ({
  type: SetUserDataTypes.SET_USER_ID,
  payload: {
    userId,
    editCode,
  },
});

export const submitFormAttempt = (): SubmitFormStartAction => ({
  type: FormActionTypes.SUBMIT_FORM,
});
export const submitFormSuccess = (data: ServerPOSTSuccessData): SubmitFormSuccessAction => ({
  type: FormActionTypes.SUBMIT_FORM_SUCCESS,
  payload: data,
});
export const submitFormError = (errorMessage: string): SubmitFormErrorAction => ({
  type: FormActionTypes.SUBMIT_FORM_ERROR,
  payload: errorMessage,
});

export const getFormData = (): GetFormDataAttempt => ({
  type: SocialsActionTypes.GET_FORM_DATA,
});
export const getFormDataSuccess = (socialsData: socialsIcons[]): GetFormDataSuccess => ({
  type: SocialsActionTypes.GET_FORM_DATA_SUCCESS,
  payload: socialsData,
});
export const getFormDataError = (errorMessage: string) => ({
  type: SocialsActionTypes.GET_FORM_DATA_ERROR,
  payload: errorMessage,
});

export const submitFormPut = (): SubmitFormPut => ({
  type: FormActionTypes.SUBMIT_FORM_PUT,
});
export const submitFormPutSuccess = (data: SubmitFormPutResponseStatus): SubmitFormPutSuccess => ({
  type: FormActionTypes.SUBMIT_FORM_PUT_SUCCESS,
  payload: data,
});
export const submitFormPutError = (errorMessage: string): SubmitFormPutError => ({
  type: FormActionTypes.SUBMIT_FORM_PUT_ERROR,
  payload: errorMessage,
});

export const setUserDataForPutRequestIdle = (): SetUserDataForPutRequestIdle => ({
  type: SetUserDataTypes.SET_USER_DATA_FOR_PUT_REQUEST_IDLE,
});
export const setUserDataForPutRequest = (data: ServerPageData): SetUserDataForPutRequest => ({
  type: SetUserDataTypes.SET_USER_DATA_FOR_PUT_REQUEST,
  payload: data,
});
