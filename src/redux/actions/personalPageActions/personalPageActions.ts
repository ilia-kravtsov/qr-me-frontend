import {
  CheckUserEditCode,
  CheckUserEditCodeError,
  CheckUserEditCodeSuccess,
  GetUserDataAttemptAction,
  GetUserDataErrorAction,
  GetUserDataSuccessAction,
} from './personalPageActionsTypes';
import { ServerPageDataType } from '../../../components/PersonalPageContainer/PersonalPage/PersonalPageTypes';

export enum UserActionTypes {
  GET_USER_DATA = 'GET_USER_DATA',
  GET_USER_DATA_SUCCESS = 'GET_USER_DATA_SUCCESS',
  GET_USER_DATA_ERROR = 'GET_USER_DATA_ERROR',
}
export enum CheckUserEditCodeTypes {
  CHECK_USER_EDIT_CODE = 'CHECK_USER_EDIT_CODE',
  CHECK_USER_EDIT_SUCCESS = 'CHECK_USER_EDIT_SUCCESS',
  CHECK_USER_EDIT_ERROR = 'CHECK_USER_EDIT_ERROR',
}

export const getUserDataAttempt = (): GetUserDataAttemptAction => ({
  type: UserActionTypes.GET_USER_DATA,
});
export const getUserDataSuccess = (userData: ServerPageDataType): GetUserDataSuccessAction => ({
  type: UserActionTypes.GET_USER_DATA_SUCCESS,
  payload: userData,
});
export const getUserDataError = (errorMessage: string): GetUserDataErrorAction => ({
  type: UserActionTypes.GET_USER_DATA_ERROR,
  payload: errorMessage,
});

export const checkUserEditCode = (): CheckUserEditCode => ({
  type: CheckUserEditCodeTypes.CHECK_USER_EDIT_CODE,
});
export const checkUserEditCodeSuccess = (userId: string, editCode: string): CheckUserEditCodeSuccess => ({
  type: CheckUserEditCodeTypes.CHECK_USER_EDIT_SUCCESS,
  payload: {
    userId,
    editCode,
  },
});
export const checkUserEditCodeError = (errorMessage: string): CheckUserEditCodeError => ({
  type: CheckUserEditCodeTypes.CHECK_USER_EDIT_ERROR,
  payload: {
    errorMessage,
  },
});
