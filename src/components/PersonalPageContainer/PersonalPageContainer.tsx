import {Component} from "react";
import {PersonalPage} from "./PersonalPage/PersonalPage";
import {connect} from "react-redux";
import {FormState} from "../UserDataFormContainer/UserDataForm/UserDataFormTypes";
import {getUserDataAC} from "../../redux/actions/personalPageActions/personalPageActions";
import {RootState} from "../../redux/store";

class PersonalPageContainer extends Component<FormState> {
	render() {
		return (
			<PersonalPage predefinedFields={this.props.predefinedFields}
										additionalFields={this.props.additionalFields}/>
		)
	}
}

const mapStateToProps = (state: RootState) => ({
	predefinedFields: state.personalPage.predefinedFields,
	additionalFields: state.personalPage.additionalFields,
});

const mapDispatchToProps = {
	getUserData: getUserDataAC,
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalPageContainer);