import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// setup the redux
import { Provider } from 'react-redux';
import store from './store';

//-----------------
import Landing from './components/Pages/Landing/Landing';
import { Fragment } from 'react';
import Navbar from './components/layout/Navbar/Navbar';
import Sidebar from './components/layout/Sidebar/Sidebar';
import PageContent from './PageContent';

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
                <PageContent></PageContent>
              </div>
            </Fragment>
          </Switch>
        </Router>
      </Provider>
    </Fragment>
  );
}

export default App;
