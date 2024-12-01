import {Component} from "react";
import s from './PersonalPage.module.scss'
import { FormDataToServer, FormState } from '../../UserDataFormContainer/UserDataForm/UserDataFormTypes';

export class PersonalPage extends Component<FormDataToServer> {
	render() {
		const {predefinedFields, socials} = this.props
		return (
			<div className={s.container}>
				<h2>Привет! Это моя визитка!</h2>
				<ul className={s.fieldList}>
					{predefinedFields.map((field) => (
						<li key={field.id} className={s.fieldItem}>
							<strong>{field.label}:</strong> {field.value}
						</li>
					))}
				</ul>
			</div>
		)
	}
}


