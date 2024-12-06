import { CheckUserEditCodeTypes, UserActionTypes } from './personalPageActions';
import { ServerPageDataType } from '../../../components/PersonalPageContainer/PersonalPage/PersonalPageTypes';

export type GetUserDataAttemptAction = {
  type: UserActionTypes.GET_USER_DATA;
}

export type GetUserDataSuccessAction = {
  type: UserActionTypes.GET_USER_DATA_SUCCESS;
  payload: ServerPageDataType;
}

export type GetUserDataErrorAction = {
  type: UserActionTypes.GET_USER_DATA_ERROR;
  payload: string;
}

export type GetUserDataActions =
  | GetUserDataAttemptAction
  | GetUserDataSuccessAction
  | GetUserDataErrorAction;

export type CheckUserEditCode = {
  type: CheckUserEditCodeTypes.CHECK_USER_EDIT_CODE
}

export type CheckUserEditCodeSuccess = {
  type: CheckUserEditCodeTypes.CHECK_USER_EDIT_SUCCESS
  payload: {
    userId: string
    editCode: string
  }
}

export type CheckUserEditCodeError = {
  type: CheckUserEditCodeTypes.CHECK_USER_EDIT_ERROR,
  payload: {
    errorMessage: string
  }
}

export type CheckUserEditCodeGeneral =
  | CheckUserEditCode
  | CheckUserEditCodeSuccess
  | CheckUserEditCodeError;