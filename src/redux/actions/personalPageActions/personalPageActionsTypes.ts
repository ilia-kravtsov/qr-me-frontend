import { ServerDataType } from '../formActions/formActionsTypes';
import { UserActionTypes } from './personalPageActions';
import { RootState } from '../../store';

export type GetUserDataAttemptAction = {
  type: UserActionTypes.GET_USER_DATA;
}

export type GetUserDataSuccessAction = {
  type: UserActionTypes.GET_USER_DATA_SUCCESS;
  payload: ServerDataType;
}

export type GetUserDataErrorAction = {
  type: UserActionTypes.GET_USER_DATA_ERROR;
  payload: string;
}

export type GetUserDataActions =
  | GetUserDataAttemptAction
  | GetUserDataSuccessAction
  | GetUserDataErrorAction;

