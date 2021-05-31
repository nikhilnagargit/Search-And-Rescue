import React from 'react';
import Home from './components/Pages/Home/Home';
import Report from './components/Pages/Report/Report';
import Alert from './components/Pages/Alert/Alert';
import SearchArea from './components/Pages/SearchArea/SearchArea';
import SearchPattern from './components/Pages/SearchPattern/SearchPattern';
import RescueTeams from './components/Pages/RescueTeams/ResuceTeams';
import Results from './components/Pages/Results/Results';
import About from './components/Pages/About/About';
import DialogAlert from './components/layout/DialogAlert/DialogAlert';

import { Route } from 'react-router-dom';

const PageContent = (props) => {
  return (
    <section className='main'>
      <DialogAlert></DialogAlert>
      <Route path='/home' component={Home}></Route>
      <Route exact path='/report' component={Report}></Route>
      <Route exact path='/search-area' component={SearchArea}></Route>
      <Route exact path='/search-pattern' component={SearchPattern}></Route>
      <Route exact path='/results' component={Results}></Route>
      <Route exact path='/rescue-teams' component={RescueTeams}></Route>
      <Route exact path='/alert' component={Alert}></Route>
      <Route exact path='/aboutUs' component={About}></Route>
    </section>
  );
};

export default PageContent;
