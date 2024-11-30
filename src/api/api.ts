import axios from 'axios';
import { SendFormDataToServer } from '../redux/actions/formActions/formActionsTypes';

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



