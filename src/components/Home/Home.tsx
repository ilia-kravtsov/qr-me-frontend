import { Component } from 'react';
import { HomeBanner } from './HomeBanner';
import { HomeAdvantages } from './HomeAdvantages';
import { HomeSteps } from './HomeSteps';
import { HomeDevelopers } from './HomeDevelopers';
import s from './Home.module.scss';

export class Home extends Component {
  render() {
    return (
      <div className={s.container}>
        <HomeBanner />
        <HomeAdvantages />
        <HomeSteps />
        <HomeDevelopers />
      </div>
    );
  }
}
