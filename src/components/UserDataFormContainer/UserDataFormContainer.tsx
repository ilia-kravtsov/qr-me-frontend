import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Dispatch} from 'redux';
import { RootState } from '../../redux/store';
import {
	FormDataToServer,
	FormMethods, FormReducerType,
	FormState,
	UserDataFormContainerProps,
} from './UserDataForm/UserDataFormTypes';
import UserDataForm from "./UserDataForm/UserDataForm";
import { getSocials, submitFormData } from '../../redux/actions/formActions/formActions';
import { QR } from '../QR/QR';
import s from './UserDataFormContainer.module.scss'
import { SendFormDataToServer } from '../../redux/actions/formActions/formActionsTypes';
import { getSocialsData } from '../../api/api';

class UserDataFormContainer extends Component<UserDataFormContainerProps> {

	componentDidMount() {
		this.props.getSocialsData();
	}

	handleSubmit = (data: FormDataToServer) => {
		const prepareDataToServer: SendFormDataToServer = {
			first_name: '',
			last_name: '',
			phones: data.phones.length > 0 ? data.phones.map(field => field.value) : null,
			emails: data.emails.length > 0 ? data.emails.map(field => field.value) : null,
			websites: data.websites.length > 0 ? data.websites.map(field => field.value) : null,
			socials: data.socials.length > 0 ? data.socials.map(field => ({social_id: field.id, social_url: field.social_url })) : null,
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
				case 'Компания':
					prepareDataToServer.company = field.value;
					break;
				case 'Должность':
					prepareDataToServer.position = field.value;
					break;
				case 'Адрес':
					prepareDataToServer.address = field.value;
					break;
				case 'Описание':
					prepareDataToServer.about = field.value;
					break;
				default:
					break;
			}
		});
		console.log('Prepared data for server:', prepareDataToServer);
		this.props.submitFormData(prepareDataToServer);
	};

	render() {
		const { submitStatus } = this.props;
		return (
			<div className={s.container}>
				<UserDataForm
					{...this.props}
					onSubmit={this.handleSubmit}
				/>
				{submitStatus === 'success' && (
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
	socialsIcons: state.form.socialsIcons,
	websites: state.form.websites,
	submitStatus: state.form.submitStatus,
	submitError: state.form.submitError,
	socialsStatus: state.form.socialsStatus,
	getDataError: state.form.getDataError
});

const mapDispatchToProps = (dispatch: Dispatch): FormMethods => ({
	submitFormData: (data: SendFormDataToServer) => submitFormData(data)(dispatch),
	getSocialsData: () => getSocials()(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDataFormContainer);
