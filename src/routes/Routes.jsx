import {
    createBrowserRouter,
  } from "react-router";
import Root from "../layouts/Root/Root";
import Application from "../pages/Application/Application";
import Registration from "../pages/Application/Forms/Registration";
  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      children: [
        {
          path: '/application-form',
          element: <Application></Application>
        },
        {
          path: '/registration',
          element: <Registration></Registration>
        }
      ]
        
    
    },
  ]);