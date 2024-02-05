import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from './context/appContext'
import App from './App'
import './index.css'
<link
  href='https://fonts.googleapis.com/css2?family=Cormorant+Upright:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;500;600;700&display=swap'
  rel='stylesheet'
/>

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
