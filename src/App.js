import {
  BrowserRouter as Router
} from 'react-router-dom'
import AddressDashboard from './components/AddressDashboard'
import { Container } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Poppins',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Router>
          <AddressDashboard />
        </Router>
      </Container>
    </ThemeProvider>
  )
}

export default App;
