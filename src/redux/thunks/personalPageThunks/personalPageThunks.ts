import { Dispatch } from 'redux';
import { checkEditCode, getUserData } from '../../../api/api';
import {
  checkUserEditCode,
  checkUserEditCodeError,
  checkUserEditCodeSuccess, getUserDataAttempt, getUserDataError, getUserDataSuccess,
} from '../../actions/personalPageActions/personalPageActions';
import { ServerPageDataType } from '../../../components/PersonalPageContainer/PersonalPage/PersonalPageTypes';

export const checkEditCodeTC = (userId: string, editCode: string) => async (dispatch: Dispatch) => {
  dispatch(checkUserEditCode());
  try {
    const checkStatus = await checkEditCode(userId, editCode);
    if (checkStatus.success) {
      dispatch(checkUserEditCodeSuccess(userId, editCode));
    } else {
      dispatch(checkUserEditCodeError('Не верный код'))
    }
  } catch (error: any) {
    dispatch(checkUserEditCodeError(error.message));
    console.error("Ошибка при получении данных пользователя:", error);
  }
}

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