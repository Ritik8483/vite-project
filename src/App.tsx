import { useState, Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoutes from "./routes/PublicRoutes";
import ProtectedRoutes from "./routes/PublicRoutes";
import { red } from '@mui/material/colors';
import { ThemeProvider, createTheme } from "@mui/material/styles";

function App() {
  const userToken: any = useSelector(
    (state: any) => state.authReducer.authToken
  );

  const theme = createTheme({
    typography: {
      fontFamily: 'BlinkMacSystemFont',
    },
    palette: {
      primary: {
        main: red[500],
      },
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <Suspense fallback={<>loading...</>}>
          <Router>
            {userToken?.user ? <ProtectedRoute /> : <PublicRoutes />}
          </Router>
        </Suspense>
      </ThemeProvider>
    </>
  );
}

export default App;
