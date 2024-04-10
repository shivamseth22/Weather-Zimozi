import { createBrowserRouter, Outlet, useLocation } from "react-router-dom";
import Dashboard from "./homepage/dashboard/dashboard";
import { Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from "./Redux/store";
import Sidebar from "./homepage/drawer/Sidebar";
import Login from "./homepage/auth/Login";
import SignUp from "./homepage/auth/SignUp";
import Map from "./homepage/map/Map";
import Setting from "./homepage/settings/setting";
import Forecast from "./homepage/forecast/Forecast";
import FavLocation from "./homepage/locations/FavLocation";
import { I18nextProvider } from "react-i18next";
import i18n from "./homepage/i18n";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // {
      //   path: "/login",
      //   element: <Navigate to="/login" />, // Redirect to login page by default
      // },
      {
        path: "/login",
        element: <Login />, // Render the login page component
      },
      {
        path: "/signup",
        element: <SignUp />, // Render the login page component
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
])

function App() {
  return (
<I18nextProvider i18n={i18n}>
      <Provider store={store}>
         <Sidebar />
        <Outlet />
      </Provider>
      </I18nextProvider>

  );
}

export default App;
