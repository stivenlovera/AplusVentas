import { CssBaseline, ThemeProvider } from "@mui/material";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import RTL from "components/RTL";
import useSettings from "hooks/useSettings";
import { useRoutes } from "react-router-dom";
import routes from "routes";
import { createCustomTheme } from "theme";
import "./i18n";
import * as React from 'react';
import { SnackbarProvider } from 'notistack';
import { useEffect } from "react";
import { UseAuthenticate } from "pages/login/hooks/useAuthenticate";
import { useDispatch, useSelector } from 'react-redux';
import { SelectToken, setToken } from "reducers/Slice";

const App = () => {
  const token = useSelector(SelectToken);
  const dispatch = useDispatch();

  const updateToken = (token) => {
    dispatch(
      setToken({
        token: token
      })
    )
  }

  const { ApiAuthenticar, user } = UseAuthenticate();
  const loadAuthenticacion = async () => {
    await ApiAuthenticar()
  }

  useEffect(() => {
    if (token) {
      if (user.nombre == '') {
        loadAuthenticacion();
        return;
      }
    }
    console.log('PERSONA', user.nombre, user.apellido)
  }, [token,user.nombre])

  const content = useRoutes(routes(user,token));
  const {
    settings
  } = useSettings();
  const theme = createCustomTheme({
    theme: settings.theme,
    direction: settings.direction,
    responsiveFontSizes: settings.responsiveFontSizes
  });
  return <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <RTL>
        <SnackbarProvider maxSnack={5}>
          <CssBaseline />
          {content}
        </SnackbarProvider>
      </RTL>
    </ThemeProvider>
  </StyledEngineProvider>;
};

export default App;