import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/Pages/Landing/Landing';
import { Fragment } from 'react';
import Home from './components/Pages/Home/Home';
import Report from './components/Pages/Report/Report';
import Alert from './components/Pages/Alert/Alert';
import SearchArea from './components/Pages/SearchArea/SearchArea';
import SearchPattern from './components/Pages/SearchPattern/SearchPattern';
import Results from './components/Pages/Results/Results';
import About from './components/Pages/About/About';
import Navbar from './components/layout/Navbar/Navbar';
import Sidebar from './components/layout/Sidebar/Sidebar';

function App() {
  return (
    <Fragment>
      <Router>
        <Switch>
          <Route exact path='/' component={Landing}></Route>

          <div class='app-body'>
            <Navbar className='navbar'></Navbar>
            <Sidebar className='sidebar'></Sidebar>
            <section className='main'>
              <Route exact path='/home' component={Home}></Route>
              <Route exact path='/report' component={Report}></Route>
              <Route exact path='/search-area' component={SearchArea}></Route>
              <Route
                exact
                path='/search-pattern'
                component={SearchPattern}
              ></Route>
              <Route exact path='/results' component={Results}></Route>
              <Route exact path='/alert' component={Alert}></Route>
              <Route exact path='/aboutUs' component={About}></Route>
            </section>
          </div>
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
