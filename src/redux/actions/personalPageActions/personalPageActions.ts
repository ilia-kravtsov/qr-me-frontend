import { Dispatch } from 'redux';
import { checkEditCode, getUserData } from '../../../api/api';
import {
  CheckUserEditCode, CheckUserEditCodeError, CheckUserEditCodeSuccess,
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

export const getUserDataTC = (userId: string) => async (dispatch: Dispatch) => {
	dispatch(getUserDataAttempt());
	try {
		const userData: ServerPageDataType = await getUserData(userId);
		dispatch(getUserDataSuccess(userData));
	} catch (error: any) {
		dispatch(getUserDataError(error.message));
		console.error("Ошибка при получении данных пользователя:", error);
	}
};

export const checkUserEditCode = (): CheckUserEditCode => ({
  type: CheckUserEditCodeTypes.CHECK_USER_EDIT_CODE,
})

export const checkUserEditCodeSuccess = (): CheckUserEditCodeSuccess => ({
  type: CheckUserEditCodeTypes.CHECK_USER_EDIT_SUCCESS,
})

export const checkUserEditCodeError = (errorMessage: string): CheckUserEditCodeError => ({
  type: CheckUserEditCodeTypes.CHECK_USER_EDIT_ERROR,
  payload: errorMessage,
})

export const checkEditCodeTC = (userId: string, editCode: string) => async (dispatch: Dispatch) => {
  dispatch(checkUserEditCode());
  try {
    const checkStatus = await checkEditCode(userId, editCode);
    if (checkStatus.success) {
      dispatch(checkUserEditCodeSuccess());
    } else {
      dispatch(checkUserEditCodeError('Не верный код'))
    }
  } catch (error: any) {
    dispatch(checkUserEditCodeError(error.message));
    console.error("Ошибка при получении данных пользователя:", error);
  }
}