import { ServerDataType } from '../../../redux/actions/formActions/formActionsTypes';
import { ServerPageData } from '../../PersonalPageContainer/PersonalPage/PersonalPageTypes';

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
	setDataForPutStatus: LoadingStatus
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
	type?: string
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
	socialsLinks?: socialsLinks[]
}

export type FormServerData = Omit<FormState, 'socialsIcons'> & {
	socials: socialsLinks[];
};

export type UserDataFormProps = FormState & FormStatus & {
	onSubmit: (data: FormServerData, setDataForPutStatus: LoadingStatus) => void;
}

export type FormMethods = {
	submitFormData: (data: ServerDataType) => void
	submitFormDataForPUT: (data: ServerDataType) => void
	getSocialsData: () => void
};

export type UserDataFormContainerProps = FormMethods & FormState & FormStatus & LocationState

export type FormReducerType = FormStatus & FormState

export type FormStatus = {
	submitSuccessData?: ServerPOSTSuccessData
	setDataForPutStatus: LoadingStatus
	socialsStatus: LoadingStatus
	submitStatus: LoadingStatus
	getDataError?: null | string
	submitError?: null | string
}

export type ServerPOSTSuccessData = {
	user_id: string;
	page_url: string;
	edit_code: string;
};

export type ServerErrorResponse = {
	status: "error"
	message: string
}

export type ServerSuccessResponse = {
	success: true;
	message: string;
	data: ServerPOSTSuccessData
}

export type ServerResponse = ServerSuccessResponse | ServerErrorResponse

type LocationState = {
	locationState?: {
		data: ServerPageData
	}
}

