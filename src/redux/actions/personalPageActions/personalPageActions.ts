import { Dispatch } from 'redux';
import { getUserData } from '../../../api/api';
import { ServerDataType } from '../formActions/formActionsTypes';
import { GetUserDataAttemptAction, GetUserDataErrorAction, GetUserDataSuccessAction } from './personalPageActionsTypes';

export enum UserActionTypes {
  GET_USER_DATA = 'GET_USER_DATA',
  GET_USER_DATA_SUCCESS = 'GET_USER_DATA_SUCCESS',
  GET_USER_DATA_ERROR = 'GET_USER_DATA_ERROR',
}

export const getUserDataAttempt = (): GetUserDataAttemptAction => ({
  type: UserActionTypes.GET_USER_DATA,
});

export const getUserDataSuccess = (userData: ServerDataType): GetUserDataSuccessAction => ({
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
		const userData: ServerDataType = await getUserData(userId);
		dispatch(getUserDataSuccess(userData));
	} catch (error: any) {
		dispatch(getUserDataError(error.message));
		console.error("Ошибка при получении данных пользователя:", error);
	}
};