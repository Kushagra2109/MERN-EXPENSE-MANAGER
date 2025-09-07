import { createRoot } from 'react-dom/client'
import './index.css'
import Layout from './Layout.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './components/Dashboard.jsx';
import Overview from './components/Overview.jsx';
import { Provider } from 'react-redux'
import { store } from './redux/store.js';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import HomePage from './components/HomePage.jsx';

const router = createBrowserRouter([
  {
    path: '/', element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/overview', element: <Overview /> },
      {path : '/register' , element : <Register />},
      {path : '/login' , element : <Login />},
    ]
  },
  

])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
