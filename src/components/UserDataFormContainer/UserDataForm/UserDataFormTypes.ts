export type UserDataFormState = {
	newFieldLabel: string
	additionalFields: Field[]
	predefinedFields: Field[]
};

export type Field = {
	id: string
	label: string
	value: string
	type?: string
	required?: boolean
	placeholder?: string
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