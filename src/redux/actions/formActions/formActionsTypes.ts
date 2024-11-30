import {FormActionTypes} from "./formActions";

export type FormActions =
	| SubmitFormStartAction
	| SubmitFormSuccessAction
	| SubmitFormErrorAction;

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

type SocialsServer = {
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