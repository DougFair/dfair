
import Root from "./pages/Root"
import Home from "./pages/Home"
import Admin from "./pages/Admin"
import Register from "./pages/Register"
import AuthLogin from './pages/AuthLogin'
import Papers from './components/PublicationList'
import YearBooks from './components/YearBooks'
import UploadBooks from './pages/UploadBooks'
import CreatePublicationList from "./pages/CreatePublicationList"
import CreateDiscoveryEntry from "./pages/CreateDiscoveryEntry"
import CreateCodeEntry from "./pages/CreateCodeEntry"
import EditCurrentReadingList from "./pages/EditCurrentReadingList"
import AddCurrentReadingList from "./pages/AddCurrentReadingList"
import AddDashboardDetails from "./pages/AddDashboardDetails"
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { AuthProvider } from './pages/AuthContext';
import { UserProvider } from './pages/UserContext';
import './App.css'


const router = createBrowserRouter([
  {path: "/",
  element: <Root/>,
children: [
  {path: "/",
  element: <Home />},
  {path: "/publications",
  element: <Papers />},
  {path: "/register",
  element: <Register />},
  {path: "/login",
  element: <AuthLogin />},
  {path: "/admin",
  element: <Admin />},
  {path: "/admin/add-publications",
  element: <CreatePublicationList />},
  {path: "/admin/upload-books",
  element: <UploadBooks />},
  {path: "/admin/upload-discoveries",
  element: <CreateDiscoveryEntry />},
  {path: "/admin/add-websites",
  element: <CreateCodeEntry />},
  {path: "/admin/current-reading-add",
  element: <AddCurrentReadingList />},
  {path: "/admin/current-reading-edit",
  element: <EditCurrentReadingList />},
  {path: "/year-books",
  element: <YearBooks />},
  {path: "/admin/add-dashboard-details",
  element: <AddDashboardDetails />}
]},
  
])


const App = () => {

  return (
    <AuthProvider>
    <UserProvider>
    <RouterProvider router={router}/>
    </UserProvider> 
    </AuthProvider>
  );
}


export default App
