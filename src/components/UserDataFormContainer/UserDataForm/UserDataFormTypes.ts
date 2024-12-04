import { ServerDataType } from '../../../redux/actions/formActions/formActionsTypes';

export type InputsType = 'text' | 'number' | 'email' | 'password' | 'tel' | 'url';
export type FieldType = 'predefinedFields' | 'phones' | 'emails' | 'websites';
export type LoadingStatus = 'idle' | 'loading' | 'success' | 'error'
export type ArrayFieldType = 'phones' | 'emails' | 'websites'

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
	fieldsErrors: fieldError
	isQrGenerated: boolean
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

export type FormServerData = Omit<FormState, 'socialsIcons'> & {
	socials: socialsLinks[];
};

export type UserDataFormProps = FormState & FormStatus & {
	onSubmit: (data: FormServerData) => void;
}

export type FormMethods = {
	submitFormData: (data: ServerDataType) => void;
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

export type ServerError = {
	status: "error"
	message: string
}
