import React, { Component, ComponentType } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../../redux/store';
import {
  FormMethods,
  FormReducerType,
  FormServerData,
  UserDataFormContainerProps,
} from './UserDataForm/UserDataFormTypes';
import UserDataForm from './UserDataForm/UserDataForm';
import { ServerDataForPUTRequest, ServerDataType } from '../../redux/actions/formActions/formActionsTypes';
import { useLocation } from 'react-router-dom';
import {
  getSocials,
  setUserDataForPutRequestTC,
  putSubmitFormData,
  submitFormData,
} from '../../redux/thunks/formThunks/formThunks';
import { predefinedFieldsToObjectConverter } from '../../utils/utils';
import { ServerPageData } from '../PersonalPageContainer/PersonalPage/PersonalPageTypes';

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
      this.props.setUserDataForPutRequestTC(locationState.data);
    }

    getSocialsData();
  }

  handleSubmit = (data: FormServerData) => {
    if (this.props.setDataForPutStatus === 'success') {
      const prepareDataToPUTRequest: ServerDataForPUTRequest = {
        edit_code: this.props.userEditCode,
        first_name: '',
        last_name: '',
        phones: [],
        emails: [],
        websites: [],
        socials: [],
      };

      predefinedFieldsToObjectConverter(data, prepareDataToPUTRequest);

      prepareDataToPUTRequest.phones = data.phones.length > 0
        ? data.phones.map((phone) => ({
          phone_id: Number(phone.id),
          number: phone.value,
        }))
        : null;

      prepareDataToPUTRequest.emails = data.emails.length > 0
        ? data.emails.map((email) => ({
          email_id: Number(email.id),
          email_address: email.value,
        }))
        : null;

      prepareDataToPUTRequest.websites = data.websites.length > 0
        ? data.websites.map((website) => ({
          website_id: Number(website.id),
          website_address: website.value,
        }))
        : null;

      prepareDataToPUTRequest.socials = data.socials.length > 0
        ? data.socials.map((social) => ({
          social_id: social.id,
          social_url: social.social_url,
          social_row_id: social.social_row_id,
        }))
        : null;

      console.log('Prepared data for PUT request:', prepareDataToPUTRequest);
      this.props.submitFormDataForPUT(prepareDataToPUTRequest, this.props.userId);
    } else {
      const prepareDataToPOSTRequest: ServerDataType = {
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

      predefinedFieldsToObjectConverter(data, prepareDataToPOSTRequest);
      console.log('Prepared data for server:', prepareDataToPOSTRequest);
      this.props.submitFormData(prepareDataToPOSTRequest);
    }
  };

  render() {
    return <UserDataForm {...this.props} onSubmit={this.handleSubmit} />;
  }
}

const mapStateToProps = ({ form }: RootState): FormReducerType => ({ ...form });

const mapDispatchToProps = (dispatch: Dispatch): FormMethods => ({
  submitFormData: (data: ServerDataType) => submitFormData(data)(dispatch),
  submitFormDataForPUT: (data: ServerDataForPUTRequest, userId: string | null | undefined) =>
    putSubmitFormData(data, userId)(dispatch),
  setUserDataForPutRequestTC: (data: ServerPageData) => setUserDataForPutRequestTC(data)(dispatch),
  getSocialsData: () => getSocials()(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withLocation(UserDataFormContainer));
