import axios from 'axios';
import { ServerDataType } from '../redux/actions/formActions/formActionsTypes';
import { FormServerData, socialsIcons } from '../components/UserDataFormContainer/UserDataForm/UserDataFormTypes';

const api = axios.create({
  baseURL: 'https://example.com/api',
});

export const sendFormData = async (formData: ServerDataType) => {
  const response = await api.post('/users', formData);
  return response.data;
};

export const getSocialsData = async (): Promise<socialsIcons[]> => {
  const response = await api.get<socialsIcons[]>('/social');
  return response.data;
};

export const getUserData = async (userId: string) => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};

export const checkEditCode = async (editCode: string): Promise<boolean> => {
  const response = await api.post('/users/edit-check', { edit_code: editCode });
  return response.data;
};

export const updateUserData = async (userId: number, updatedData: Partial<FormServerData>) => {
  const response = await api.put(`/users/${userId}`, updatedData);
  return response.data;
};
