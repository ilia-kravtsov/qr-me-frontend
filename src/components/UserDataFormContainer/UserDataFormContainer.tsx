import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Dispatch} from 'redux';
import { RootState } from '../../redux/store';
import {
	FormMethods, FormReducerType,
	FormState,
	UserDataFormProps
} from "./UserDataForm/UserDataFormTypes";
import UserDataForm from "./UserDataForm/UserDataForm";
import {submitFormData} from "../../redux/actions/formActions/formActions";
import { QR } from '../QR/QR';
import s from './UserDataFormContainer.module.scss'

class UserDataFormContainer extends Component<UserDataFormProps> {

	handleSubmit = (data: FormState) => {
		this.props.onSubmit(data);
		console.log(data)
	};

	render() {
		const { isSubmitting } = this.props;
		return (
			<div className={s.container}>
				<UserDataForm
					{...this.props}
					onSubmit={this.handleSubmit}
				/>
				{isSubmitting && (
					<QR value={'https://trello.com/b/4h2Ekh1t/%D0%BA%D0%BE%D0%BC%D0%B0%D0%BD%D0%B4%D0%B0-4-sprint-1-1311-2611'} />
				)}
			</div>
		);
	}
}

const mapStateToProps = (state: RootState): FormReducerType => ({
  predefinedFields: state.form.predefinedFields,
	additionalFields: state.form.additionalFields,
	isSubmitting: state.form.isSubmitting,
	submitError: state.form.submitError,
});

const mapDispatchToProps = (dispatch: Dispatch): FormMethods => ({
	onSubmit: (data: FormState) => submitFormData(data)(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDataFormContainer);
