import axios from 'axios';
import {FormState} from "../components/UserDataFormContainer/UserDataForm/UserDataFormTypes";

const api = axios.create({
	baseURL: 'https://example.com/api',
});

export const sendFormData = async (formData: FormState) => {
	try {
		const response = await api.post('/submit', formData); // Замените `/submit` на ваш реальный endpoint
		return response.data;
	} catch (error: any) {
		throw new Error(error.response?.data?.message || 'Failed to send form data');
	}
};

export const getUserData = async (): Promise<FormState> => {
	try {
		const response = await api.get('/user-data'); // Замените '/user-data' на реальный endpoint
		return response.data;
	} catch (error: any) {
		throw new Error(error.response?.data?.message || 'Failed to fetch user data');
	}
};

