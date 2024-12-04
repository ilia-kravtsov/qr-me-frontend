import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../../redux/store';
import {
  FormServerData,
  FormMethods,
  FormReducerType,
  FormState,
  UserDataFormContainerProps,
} from './UserDataForm/UserDataFormTypes';
import UserDataForm from './UserDataForm/UserDataForm';
import { getSocials, submitFormData } from '../../redux/actions/formActions/formActions';
import { QR } from '../QR/QR';
import s from './UserDataFormContainer.module.scss';
import { ServerDataType } from '../../redux/actions/formActions/formActionsTypes';
import { getSocialsData } from '../../api/api';

class UserDataFormContainer extends Component<UserDataFormContainerProps> {
  componentDidMount() {
    this.props.getSocialsData();
  }

  handleSubmit = (data: FormServerData) => {
    const prepareDataToServer: ServerDataType = {
      first_name: '',
      last_name: '',
      phones: data.phones.length > 0 ? data.phones.map((field) => field.value) : null,
      emails: data.emails.length > 0 ? data.emails.map((field) => field.value) : null,
      websites: data.websites.length > 0 ? data.websites.map((field) => field.value) : null,
      socials:
        data.socials.length > 0
          ? data.socials.map((field) => ({
              social_id: field.id,
              social_url: field.social_url,
            }))
          : null,
    };

    data.predefinedFields.forEach((field) => {
      switch (field.label) {
        case 'Имя *':
          prepareDataToServer.first_name = field.value;
          break;
        case 'Фамилия *':
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
    return <UserDataForm {...this.props} onSubmit={this.handleSubmit} />;
  }
}

const mapStateToProps = ({ form }: RootState): FormReducerType => ({ ...form });

const mapDispatchToProps = (dispatch: Dispatch): FormMethods => ({
  submitFormData: (data: ServerDataType) => submitFormData(data)(dispatch),
  getSocialsData: () => getSocials()(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDataFormContainer);
