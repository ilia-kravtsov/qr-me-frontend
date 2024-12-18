import {
  CheckUserEditCodeGeneral,
  GetUserDataActions,
} from '../../actions/personalPageActions/personalPageActionsTypes';
import { Personal } from '../../../components/PersonalPageContainer/PersonalPage/PersonalPageTypes';
import { CheckUserEditCodeTypes, UserActionTypes } from '../../actions/personalPageActions/personalPageActions';
import { SetUserId } from '../../actions/formActions/formActionsTypes';

type Actions = GetUserDataActions | SetUserId | CheckUserEditCodeGeneral;

const initialState: Personal = {
  success: false,
  data: {
    first_name: 'Иван',
    last_name: 'Иванов',
    middle_name: 'Иванов',
    about: 'I am good',
    address: 'Lenina street 14',
    position: 'teamlead',
    company: 'ООО Гугл',
    websites: [{ website_id: 5, website_address: 'https://www.google.com' }],
    phones: [{ phone_id: 1, number: '+78888888888' }],
    emails: [{ email_id: 2, email_address: 'ivanov@mail.com' }],
    socials: [{ social_id: 3, social_row_id: 4, social_url: 'https://www.facebook.com' }],
  },
  getUserDataStatus: 'idle',
  getUserDataError: null,
  checkUserEditCodeStatus: 'idle',
  checkUserEditCodeError: null,
};

export const personalPageReducer = (state = initialState, action: Actions): Personal => {
  switch (action.type) {
    case UserActionTypes.GET_USER_DATA:
      return { ...state, getUserDataStatus: 'loading', getUserDataError: null };
    case UserActionTypes.GET_USER_DATA_SUCCESS:
      const { success, data } = action.payload;
      return {
        ...state,
        success: success,
        data: {
          photo: data.photo,
          first_name: data.first_name,
          last_name: data.last_name,
          middle_name: data.middle_name,
          about: data.about,
          address: data.address,
          company: data.company,
          position: data.position,
          phones: data.phones || [],
          emails: data.emails || [],
          websites: data.websites || [],
          socials: data.socials || [],
        },
        getUserDataStatus: 'success',
        getUserDataError: null,
      };
    case UserActionTypes.GET_USER_DATA_ERROR:
      return { ...state, getUserDataStatus: 'error', getUserDataError: action.payload };
    case CheckUserEditCodeTypes.CHECK_USER_EDIT_CODE:
      return { ...state, checkUserEditCodeStatus: 'loading', checkUserEditCodeError: null };
    case CheckUserEditCodeTypes.CHECK_USER_EDIT_SUCCESS:
      return { ...state, checkUserEditCodeStatus: 'success', checkUserEditCodeError: null };
    case CheckUserEditCodeTypes.CHECK_USER_EDIT_ERROR:
      return { ...state, checkUserEditCodeStatus: 'error', checkUserEditCodeError: action.payload.errorMessage };
    default:
      return state;
  }
};
