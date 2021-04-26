import './App.scss';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import { Fragment } from 'react';

function App() {
  return (
    <Fragment>
      <div>
        <Sidebar></Sidebar>

        <Navbar></Navbar>
      </div>
    </Fragment>
  );
}

export default App;
