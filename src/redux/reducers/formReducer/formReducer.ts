import { FormReducerType } from '../../../components/UserDataFormContainer/UserDataForm/UserDataFormTypes';
import { v1 } from 'uuid';
import { FormActionTypes, SocialsActionTypes } from '../../actions/formActions/formActions';
import { FormActions } from '../../actions/formActions/formActionsTypes';

type ActionsType = FormActions;

const initialState: FormReducerType = {
  predefinedFields: [
    { id: v1(), label: 'Имя', value: '', required: true, placeholder: 'Имя', pattern: '[A-Za-zА-Яа-яЁё]+', title: 'Вводите только латинские или кириллические буквы' },
    { id: v1(), label: 'Фамилия', value: '', required: true, placeholder: 'Фамилия', pattern: '[A-Za-zА-Яа-яЁё]+', title: 'Вводите только латинские или кириллические буквы' },
    { id: v1(), label: 'Отчество', value: '', required: false, placeholder: 'Отчество', pattern: '[A-Za-zА-Яа-яЁё]+', title: 'Вводите только латинские или кириллические буквы' },
    { id: v1(), label: 'Компания', value: '', required: false, placeholder: 'OOO "Google"' },
    { id: v1(), label: 'Должность', value: '', required: false, placeholder: 'менеджер' },
    { id: v1(), label: 'Адрес', value: '', required: false, placeholder: 'ул. Красноармейская, дом 4' },
    { id: v1(), label: 'Описание', value: '', required: false, placeholder: 'Описание' },
  ],
  phones: [
    { id: v1(), label: 'Phone', type: 'tel', value: '', required: false, placeholder: '+7 999 999 99 99' },
    { id: v1(), label: 'Phone', type: 'tel', value: '', required: false, placeholder: '+7 999 999 99 99' },
  ],
  emails: [
    { id: v1(), label: 'Email', type: 'email', value: '', required: false, placeholder: 'ivanov@mail.ru' },
    { id: v1(), label: 'Email', type: 'email', value: '', required: false, placeholder: 'ivanov@mail.ru' },
  ],
  websites: [
    { id: v1(), label: 'Website', type: 'url', value: '', required: false, placeholder: 'https://some.ru' },
    { id: v1(), label: 'Website', type: 'url', value: '', required: false, placeholder: 'https://some.ru' },
  ],
  socialsIcons: [
    { id: 1, icon_link: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAdVBMVEU7V53///85VZzP1eVMZabv8feHlsEyUZo2U5siRpXn6/Npe7Dm6fN6irnz9PhSbKpugLIpS5fHz+MoSpdYcKza3uq2v9ilsM+apsnFy97Y3uxMZqc+W6BVbqx9j72+xtxgd7CQoMekr8+xudSFlcB0hrcVP5IUgLSUAAADZklEQVR4nO3c4XKiMBSGYfaAJkULIliosqC13fu/xGW3MzvTnZEGMJ5zMt/7vw7PEEGS0ChCCCGEEEIIIYQQQgghhBBCCCElEZG19Bn3sdw5MqYoTZQkeVXleX5KkqQlU5bFkDHG6gbbAfeza677w+Gw/dfhT/G+f7k2l253zqOy1Kmkoswv/SrLftwu+9sqTtQRh+9ce37bjti+QnPLfcTTIttW66MrT6HQRps6neBTJzRV7Tw8NQrJNFPGpz5hkb9O9qkSFt3UAapLSNSM3fz0CympZ/nUCCl5mQnUIrTXuUAdQireZgN1CItmPlCF0Oym/U5TJ7RtvACoQRjNvowqEdpuFbaQTnN+jKoSruf9WFMjpNOiy4wCoe0WAqULifahC6ulQOnCctm9UL6QzMILqXih2S0GChfeYZAKF9KShwoNQrtZ/jWULTSXacJse4z3/9efBK89Fb2zLe3XlXkqy8/V0S8JBhIdHH3xpS2NYMmtbOU2yZ02rUbekPlwupSmneSBOJpZuzzdZ+9KT+CQcVqpqLkPc0GFy0T38Sz4dvddhcsMTW3VjtHhWuogTDvDfZjzo8hBeKwUD9KodZjBeG25j3JJicM0W694kEbkIqwL7sNckIswa0I/h9kldOEqfOEaQslBCKH8IIRQfhBCKD8IIZQfhBDKD0IIhUT2ZsZF+F7c/oDPmIHJZne75++X8bO382Y85sU3+3FcjfQtcDiJ2/HSPe+kuHm+w6an8cIX1ryXogcImSfFHyD8CF7IvG/vAcKWdyODf2HKvAruXxgHfw5fotCFDfN+Iv/CdfDCHfOzhX/hJnRhyr0pzLswzkP/Hvbc/wbLu/DKvbHPu7BhBvoXsk/F+RZmz9xTbb6FKfcN37vweObe5u5buOe+HXoX9gkz0Lvwyvx06F/IPFnqXyhgj7Rn4Yr/hRrPwi377dC3UMB7bZ6FMf9r3J6Fr+w3izuskGYjf55d2S80A7F8ul3ksI7f/Rr5AOnvRAWyF2MkCCGUH4QQyg9CCOUHIYTygxBC+UEIofwghFB+EEIoPwghlB+EEMoPQgjlByGE8oMQQvlBCKH8IIRQfhBCKD8IIZQfhBDKD0II5QchhPKDEEL5QQih/CCEUH4QQig/CCGUH4QQyg9CCOUHIYTye6DwNyCOWdL4wqRQAAAAAElFTkSuQmCC', name: 'facebook'},
    { id: 2, icon_link: 'data:image/png;base64,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', name: 'whatsapp'}
  ],
  submitStatus: 'idle',
  submitError: null,
  socialsStatus: 'idle',
  getDataError: null,
};

export const formReducer = (state = initialState, action: ActionsType): FormReducerType => {
  switch (action.type) {
    case FormActionTypes.SUBMIT_FORM:
      return { ...state, submitStatus: 'loading', submitError: null };
    case FormActionTypes.SUBMIT_FORM_SUCCESS:
      return { ...state, submitStatus: 'success' };
    case FormActionTypes.SUBMIT_FORM_ERROR:
      return { ...state, submitStatus: 'error', submitError: action.payload };
    case SocialsActionTypes.GET_FORM_DATA:
      return { ...state, socialsStatus: 'loading', getDataError: null };
    case SocialsActionTypes.GET_FORM_DATA_SUCCESS:
      return { ...state, socialsStatus: 'success', socialsIcons: action.payload};
    case SocialsActionTypes.GET_FORM_DATA_ERROR:
      return { ...state, socialsStatus: 'error', getDataError: action.payload};
    default:
      return state;
  }
};
