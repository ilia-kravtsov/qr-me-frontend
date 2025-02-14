import { ServerDataForPUTRequest, ServerDataType } from '../../../redux/actions/formActions/formActionsTypes';
import { ServerPageData } from '../../PersonalPageContainer/PersonalPage/PersonalPageTypes';
import { setUserDataForPutRequestTC } from '../../../redux/thunks/formThunks/formThunks';

export type FieldType = 'predefinedFields' | 'phones' | 'emails' | 'websites';
export type LoadingStatus = 'idle' | 'loading' | 'success' | 'error';
export type ArrayFieldType = 'phones' | 'emails' | 'websites';

type fieldError = {
  [key: string]: string;
};

export type UserDataFormState = {
  predefinedFields: Field[];
  phones: Field[];
  emails: Field[];
  websites: Field[];
  socialsIcons: socialsIcons[];
  socialsLinks: socialsLinks[];
  fieldsErrors: fieldError;
  isQrGenerated: boolean;
  setDataForPutStatus: LoadingStatus;
  updatedUserLink: string;
};

export type socialsIcons = {
  id: number;
  name: string;
  icon_link: string;
};

export type socialsLinks = {
  id: number;
  social_url: string;
  social_row_id?: number;
};

export type Field = {
  id: string;
  label: string;
  value: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  minLength?: number;
  pattern?: string;
  title?: string;
};

export type FormState = {
  predefinedFields: Field[];
  phones: Field[];
  emails: Field[];
  websites: Field[];
  socialsIcons: socialsIcons[];
  socialsLinks?: socialsLinks[];
};

export type FormServerData = Omit<FormState, 'socialsIcons'> & {
  socials: socialsLinks[];
};

export type UserDataFormProps = FormState &
  FormStatus & {
    onSubmit: (data: FormServerData) => void;
  };

export type FormMethods = {
  submitFormData: (data: ServerDataType) => void;
  submitFormDataForPUT: (data: ServerDataForPUTRequest, userId: string | null | undefined) => void;
  setUserDataForPutRequestTC: (data: ServerPageData) => void;
  getSocialsData: () => void;
};

export type UserDataFormContainerProps = FormMethods & FormState & FormStatus & LocationState;

export type FormReducerType = FormStatus & FormState;

export type FormStatus = {
  submitSuccessData?: ServerPOSTSuccessData;
  setDataForPutStatus: LoadingStatus;
  socialsStatus: LoadingStatus;
  submitStatus: LoadingStatus;
  submitPutStatus: LoadingStatus;
  getDataError?: null | string;
  submitError?: null | string;
  submitPutError?: null | string;
  userEditCode?: null | string;
  userId?: null | string;
};

export type ServerPOSTSuccessData = {
  user_id: string;
  page_url: string;
  edit_code: string;
};

export type ServerErrorResponse = {
  status: 'error';
  message: string;
};

export type ServerSuccessResponse = {
  success: true;
  message: string;
  data: ServerPOSTSuccessData;
};

export type ServerResponse = ServerSuccessResponse | ServerErrorResponse;

type LocationState = {
  locationState?: {
    data: ServerPageData;
  };
};
