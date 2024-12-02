import {FormState} from "../../../components/UserDataFormContainer/UserDataForm/UserDataFormTypes";

export const GET_USER_DATA = 'GET_USER_DATA';

export const getUserDataAC = (userData: FormState) => ({
	type: GET_USER_DATA,
	payload: userData,
});