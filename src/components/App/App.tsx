import React, {Component} from 'react';
import {Route, Routes} from 'react-router-dom';
import s from './App.module.scss';
import {Header} from "../Header/Header";
import UserDataFormContainer from "../UserDataFormContainer/UserDataFormContainer";
import {Home} from "../Home/Home";
import PersonalPageContainer from "../PersonalPageContainer/PersonalPageContainer";

class App extends Component {

  render() {
    return (
        <div className={s.container}>
          <Header/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/form" element={<UserDataFormContainer/>}/>
            <Route path="/personal-page" element={<PersonalPageContainer/>}/>
          </Routes>
        </div>
    );
  }
}

export default App;
