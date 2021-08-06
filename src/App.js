import { Fragment } from 'react';
import EmployerList from './components/EmployerList';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
function App() {
  return (
    <Fragment>
      <Navbar />
      <Sidebar />
      <EmployerList />
    </Fragment>
  );
}

export default App;
