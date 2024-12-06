import { Dispatch } from 'redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { submitFormError } from '../formActions/formActions';

export const handleError = (message: string, dispatch: Dispatch) => {
  toast.error(message);
  dispatch(submitFormError(message));
  console.error('Error:', message);
};

export const handleUnknownError = (error: unknown, dispatch: Dispatch) => {
  let errorMessage = 'An unexpected error occurred';

  if (axios.isAxiosError(error)) {
    errorMessage = error.message || 'Failed to submit form data';
  }

  toast.error(errorMessage);
  dispatch(submitFormError(errorMessage));
  console.error('Failed to submit form:', error);
};