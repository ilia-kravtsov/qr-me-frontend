import {Component} from 'react';
import {Route, Routes} from 'react-router-dom';
import s from './App.module.scss';
import {Header} from "../Header/Header";
import UserDataFormContainer from "../UserDataFormContainer/UserDataFormContainer";
import {Home} from "../Home/Home";
import PersonalPageContainer from "../PersonalPageContainer/PersonalPageContainer";
import { ErrorPage } from '../ErrorPage/ErrorPage';

class App extends Component {

  render() {
    return (
        <div className={s.container}>
          <Header/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/form" element={<UserDataFormContainer/>}/>
            <Route path="/users/:user_id" element={<PersonalPageContainer/>}/>
            <Route path="*" element={<ErrorPage/>}/>
          </Routes>
        </div>
    );
  }
}

export default App;
