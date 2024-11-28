export type InputsType = 'text' | 'number' | 'email' | 'password' | 'tel' | 'url';
export type FieldType = 'predefinedFields' | 'phones' | 'emails' | 'socials' | 'websites';

type fieldError = {
	[key: string]: string
}

export type UserDataFormState = {
	newFieldLabel: string
	fieldsErrors: fieldError
} & FormState

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

export type FormMethods = {
	onSubmit: (data: FormState) => void;
};

export type FormState = {
	predefinedFields: Field[]
	phones: Field[]
	emails: Field[]
	websites: Field[]
	socials: Field[]
}

export type UserDataFormProps = FormMethods & FormState & FormStatus

export type FormReducerType = FormStatus & FormState

export type FormStatus = {
	isSubmitting: boolean
	submitError: null | string
}