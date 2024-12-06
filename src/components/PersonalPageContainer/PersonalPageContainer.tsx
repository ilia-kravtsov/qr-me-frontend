import { Component } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../redux/store';
import { PersonalPageMethods, PersonalPageProps, RouteParams } from './PersonalPage/PersonalPageTypes';
import { Dispatch } from 'redux';
import { PersonalSite } from './PersonalPage/PersonalSite';
import { useParams } from 'react-router-dom';
import { checkEditCodeTC, getUserDataTC } from '../../redux/thunks/personalPageThunks/personalPageThunks';

class PersonalPageContainer extends Component<PersonalPageProps> {
  componentDidMount() {
    const { user_id, getUserDataTC } = this.props;

    if (user_id) {
      getUserDataTC(user_id);
    } else {
      console.error('User ID is not available in Redux state!');
    }
  }

  checkEditCode = (editCode: string) => {
    checkEditCodeTC(this.props.user_id, editCode);
  }

  removePageCB = () => {

  }

  render() {
    return <PersonalSite {...this.props}
                         checkEditCode={this.checkEditCode}
                         removePageCB={this.removePageCB}
    />;
  }
}

const mapStateToProps = ({ personalPage }: RootState) => ({ ...personalPage });

const mapDispatchToProps = (dispatch: Dispatch): PersonalPageMethods => ({
  getUserDataTC: (userId: string) => getUserDataTC(userId)(dispatch),
  checkEditCodeTC: (userId: string, editCode: string) => checkEditCodeTC(userId, editCode)(dispatch)
});

const ConnectedPersonalPageContainer = connect(mapStateToProps, mapDispatchToProps)(PersonalPageContainer);

const PersonalPageContainerWithParams = () => {
  const { user_id } = useParams<RouteParams>();
  return <ConnectedPersonalPageContainer user_id={user_id || ''} />;
};

export default PersonalPageContainerWithParams;

/*
const mapStateToProps = (state: RootState) => ({
  photo: state.personalPage.photo,
  first_name: state.personalPage.first_name,
  last_name: state.personalPage.last_name,
  middle_name: state.personalPage.middle_name,
  about: state.personalPage.about,
  company: state.personalPage.company,
  position: state.personalPage.position,
  address: state.personalPage.address,
  phones: state.personalPage.phones,
  emails: state.personalPage.emails,
  websites: state.personalPage.websites,
  socials: state.personalPage.socials,
  getUserDataStatus: state.personalPage.getUserDataStatus,
  getUserDataError: state.personalPage.getUserDataError
});
*/