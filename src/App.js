import { createTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import EmployerList from './components/EmployerList';
import EmployeeForm from './components/EmployeeForm';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

const theme = createTheme({
  palette: {
    background: {
      default: '#f4f5fd',
    },
  },
  // overrides: {
  //   MuiAppBar: {
  //     root: {
  //       transform: 'translateZ(0)',
  //     },
  //   },
  // },
  // props: {
  //   MuiIconButton: {
  //     disableRipple: true,
  //   },
  // },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Sidebar />
      <EmployerList />
      <EmployeeForm />
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
