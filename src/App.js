import AddressDiffViewer from './components/AddressDiffViewer'
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
        <AddressDiffViewer />
      </Container>
    </ThemeProvider>
  )
}

export default App;
