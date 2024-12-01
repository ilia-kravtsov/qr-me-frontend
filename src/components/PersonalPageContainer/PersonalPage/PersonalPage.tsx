import {Component} from "react";
import s from './PersonalPage.module.scss'
import { PersonalPageProps } from './PersonalPageTypes';

export class PersonalPage extends Component<PersonalPageProps> {
	render() {
		return (
			<div className={s.container}>
				<h2>Привет! Это моя визитка!</h2>
			</div>
		)
	}
}


