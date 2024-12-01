import { FormActionTypes, SocialsActionTypes } from './formActions';
import { socialsIcons } from '../../../components/UserDataFormContainer/UserDataForm/UserDataFormTypes';

export type FormActions =
	| SubmitFormStartAction
	| SubmitFormSuccessAction
	| SubmitFormErrorAction
	| GetFormDataSuccess
	| GetFormDataAttempt
	| GetFormDataError

export type SubmitFormStartAction = {
	type: FormActionTypes.SUBMIT_FORM;
}

export type SubmitFormErrorAction = {
	type: FormActionTypes.SUBMIT_FORM_ERROR;
	payload: string;
}

export type SubmitFormSuccessAction = {
	type: FormActionTypes.SUBMIT_FORM_SUCCESS;
}

export type SocialsServer = {
	social_id: number
	social_url: string
}

export type SendFormDataToServer = {
	photo?: string | null
	first_name: string
	last_name: string
	middle_name?: string | null
	about?: string | null
	company?: string | null
	position?: string | null
	address?: string | null
	phones?: string[] | null
	emails?: string[] | null
	websites?: string[] | null
	socials?: SocialsServer[] | null
}

export type GetFormDataSuccess = {
	type: SocialsActionTypes.GET_FORM_DATA_SUCCESS;
	payload: socialsIcons[];
}

export type GetFormDataAttempt = {
	type: SocialsActionTypes.GET_FORM_DATA;
}

export type GetFormDataError = {
	type: SocialsActionTypes.GET_FORM_DATA_ERROR;
	payload: string
}