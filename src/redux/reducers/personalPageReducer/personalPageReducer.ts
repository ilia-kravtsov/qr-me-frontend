import {
	Field,
	FormDataToServer,
	FormState,
} from '../../../components/UserDataFormContainer/UserDataForm/UserDataFormTypes';
import {GET_USER_DATA, getUserDataAC} from "../../actions/personalPageActions/personalPageActions";

type Actions = ReturnType<typeof getUserDataAC>;

const initialState: FormDataToServer = {
	predefinedFields: [],
	phones: [],
	emails: [],
	websites: [],
	socials: [],
};

export const personalPageReducer = (state = initialState, action: Actions): FormDataToServer => {
	switch (action.type) {
		case GET_USER_DATA: {
			const { predefinedFields, socials } = action.payload;
			return {
				...state,
				predefinedFields: [...predefinedFields],
				socials: [...socials],
			};
		}
		default:
			return state;
	}
};