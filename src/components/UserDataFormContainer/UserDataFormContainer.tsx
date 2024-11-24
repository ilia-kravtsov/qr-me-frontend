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

class UserDataFormContainer extends Component<UserDataFormProps> {

	handleSubmit = (data: FormState) => {
		this.props.onSubmit(data);
		console.log(data)
	};

	render() {

		return (
			<UserDataForm
				{...this.props}
				onSubmit={this.handleSubmit}
			/>
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
