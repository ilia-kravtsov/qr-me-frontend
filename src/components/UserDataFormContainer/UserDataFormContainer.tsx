import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Dispatch} from 'redux';
import { RootState } from '../../redux/store';
import {
	FormMethods, FormReducerType,
	FormState,
	UserDataFormContainerProps
} from "./UserDataForm/UserDataFormTypes";
import UserDataForm from "./UserDataForm/UserDataForm";
import {submitFormData} from "../../redux/actions/formActions/formActions";
import { QR } from '../QR/QR';
import s from './UserDataFormContainer.module.scss'
import { SendFormDataToServer } from '../../redux/actions/formActions/formActionsTypes';

class UserDataFormContainer extends Component<UserDataFormContainerProps> {

	handleSubmit = (data: FormState) => {
		const prepareDataToServer: SendFormDataToServer = {
			first_name: '',
			last_name: '',
			phones: data.phones.length > 0 ? data.phones.map((field) => field.value) : null,
			emails: data.emails.length > 0 ? data.emails.map((field) => field.value) : null,
			websites: data.websites.length > 0 ? data.websites.map((field) => field.value) : null,
			socials: [] // Доделать добавление id после get
		}

		data.predefinedFields.forEach((field) => {
			switch (field.label) {
				case 'Имя':
					prepareDataToServer.first_name = field.value;
					break;
				case 'Фамилия':
					prepareDataToServer.last_name = field.value;
					break;
				case 'Отчество':
					prepareDataToServer.middle_name = field.value;
					break;
				case 'Описание':
					prepareDataToServer.about = field.value;
					break;
				case 'Компания':
					prepareDataToServer.company = field.value;
					break;
				case 'Должность':
					prepareDataToServer.position = field.value;
					break;
				case 'Адрес':
					prepareDataToServer.address = field.value;
					break;
				default:
					break;
			}
		});
		console.log('Prepared data for server:', prepareDataToServer);
		this.props.submitFormData(prepareDataToServer);
	};

	render() {
		const { isSubmitSuccessful } = this.props;
		return (
			<div className={s.container}>
				<UserDataForm
					{...this.props}
					onSubmit={this.handleSubmit}
				/>
				{isSubmitSuccessful && (
					<QR value={'https://trello.com/b/4h2Ekh1t/%D0%BA%D0%BE%D0%BC%D0%B0%D0%BD%D0%B4%D0%B0-4-sprint-1-1311-2611'} />
				)}
			</div>
		);
	}
}

const mapStateToProps = (state: RootState): FormReducerType => ({
  predefinedFields: state.form.predefinedFields,
	phones: state.form.phones,
	emails: state.form.emails,
	socials: state.form.socials,
	websites: state.form.websites,
	isSubmitting: state.form.isSubmitting,
	submitError: state.form.submitError,
});

const mapDispatchToProps = (dispatch: Dispatch): FormMethods => ({
	submitFormData: (data: SendFormDataToServer) => submitFormData(data)(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDataFormContainer);
