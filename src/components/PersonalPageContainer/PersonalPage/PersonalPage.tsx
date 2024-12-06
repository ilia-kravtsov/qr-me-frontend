// import { Component } from 'react';
// import s from './PersonalPage.module.scss';
// import { PersonalPageProps } from './PersonalPageTypes';
//
// export class PersonalPage extends Component<PersonalPageProps> {
// 	render() {
// 		const {
// 			photo,
// 			first_name,
// 			last_name,
// 			middle_name,
// 			about,
// 			company,
// 			position,
// 			address,
// 			phones,
// 			emails,
// 			websites,
// 			socials
// 		} = this.props; // Извлекаю данные из объекта props деструктуризацией
//
// 		return (
// 			<div className={s.container}>
//
// 			</div>
// 		);
// 	}
// }

/*
<div className={s.container}>
<h2>Привет! Это моя визитка!</h2>

{photo && <img src={photo} alt="User Photo" className={s.photo} />}

<div className={s.userInfo}>
	<p>Имя: {first_name} {last_name}</p>
	<p>Отчество: {middle_name}</p>
	<p>О себе: {about}</p>
	<p>Компания: {company}</p>
	<p>Должность: {position}</p>
	<p>Адрес: {address}</p>
</div>

<div className={s.contactInfo}>
	<h3>Контакты:</h3>
	<div>
		<p>Телефоны:</p>
		<ul>
			{phones?.map((phone, index) => <li key={index}>{phone}</li>)}
		</ul>
	</div>
	<div>
		<p>Email:</p>
		<ul>
			{emails?.map((email, index) => <li key={index}>{email}</li>)}
		</ul>
	</div>
	<div>
		<p>Сайты:</p>
		<ul>
			{websites?.map((website, index) => <li key={index}>{website}</li>)}
		</ul>
	</div>
	<div>
		<p>Социальные сети:</p>
		<ul>
			{socials?.map((social, index) => <li key={index}>
				<a href={social.social_url}>socials</a>
			</li>)}
		</ul>
	</div>
</div>
</div>
 */