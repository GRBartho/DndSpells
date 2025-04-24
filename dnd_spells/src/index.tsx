import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
const theme = createTheme({
  palette: {
    primary: {
      main: "#C30101",
    },
    background: {
      paper: "#F6F6F6",
      default: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: "Saira Condensed, sans-serif",
    fontWeightBold: 800,
    fontWeightMedium: 600,
    fontWeightRegular: 400,
    fontSize: 14,
    h1: {
      fontSize: "2rem",
      fontWeight: 800,
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 800,
    },
    h3: {
      fontSize: "1.25rem",
      fontWeight: 800,
    },
    h4: {
      fontSize: "1.125rem",
      fontWeight: 800,
    },
    h5: {
      fontSize: "1rem",
      fontWeight: 800,
    },
  },
});
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
