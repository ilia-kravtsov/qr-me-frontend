export type InputsType = 'text' | 'number' | 'email' | 'password' | 'tel' | 'url';

type fieldError = {
	[key: string]: string
}

export type UserDataFormState = {
	newFieldLabel: string
	additionalFields: Field[]
	predefinedFields: Field[]
	fieldsErrors: fieldError
};

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
	additionalFields: Field[]
	isSubmitting?: boolean
}

export type UserDataFormProps = FormMethods & FormState

export type FormReducerType = {
	isSubmitting: boolean
	submitError: null | string
} & FormState