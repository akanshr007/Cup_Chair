import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./containers/components/ErrorBoundary/ErrorBoundary";
import "./index.scss";
import Routers from "./Routers";
import { store } from "./Redux/Store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Buffer } from "buffer";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./firebase";
import ScrollToTop from "./utils/scrollToTop";
import { GOOGLE_CLIENT_ID, RECAPTCHA_KEY } from "./constant";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
window.Buffer = Buffer;
const persistor = persistStore(store);
ReactDOM.render(
  <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_KEY}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <BrowserRouter>
            <ScrollToTop />
            <ErrorBoundary>
              <Routers />
            </ErrorBoundary>
          </BrowserRouter>
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  </GoogleReCaptchaProvider>,
  document.getElementById("root")
);

