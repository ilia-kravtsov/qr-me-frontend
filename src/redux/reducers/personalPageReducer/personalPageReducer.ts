import {FormState} from "../../../components/UserDataFormContainer/UserDataForm/UserDataFormTypes";
import {GET_USER_DATA, getUserDataAC} from "../../actions/personalPageActions/personalPageActions";

type Actions = ReturnType<typeof getUserDataAC>;

const initialState: FormState = {
	predefinedFields: [],
	additionalFields: []
};

export const personalPageReducer = (state = initialState, action: Actions): FormState => {
	switch (action.type) {
		case GET_USER_DATA: {
			const { predefinedFields, additionalFields } = action.payload;
			return {
				...state,
				predefinedFields: [...predefinedFields],
				additionalFields: [...additionalFields],
			};
		}
		default:
			return state;
	}
};