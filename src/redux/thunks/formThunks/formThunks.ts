import { ServerDataForPUTRequest, ServerDataType } from '../../actions/formActions/formActionsTypes';
import { Dispatch } from 'redux';
import { getSocialsData, sendFormData, updateUserData } from '../../../api/api';
import {
  getFormData,
  getFormDataError,
  getFormDataSuccess,
  setUserDataForPutRequest,
  setUserDataForPutRequestIdle,
  setUserId,
  submitFormAttempt,
  submitFormError,
  submitFormPut,
  submitFormPutError,
  submitFormPutSuccess,
  submitFormSuccess,
} from '../../actions/formActions/formActions';
import { ServerPageData } from '../../../components/PersonalPageContainer/PersonalPage/PersonalPageTypes';
import { ServerResponse, socialsIcons } from '../../../components/UserDataFormContainer/UserDataForm/UserDataFormTypes';
import { handleError, handleUnknownError } from '../../actions/utils/utils';

export const setUserDataForPutRequestTC = (data: ServerPageData) => (dispatch: Dispatch) => {
  dispatch(setUserDataForPutRequest(data));
};

export const getSocials = () => async (dispatch: Dispatch) => {
  dispatch(getFormData());
  try {
    const socialsData: socialsIcons[] = await getSocialsData();
    dispatch(getFormDataSuccess(socialsData));
  } catch (error: any) {
    dispatch(getFormDataError(error.message));
    console.error('Failed to fetch socials data:', error);
  }
};

export const putSubmitFormData =
  (data: ServerDataForPUTRequest, userId: string | null | undefined) => async (dispatch: Dispatch) => {
    dispatch(submitFormPut());
    if (userId) {
      try {
        const response = await updateUserData(userId, data);
        dispatch(submitFormPutSuccess(response));
        dispatch(setUserDataForPutRequestIdle());
        console.log('Data successfully updated:', response);
      } catch (error: any) {
        dispatch(submitFormPutError(error.message));
        console.error('Error while updating data:', error);
      }
    } else {
      console.log('There is no userId: ', userId);
    }
  };

export const submitFormData = (formData: ServerDataType) => async (dispatch: Dispatch) => {
  dispatch(submitFormAttempt());

  try {
    const response: ServerResponse = await sendFormData(formData);

    if ('success' in response && response.success) {
      const { data } = response;
      dispatch(submitFormSuccess(data));
      if (data) {
        dispatch(setUserId(data.user_id, data.edit_code));
      }
    } else {
      handleError(response.message || 'Unknown server response', dispatch);
    }
  } catch (error: unknown) {
    handleUnknownError(error, dispatch);
  }
};

// Имитирую запрос на сервер
// export const submitFormData = (formData: ServerDataType) => async (dispatch: Dispatch) => {
//   dispatch(submitFormAttempt());
//   try {
//     await new Promise((resolve) =>
//       setTimeout(() => {
//         resolve('Success');
//       }, 1000),
//     );
//     dispatch(submitFormSuccess({ edit_code: '', page_url: '', user_id: '' }));
//     console.log('Form submitted successfully:', formData);
//   } catch (error: any) {
//     dispatch(submitFormError(error.message));
//     console.error('Failed to submit form:', error);
//   }
// };
