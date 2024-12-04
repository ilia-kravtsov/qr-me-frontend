import { getSocialsData, sendFormData } from '../../../api/api';
import { Dispatch } from 'redux';
import {
	GetFormDataAttempt, GetFormDataSuccess,
	ServerDataType,
	SubmitFormErrorAction, SubmitFormIdleAction,
	SubmitFormStartAction,
	SubmitFormSuccessAction,
} from './formActionsTypes';
import { socialsIcons } from '../../../components/UserDataFormContainer/UserDataForm/UserDataFormTypes';

export enum FormActionTypes {
  SUBMIT_FORM = 'SUBMIT_FORM',
  SUBMIT_FORM_SUCCESS = 'SUBMIT_FORM_SUCCESS',
  SUBMIT_FORM_ERROR = 'SUBMIT_FORM_ERROR',
  SUBMIT_FORM_IDLE = 'SUBMIT_FORM_IDLE',
}

export enum SocialsActionTypes {
	GET_FORM_DATA = 'GET_FORM_DATA',
	GET_FORM_DATA_SUCCESS = 'GET_FORM_DATA_SUCCESS',
	GET_FORM_DATA_ERROR = 'GET_FORM_DATA_ERROR',
}

export const submitFormAttempt = (): SubmitFormStartAction => ({
  type: FormActionTypes.SUBMIT_FORM,
});

export const submitFormIdle = (): SubmitFormIdleAction => ({
	type: FormActionTypes.SUBMIT_FORM_IDLE,
});

export const submitFormSuccess = (): SubmitFormSuccessAction => ({
  type: FormActionTypes.SUBMIT_FORM_SUCCESS,
});

export const submitFormError = (errorMessage: string): SubmitFormErrorAction => ({
  type: FormActionTypes.SUBMIT_FORM_ERROR,
  payload: errorMessage,
});

// export const submitFormData = (formData: ServerDataType) => async (dispatch: Dispatch) => {
// 	dispatch(submitFormAttempt());
// 	try {
// 		const response = await sendFormData(formData);
// 		dispatch(submitFormSuccess());
// 		console.log('Form submitted successfully:', response);
// 	} catch (error: unknown) {
// 		if (axios.isAxiosError(error)) {
// 			toast.error(error.message);
// 			dispatch(submitFormError(error.response?.data?.message || 'Failed to submit form data'));
// 			console.error('Failed to submit form:', error.message);
// 		} else {
// 			toast.error('An unexpected error occurred');
// 			dispatch(submitFormError('An unexpected error occurred'));
// 			console.error('Failed to submit form:', error);
// 		}
// 	}
// };

// Имитирую запрос на сервер
export const submitFormData = (formData: ServerDataType) => async (dispatch: Dispatch) => {
	dispatch(submitFormAttempt());
	try {
		await new Promise((resolve) =>
			setTimeout(() => {
				resolve('Success');
			}, 1000)
		);
		dispatch(submitFormSuccess());
		console.log('Form submitted successfully:', formData);
	} catch (error: any) {
		dispatch(submitFormError(error.message));
		console.error('Failed to submit form:', error);
	}
};

const getFormData = ():GetFormDataAttempt => ({
  type: SocialsActionTypes.GET_FORM_DATA
})

const getFormDataSuccess = (socialsData: socialsIcons[]):GetFormDataSuccess => ({
	type: SocialsActionTypes.GET_FORM_DATA_SUCCESS,
	payload: socialsData
})

const getFormDataError = (errorMessage: string) => ({
  type: SocialsActionTypes.GET_FORM_DATA_ERROR,
	payload: errorMessage
})

export const getSocials = () => async (dispatch: Dispatch) => {
	dispatch(getFormData());
	console.log('getSocials');
	try {
		const socialsData: socialsIcons[] = await getSocialsData();
		dispatch(getFormDataSuccess(socialsData));
	} catch (error: any) {
		dispatch(getFormDataError(error.message));
		console.error('Failed to fetch socials data:', error);
	}
};

