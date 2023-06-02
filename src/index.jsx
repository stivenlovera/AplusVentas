import React from "react";
import ReactDOM from "react-dom/client";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Provider } from 'react-redux';
import { JWTAuthProvider } from "contexts/JWTAuth";
import "nprogress/nprogress.css";
import "pure-react-carousel/dist/react-carousel.es.css"; // import "react-image-lightbox/style.css";

import "react-quill/dist/quill.snow.css";
import { BrowserRouter } from "react-router-dom";
import "simplebar/dist/simplebar.min.css";
import App from "./App";
import SettingsProvider from "contexts/settingsContext";
import reportWebVitals from "./reportWebVitals";
import "./__fakeData__";
import { storeToken } from "reducers";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <SettingsProvider>
        <Provider store={storeToken}>
          {/* <JWTAuthProvider> */}
          <BrowserRouter>
            <App />
          </BrowserRouter>
          {/*  </JWTAuthProvider> */}
        </Provider>
      </SettingsProvider>
    </LocalizationProvider>
  //</React.StrictMode>
); // If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();