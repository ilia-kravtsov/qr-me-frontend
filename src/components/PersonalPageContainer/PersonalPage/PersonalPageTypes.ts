import { LoadingStatus } from '../../UserDataFormContainer/UserDataForm/UserDataFormTypes';

export type PersonalPageMethods = {
  getUserDataTC: (userId: string) => void;
  checkEditCodeTC: (userId: string, editCode: string) => void;
};

export type PersonalPageProps = ServerPageDataType & PersonalPageMethods & RouteParams & StatusType;

export type PersonalPageReducer = ServerPageDataType & StatusType;

export type ServerPageDataType = {
  success: boolean;
  data: ServerPageData;
};

export type ServerPageData = {
  photo?: string | null;
  first_name: string;
  last_name: string;
  middle_name?: string;
  about?: string;
  company?: string;
  position?: string;
  address?: string;
  phones?: { phone_id: number; number: string }[];
  emails?: { email_id: number; email_address: string }[];
  websites?: { website_id: number; website_address: string }[];
  socials?: { social_id: number; social_url: string; social_row_id: number }[];
};

export type PersonalSiteType = {
  isEnterCodeOpen: boolean;
  editCodeFromUser: string;
};

export type RouteParams = {
  user_id: string;
};

export type StatusType = {
  getUserDataStatus?: LoadingStatus;
  getUserDataError: string | null;
  checkUserEditCodeStatus: LoadingStatus;
  checkUserEditCodeError: string | null;
};
