import { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import s from './App.module.scss';
import { Header } from '../Header/Header';
import UserDataFormContainer from '../UserDataFormContainer/UserDataFormContainer';
import { Home } from '../Home/Home';
import { ErrorPage } from '../ErrorPage/ErrorPage';
import PersonalPageContainerWithParams from '../PersonalPageContainer/PersonalPageContainer';

class App extends Component {
  render() {
    return (
      <div className={s.container}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<UserDataFormContainer />} />
          <Route path="/users/:user_id" element={<PersonalPageContainerWithParams />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    );
  }
}

export default App;
