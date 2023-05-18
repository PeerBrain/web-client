import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import * as Sentry from "@sentry/react";
import App from "./App";


Sentry.init({
  dsn: "https://5c8dcc0ed7c5489dabaf1588ccaf8b85@o575799.ingest.sentry.io/4505206768140288",
  integrations: [new Sentry.BrowserTracing(), new Sentry.Replay()],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0,
  profiles_sample_rate: 1.0,
  // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);



root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);