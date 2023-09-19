import { CssBaseline, ThemeProvider } from "@mui/material";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import RTL from "components/RTL";
import useSettings from "hooks/useSettings";
import { useRoutes } from "react-router-dom";
import routes from "routes.jsx";
import { createCustomTheme } from "theme";
import "./i18n";
import * as React from 'react';
import { SnackbarProvider } from 'notistack';
import { useEffect } from "react";
import { UseAuthenticate } from "pages/login/hooks/useAuthenticate";
import { useDispatch, useSelector } from 'react-redux';
import { SelectToken, setToken } from "reducers/Slice";
import { useState } from "react";
import { UsuarioContext } from "contexts/usuarioContexto";
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
  const [user, setUser] = useState({
    usuario: '',
    nombre: '',
    apellido: '',
    dirrecion: '',
    roles: [
      {
        rolId: 0,
        nombre: '',
        permisos: [
          {
            permisoId: 0,
            nombre: '',
            ruta: ''
          }
        ]

      }
    ]
  })

  const { GetAuthenticate, Login } = UseAuthenticate();
  const loadAuthenticacion = async () => {
    const { data, status } = await GetAuthenticate();
    if (status) {
      setUser(data);
    } else {
      updateToken(false)
    }
    console.log(token)
  }
  useEffect(() => {
    if (token) {
      loadAuthenticacion();
    } else {
      updateToken(false)
    }
  }, [token])

  const content = useRoutes(routes(user, token));
  const {
    settings
  } = useSettings();
  const theme = createCustomTheme({
    theme: settings.theme,
    direction: settings.direction,
    responsiveFontSizes: settings.responsiveFontSizes
  });
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <UsuarioContext.Provider value={{ user, setUser }} >
          <RTL>
            <SnackbarProvider maxSnack={5}>
              <CssBaseline />
              {content}
            </SnackbarProvider>
          </RTL>
        </UsuarioContext.Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;