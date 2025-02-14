import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import { formReducer } from './reducers/formReducer/formReducer';
import { personalPageReducer } from './reducers/personalPageReducer/personalPageReducer';

const rootReducer = combineReducers({
  form: formReducer,
  personalPage: personalPageReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;
