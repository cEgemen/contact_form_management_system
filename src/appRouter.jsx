import { createBrowserRouter } from "react-router-dom";
import NoAuth from "./pages/noAuth";
import NoFound from "./pages/noFound";
import Home, { actionForHome, loaderForHome } from "./pages/home";
import Login from "./pages/login";
import { actionForLogin } from "./pages/login";
import Admin from "./pages/admin";
import Reader from "./pages/reader"
import MainLayout from "./layouts/mainLayout";
import AdminLayout from "./layouts/adminLayout";
import ReaderLayout, { actionForLogOut } from "./layouts/readerLayout";
import Messages from "./pages/messages";
import MessageDetail, { actionForMessageDetail } from "./pages/messageDetail";
import { loaderForMessageDetail } from "./pages/messageDetail";
import { loaderForMessages } from "./pages/messages";
import Users, { loaderForUsers } from "./pages/users";
import UserDetail, { actionUserDetail, loaderForUserDetail } from "./pages/userDetail";
import Reports, { actionForReports } from "./pages/reports";
import { checkAuthLoader } from "./utils/checkUtils";
import Error from "./pages/error";
export const appRouter = createBrowserRouter([
     {path:"/",element:<MainLayout />,errorElement:<Error />,children:[
          {index:true,element:<Home />,loader:loaderForHome,action:actionForHome},
          {path:"login",element:<Login />,action:actionForLogin},
          {path:"not-auth",element:<NoAuth />,},
                                               ]
     },
     {path:"/user",errorElement:<Error />,loader:checkAuthLoader,children:[
          {path:"admin",element:<AdminLayout />,children:[
               {index:true,element:<Admin />},
               {path:"messages",children:[
                    {index:true,element:<Messages  />,loader:loaderForMessages},
                    {path:":id",element:<MessageDetail  />,loader:loaderForMessageDetail,action:actionForMessageDetail}
               ]},
               {path:"users",children:[
                     {index:true,element:<Users /> , loader:loaderForUsers},
                     {path:":id",element:<UserDetail /> ,loader:loaderForUserDetail,action:actionUserDetail}
               ]},
               {path:"reports",element:<Reports />,action:actionForReports}
          ]},
          {path:"reader",element:<ReaderLayout />,action:actionForLogOut,children:[
               {index:true,element:<Reader />},
               {path:"messages",children:[
                    {index:true,element:<Messages  />,loader:loaderForMessages},
                    {path:":id",element:<MessageDetail  />,loader:loaderForMessageDetail,action:actionForMessageDetail}
               ]},
               {path:"users",children:[
                    {index:true,element:<Users /> , loader:loaderForUsers},
                    {path:":id",element:<UserDetail /> ,loader:loaderForUserDetail,action:actionUserDetail}
              ]},
              {path:"reports",element:<Reports />,action:actionForReports}
          ]}
     ]},    
     {path:"*",element:<NoFound />}
])