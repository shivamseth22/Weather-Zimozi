import React, { Suspense, lazy } from "react";
import { createBrowserRouter, Outlet, useLocation } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from "./Redux/store";
import Sidebar from "./homepage/drawer/Sidebar";
import { I18nextProvider } from "react-i18next";
import i18n from "./homepage/i18n";

const Dashboard = lazy(() => import("./homepage/dashboard/dashboard"));
const Login = lazy(() => import("./homepage/auth/Login"));
const SignUp = lazy(() => import("./homepage/auth/SignUp"));
const Map = lazy(() => import("./homepage/map/Map"));
const Setting = lazy(() => import("./homepage/settings/setting"));
const Forecast = lazy(() => import("./homepage/forecast/Forecast"));
const FavLocation = lazy(() => import("./homepage/locations/FavLocation"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/map",
        element: <Map />,
      },
      {
        path: "/setting",
        element: <Setting/>,
      },
      {
        path: "/calender",
        element: <Forecast/>,
      },
      {
        path: "/favourite-city",
        element: <FavLocation/>,
      },
    ]
  },
]);

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <Sidebar />
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </Provider>
    </I18nextProvider>
  );
}

export default App;
