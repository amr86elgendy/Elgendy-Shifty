import { createTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import EmployerList from './components/EmployerList';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

const theme = createTheme({
  palette: {
    background: {
      default: '#f4f5fd',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Sidebar />
      <EmployerList />
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
