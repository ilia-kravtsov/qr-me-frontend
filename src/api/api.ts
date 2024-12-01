import axios from 'axios';
import { SendFormDataToServer } from '../redux/actions/formActions/formActionsTypes';
import { Dispatch } from 'redux';
import { socialsIcons } from '../components/UserDataFormContainer/UserDataForm/UserDataFormTypes';

const api = axios.create({
  baseURL: 'https://example.com/api',
});

export const sendFormData = async (formData: SendFormDataToServer) => {
  try {
    const response = await api.post('/users', formData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to send form data');
  }
};

export const getSocialsData = async (): Promise<socialsIcons[]> => {
  try {
    const response = await api.get<socialsIcons[]>('/social');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch socials data');
  }
};
