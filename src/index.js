import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history";
import { ThemeProvider, createTheme } from '@material-ui/core/styles'

const colorPalette = createTheme({
  palette: {
    background: {
      default: "#ebebeb"
    },
    primary: {
      main: '#607D8B',
    },
    secondary: {
      main: '#512DA8',
    },
    type: "light",
  }
});


ReactDOM.render(
  <BrowserRouter>
    <Auth0ProviderWithHistory>
      <ThemeProvider theme={colorPalette}>
        <App />
      </ThemeProvider>
    </Auth0ProviderWithHistory>
  </BrowserRouter>,
  document.getElementById('root')
);

