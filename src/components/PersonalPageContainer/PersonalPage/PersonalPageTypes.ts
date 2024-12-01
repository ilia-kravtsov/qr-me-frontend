import { ServerDataType } from '../../../redux/actions/formActions/formActionsTypes';
import { LoadingStatus } from '../../UserDataFormContainer/UserDataForm/UserDataFormTypes';

export type PersonalPageMethods = {
  getUserDataTC: (userId: string) => void
}

export type PersonalPageProps = ServerDataType & PersonalPageMethods

export type PersonalPageReducer = ServerDataType & {
  getUserDataStatus?: LoadingStatus
  getUserDataError: null | string
}