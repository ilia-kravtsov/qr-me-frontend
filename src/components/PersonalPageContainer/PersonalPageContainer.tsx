import { Component } from 'react';
import { PersonalPage } from './PersonalPage/PersonalPage';
import { connect } from 'react-redux';
import { getUserDataTC } from '../../redux/actions/personalPageActions/personalPageActions';
import { RootState } from '../../redux/store';
import { PersonalPageMethods, PersonalPageProps } from './PersonalPage/PersonalPageTypes';
import { Dispatch } from 'redux';
import { useParams } from 'react-router-dom';

type RouteParams = {
  user_id: string;
}

type Props = PersonalPageProps & RouteParams;

class PersonalPageContainer extends Component<Props> {
  componentDidMount() {
    const { user_id } = this.props;
    if (user_id) {
      this.props.getUserDataTC(user_id);
    } else {
      console.error('User ID not found in URL!');
    }
  }

  render() {
    return <PersonalPage {...this.props} />;
  }
}

const mapStateToProps = ({ personalPage }: RootState) => ({ ...personalPage });

const mapDispatchToProps = (dispatch: Dispatch): PersonalPageMethods => ({
  getUserDataTC: (userId: string) => getUserDataTC(userId)(dispatch),
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