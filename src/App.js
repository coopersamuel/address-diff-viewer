import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import AddressDashboard from './components/AddressDashboard'
import DiffViewer from './components/DiffViewer'
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
          <Switch>
            <Route path="/diff">
              <DiffViewer />
            </Route>
            <Route path="/">
              <AddressDashboard />
            </Route>
          </Switch>
        </Router>
      </Container>
    </ThemeProvider>
  )
}

export default App;
