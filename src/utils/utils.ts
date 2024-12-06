import { ToastOptions } from 'react-toastify';
import { FormServerData } from '../components/UserDataFormContainer/UserDataForm/UserDataFormTypes';
import { ServerDataForPUTRequest, ServerDataType } from '../redux/actions/formActions/formActionsTypes';

export const toastPositionConfig: ToastOptions = {
  position: 'bottom-left',
  autoClose: 5000,
};

export function predefinedFieldsToObjectConverter (data: FormServerData, object: ServerDataForPUTRequest | ServerDataType) {
  data.predefinedFields.forEach((field) => {
    switch (field.label) {
      case 'Имя *':
        object.first_name = field.value;
        break;
      case 'Фамилия *':
        object.last_name = field.value;
        break;
      case 'Отчество':
        object.middle_name = field.value || undefined;
        break;
      case 'Описание':
        object.about = field.value || null;
        break;
      case 'Компания':
        object.company = field.value || null;
        break;
      case 'Должность':
        object.position = field.value || null;
        break;
      case 'Адрес':
        object.address = field.value || null;
        break;
      default:
        break;
    }
  });
}

