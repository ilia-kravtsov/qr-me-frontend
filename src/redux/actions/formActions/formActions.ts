import {FormState} from "../../../components/UserDataFormContainer/UserDataForm/UserDataFormTypes";
import {sendFormData} from "../../../api/api";
import {Dispatch} from "redux";
import {SaveFormDataAction, SubmitFormErrorAction, SubmitFormStartAction} from "./formActionsTypes";

export enum FormActionTypes {
	SUBMIT_FORM = 'SUBMIT_FORM',
	SAVE_FORM_DATA = 'SAVE_FORM_DATA',
	SUBMIT_FORM_ERROR = 'SUBMIT_FORM_ERROR',
}

export const submitFormAttempt = (): SubmitFormStartAction => ({
	type: FormActionTypes.SUBMIT_FORM,
});

export const saveFormData = (data: FormState): SaveFormDataAction => ({
	type: FormActionTypes.SAVE_FORM_DATA,
	payload: data,
});

export const submitFormError = (errorMessage: string): SubmitFormErrorAction => ({
	type: FormActionTypes.SUBMIT_FORM_ERROR,
	payload: errorMessage,
});

export const submitFormData = (formData: FormState) => async (dispatch: Dispatch) => {
	dispatch(submitFormAttempt());
	try {
		const response = await sendFormData(formData);
		console.log(response);
		dispatch(saveFormData(response));
	} catch (error: any) {
		dispatch(submitFormError(error.message));
	}
};