import {
  createBrowserRouter,
} from "react-router";
import Root from "../layouts/Root/Root";
import Application from "../pages/Application/Application";
import Registration from "../pages/Application/Forms/Registration";
import ApplicationInfo from "../pages/Application/Forms/ApplicationInfo";
import PersonalInfo from "../pages/Application/Forms/PersonalInfo";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: '/application-form',
        element: <Application></Application>,
        children: [
          {
            path: '/application-form/registration',
            element: <Registration></Registration>
          },
          {
            path: '/application-form/info',
            element: <ApplicationInfo></ApplicationInfo>
          },
          {
            path: '/application-form/personal',
            element: <PersonalInfo></PersonalInfo>
          }
    

        ]
      },
    ]
      
  
  },
]);