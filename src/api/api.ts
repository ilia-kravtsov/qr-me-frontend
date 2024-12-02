import axios from 'axios';
import { ServerDataType } from '../redux/actions/formActions/formActionsTypes';
import { FormServerData, socialsIcons } from '../components/UserDataFormContainer/UserDataForm/UserDataFormTypes';

const api = axios.create({
  baseURL: 'https://example.com/api',
});

export const sendFormData = async (formData: ServerDataType) => {
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

export const getUserData = async (userId: string) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch user data');
  }
};

export const checkEditCode = async (editCode: string): Promise<boolean> => {
  try {
    const response = await api.post('/users/edit-check', { edit_code: editCode });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to check edit code');
  }
};

export const updateUserData = async (userId: number, updatedData: Partial<FormServerData>) => {
  try {
    const response = await api.put(`/users/${userId}`, updatedData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update user data');
  }
};