import { createTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import AlertPopup from './components/Alert';
import EmployerList from './components/EmployerList';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

const theme = createTheme({
  palette: {
    background: {
      default: '#f6f6f6',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Sidebar />
      <EmployerList />
      <AlertPopup />
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
