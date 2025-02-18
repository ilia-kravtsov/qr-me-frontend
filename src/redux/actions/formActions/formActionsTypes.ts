import { FormActionTypes, SetUserDataTypes, SocialsActionTypes } from './formActions';
import {
  ServerPOSTSuccessData,
  socialsIcons,
} from '../../../components/UserDataFormContainer/UserDataForm/UserDataFormTypes';
import { ServerPageData } from '../../../components/PersonalPageContainer/PersonalPage/PersonalPageTypes';
import { CheckUserEditCodeSuccess } from '../personalPageActions/personalPageActionsTypes';

export type FormActions =
  | SubmitFormStartAction
  | SubmitFormSuccessAction
  | SubmitFormErrorAction
  | SubmitFormIdleAction
  | GetFormDataSuccess
  | GetFormDataAttempt
  | GetFormDataError
  | SetUserDataForPutRequest
  | CheckUserEditCodeSuccess
  | SubmitFormPut
  | SubmitFormPutSuccess
  | SubmitFormPutError
  | SetUserDataForPutRequestIdle;

export type SubmitFormStartAction = {
  type: FormActionTypes.SUBMIT_FORM;
};

export type SubmitFormErrorAction = {
  type: FormActionTypes.SUBMIT_FORM_ERROR;
  payload: string;
};

export type SubmitFormSuccessAction = {
  type: FormActionTypes.SUBMIT_FORM_SUCCESS;
  payload: ServerPOSTSuccessData;
};

export type SubmitFormIdleAction = {
  type: FormActionTypes.SUBMIT_FORM_IDLE;
};

export type SubmitFormPut = {
  type: FormActionTypes.SUBMIT_FORM_PUT;
};

export type SubmitFormPutSuccess = {
  type: FormActionTypes.SUBMIT_FORM_PUT_SUCCESS;
  payload: { success: boolean };
};

export type SubmitFormPutError = {
  type: FormActionTypes.SUBMIT_FORM_PUT_ERROR;
  payload: string;
};

export type SubmitFormPutResponseStatus = {
  success: boolean;
};

export type SocialsServer = {
  social_id: number;
  social_url: string;
};

export type ServerDataType = {
  photo?: string | null;
  first_name: string;
  last_name: string;
  middle_name?: string | null;
  about?: string | null;
  company?: string | null;
  position?: string | null;
  address?: string | null;
  phones?: string[] | null;
  emails?: string[] | null;
  websites?: string[] | null;
  socials?: SocialsServer[] | null;
};

export type GetFormDataSuccess = {
  type: SocialsActionTypes.GET_FORM_DATA_SUCCESS;
  payload: socialsIcons[];
};

export type GetFormDataAttempt = {
  type: SocialsActionTypes.GET_FORM_DATA;
};

export type GetFormDataError = {
  type: SocialsActionTypes.GET_FORM_DATA_ERROR;
  payload: string;
};

export type SetUserId = {
  type: SetUserDataTypes.SET_USER_ID;
  payload: {
    userId: string;
    editCode: string;
  };
};

export type SetUserDataForPutRequest = {
  type: SetUserDataTypes.SET_USER_DATA_FOR_PUT_REQUEST;
  payload: ServerPageData;
};

export type SetUserDataForPutRequestIdle = {
  type: SetUserDataTypes.SET_USER_DATA_FOR_PUT_REQUEST_IDLE;
};

export type ServerDataForPUTRequest = {
  edit_code?: string | null;
  photo?: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  about?: string | null;
  company?: string | null;
  position?: string | null;
  address?: string | null;
  phones?: { phone_id: number; number: string }[] | null;
  emails?: { email_id: number; email_address: string }[] | null;
  websites?: { website_id: number; website_address: string }[] | null;
  socials?: { social_id: number; social_url: string; social_row_id?: number }[] | null;
};
