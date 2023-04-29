import { CssBaseline, ThemeProvider } from "@mui/material";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import RTL from "components/RTL";
import useSettings from "hooks/useSettings";
import { useRoutes } from "react-router-dom";
import routes from "routes";
import { createCustomTheme } from "theme";
import "./i18n";
import * as React from 'react';
import Button from '@mui/material/Button';
import { SnackbarProvider, useSnackbar } from 'notistack';

const App = () => {
  const content = useRoutes(routes());
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
        <SnackbarProvider maxSnack={3}>
          <CssBaseline />
          {content}
        </SnackbarProvider>
      </RTL>
    </ThemeProvider>
  </StyledEngineProvider>;
};

export default App;