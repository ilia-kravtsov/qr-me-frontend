import React, { Component, ComponentType } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../../redux/store';
import {
  FormMethods,
  FormReducerType,
  FormServerData, LoadingStatus,
  UserDataFormContainerProps,
} from './UserDataForm/UserDataFormTypes';
import UserDataForm from './UserDataForm/UserDataForm';
import {
  getSocials,
  setUserDataForPutRequestTC,
  submitFormData,
  submitFormDataForPUT,
} from '../../redux/actions/formActions/formActions';
import { ServerDataType } from '../../redux/actions/formActions/formActionsTypes';
import { useLocation } from 'react-router-dom';

const withLocation = (WrappedComponent: ComponentType<any>) => {
  return (props: any) => {
    const location = useLocation();
    const { state } = location;
    return <WrappedComponent {...props} locationState={state} />;
  };
};

class UserDataFormContainer extends Component<UserDataFormContainerProps> {
  componentDidMount() {
    const { locationState, getSocialsData } = this.props;

    if (locationState?.data) {
      console.log('Received data from location:', locationState.data);
      setUserDataForPutRequestTC(locationState.data);
    }

    getSocialsData();
  }

  handleSubmit = (data: FormServerData, setDataForPutStatus: LoadingStatus) => {
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
    if (setDataForPutStatus !== 'success') {
      this.props.submitFormData(prepareDataToServer);
    } else {
      this.props.submitFormDataForPUT
    }
  };

  render() {
    return <UserDataForm {...this.props} onSubmit={this.handleSubmit} />;
  }
}

const mapStateToProps = ({ form }: RootState): FormReducerType => ({ ...form });

const mapDispatchToProps = (dispatch: Dispatch): FormMethods => ({
  submitFormData: (data: ServerDataType) => submitFormData(data)(dispatch),
  submitFormDataForPUT: (data: ServerDataType) => submitFormDataForPUT(data)(dispatch),
  getSocialsData: () => getSocials()(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withLocation(UserDataFormContainer));
