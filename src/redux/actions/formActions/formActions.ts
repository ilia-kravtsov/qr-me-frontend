import {sendFormData} from "../../../api/api";
import {Dispatch} from "redux";
import {
	SendFormDataToServer,
	SubmitFormErrorAction,
	SubmitFormStartAction,
	SubmitFormSuccessAction,
} from './formActionsTypes';

export enum FormActionTypes {
	SUBMIT_FORM = 'SUBMIT_FORM',
	SUBMIT_FORM_SUCCESS = 'SUBMIT_FORM_SUCCESS',
	SUBMIT_FORM_ERROR = 'SUBMIT_FORM_ERROR',
}

export const submitFormAttempt = (): SubmitFormStartAction => ({
	type: FormActionTypes.SUBMIT_FORM,
});

export const submitFormSuccess = (): SubmitFormSuccessAction => ({
	type: FormActionTypes.SUBMIT_FORM_SUCCESS,
});

export const submitFormError = (errorMessage: string): SubmitFormErrorAction => ({
	type: FormActionTypes.SUBMIT_FORM_ERROR,
	payload: errorMessage,
});

export const submitFormData = (formData: SendFormDataToServer) => async (dispatch: Dispatch) => {
	setTimeout(() => {
		console.log('start');
	}, 5000)
	dispatch(submitFormAttempt());
	try {
		const response = await sendFormData(formData);
		dispatch(submitFormSuccess());
		console.log("Form submitted successfully:", response);
	} catch (error: any) {
		dispatch(submitFormError(error.message));
		console.error("Failed to submit form:", error);
	}
};