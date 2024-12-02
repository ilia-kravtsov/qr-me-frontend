import {FormState} from "../../../components/UserDataFormContainer/UserDataForm/UserDataFormTypes";
import {FormActionTypes} from "./formActions";

export type SubmitFormStartAction = {
	type: FormActionTypes.SUBMIT_FORM;
}

export type SaveFormDataAction = {
	type: FormActionTypes.SAVE_FORM_DATA;
	payload: FormState;
}

export type SubmitFormErrorAction = {
	type: FormActionTypes.SUBMIT_FORM_ERROR;
	payload: string;
}