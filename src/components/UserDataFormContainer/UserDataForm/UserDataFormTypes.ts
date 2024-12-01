import { SendFormDataToServer } from '../../../redux/actions/formActions/formActionsTypes';

export type InputsType = 'text' | 'number' | 'email' | 'password' | 'tel' | 'url';
export type FieldType = 'predefinedFields' | 'phones' | 'emails' | 'websites';
type LoadingStatus = 'idle' | 'loading' | 'success' | 'error'

type fieldError = {
	[key: string]: string
}

export type UserDataFormState = {
	predefinedFields: Field[]
	phones: Field[]
	emails: Field[]
	websites: Field[]
	socialsIcons: socialsIcons[]
	socialsLinks: socialsLinks[]
	newFieldLabel: string
	fieldsErrors: fieldError
}

export type socialsIcons = {
	id: number
	name: string
	icon_link: string
}

export type socialsLinks = {
	id: number
	social_url: string
}

export type Field = {
	id: string
	label: string
	value: string
	type?: InputsType
	required?: boolean
	placeholder?: string
	minLength?: number
	pattern?: string
	title?: string
}

export type FormState = {
	predefinedFields: Field[]
	phones: Field[]
	emails: Field[]
	websites: Field[]
	socialsIcons: socialsIcons[]
}

export type FormDataToServer = Omit<FormState, 'socialsIcons'> & {
	socials: socialsLinks[];
};

export type UserDataFormProps = FormState & FormStatus & {
	onSubmit: (data: FormDataToServer) => void;
}

export type FormMethods = {
	submitFormData: (data: SendFormDataToServer) => void;
	getSocialsData: () => void
};

export type UserDataFormContainerProps = FormMethods & FormState & FormStatus

export type FormReducerType = FormStatus & FormState

export type FormStatus = {
	submitStatus: LoadingStatus
	submitError?: null | string
	socialsStatus: LoadingStatus
	getDataError?: null | string
}



