import { GetUserDataActions } from '../../actions/personalPageActions/personalPageActionsTypes';
import { PersonalPageReducer } from '../../../components/PersonalPageContainer/PersonalPage/PersonalPageTypes';
import { UserActionTypes } from '../../actions/personalPageActions/personalPageActions';

type Actions = GetUserDataActions;

const initialState: PersonalPageReducer = {
  photo: null,
  first_name: '',
  last_name: '',
  middle_name: '',
  about: null,
  company: null,
  position: null,
  address: null,
  phones: [],
  emails: [],
  websites: [],
  socials: [],
  getUserDataStatus: 'idle',
  getUserDataError: null,
};

export const personalPageReducer = (state = initialState, action: Actions): PersonalPageReducer => {
  switch (action.type) {
    case UserActionTypes.GET_USER_DATA:
      return { ...state, getUserDataStatus: 'loading', getUserDataError: null};
    case UserActionTypes.GET_USER_DATA_SUCCESS:
      const {
        photo,
        first_name,
        last_name,
        middle_name,
        about,
        company,
        position,
        address,
        phones,
        emails,
        websites,
        socials
      } = action.payload;
      return {
        ...state,
        photo: photo ?? null,
        first_name: first_name ?? '',
        last_name: last_name ?? '',
        middle_name: middle_name ?? '',
        about: about ?? null,
        company: company ?? null,
        position: position ?? null,
        address: address ?? null,
        phones: phones ?? [],
        emails: emails ?? [],
        websites: websites ?? [],
        socials: socials ?? [],
        getUserDataStatus: 'success',
        getUserDataError: null
      };
    case UserActionTypes.GET_USER_DATA_ERROR:
      return { ...state, getUserDataStatus: 'error', getUserDataError: action.payload, };
    default:
      return state;
  }
};