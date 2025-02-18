import axios from 'axios';
import { ServerDataForPUTRequest, ServerDataType } from '../redux/actions/formActions/formActionsTypes';
import { ServerResponse, socialsIcons } from '../components/UserDataFormContainer/UserDataForm/UserDataFormTypes';

const api = axios.create({
  baseURL: 'http://localhost:8081/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const sendFormData = async (formData: ServerDataType): Promise<ServerResponse> => {
  const response = await api.post<ServerResponse>('users', formData);
  return response.data;
};

export const getSocialsData = async (): Promise<socialsIcons[]> => {
  const response = await api.get<socialsIcons[]>('social');
  return response.data;
};

export const getUserData = async (userId: string) => {
  const response = await api.get(`users/${userId}`);
  return response.data;
};

export const checkEditCode = async (userId: string, editCode: string): Promise<{ success: boolean }> => {
  const response = await api.post('users/edit-check', { user_id: userId, edit_code: editCode });
  return response.data;
};

export const updateUserData = async (userId: string, updatedData: ServerDataForPUTRequest) => {
  const response = await api.put(`users/${userId}`, updatedData);
  return response.data;
};
