import {Component} from "react";
import {PersonalPage} from "./PersonalPage/PersonalPage";
import {connect} from "react-redux";
import {FormState} from "../UserDataFormContainer/UserDataForm/UserDataFormTypes";
import {getUserDataAC} from "../../redux/actions/personalPageActions/personalPageActions";
import {RootState} from "../../redux/store";

class PersonalPageContainer extends Component<FormState> {
	render() {
		return (
			<PersonalPage {...this.props}/>
		)
	}
}

const mapStateToProps = (state: RootState) => ({
	predefinedFields: state.personalPage.predefinedFields,
	phones: state.personalPage.phones,
	emails: state.personalPage.emails,
	websites: state.personalPage.websites,
	socials: state.personalPage.socials,
	additionalFields: state.personalPage.socials,
});

const mapDispatchToProps = {
	getUserData: getUserDataAC,
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalPageContainer);