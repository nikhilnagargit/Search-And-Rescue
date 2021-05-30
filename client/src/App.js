import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// setup the redux
import { Provider } from 'react-redux';
import store from './store';

//-----------------
import Landing from './components/Pages/Landing/Landing';
import { Fragment } from 'react';
import Home from './components/Pages/Home/Home';
import Report from './components/Pages/Report/Report';
import Alert from './components/Pages/Alert/Alert';
import SearchArea from './components/Pages/SearchArea/SearchArea';
import SearchPattern from './components/Pages/SearchPattern/SearchPattern';
import RescueTeams from './components/Pages/RescueTeams/ResuceTeams';
import Results from './components/Pages/Results/Results';
import About from './components/Pages/About/About';
import Navbar from './components/layout/Navbar/Navbar';
import Sidebar from './components/layout/Sidebar/Sidebar';
import DialogAlert from './components/layout/DialogAlert/DialogAlert';

function App() {
  return (
    <Fragment>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path='/' component={Landing} />
            <Fragment>
              <div className='app-body'>
                <Navbar className='navbar'></Navbar>
                <Sidebar className='sidebar'></Sidebar>
                <section className='main'>
                  <DialogAlert></DialogAlert>
                  <Route path='/home' component={Home}></Route>
                  <Route exact path='/report' component={Report}></Route>
                  <Route
                    exact
                    path='/search-area'
                    component={SearchArea}
                  ></Route>
                  <Route
                    exact
                    path='/search-pattern'
                    component={SearchPattern}
                  ></Route>
                  <Route exact path='/results' component={Results}></Route>
                  <Route
                    exact
                    path='/rescue-teams'
                    component={RescueTeams}
                  ></Route>
                  <Route exact path='/alert' component={Alert}></Route>
                  <Route exact path='/aboutUs' component={About}></Route>
                </section>
              </div>
            </Fragment>
          </Switch>
        </Router>
      </Provider>
    </Fragment>
  );
}

export default App;
