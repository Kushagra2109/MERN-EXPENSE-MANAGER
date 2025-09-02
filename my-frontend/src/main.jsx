import { createRoot } from 'react-dom/client'
import './index.css'
import Layout from './Layout.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './components/Dashboard.jsx';
import Overview from './components/Overview.jsx';
import Contact from './components/Contact.jsx';
import Help from './components/Help.jsx';
import { Provider } from 'react-redux'
import { store } from './redux/store.js';

const router = createBrowserRouter([
  {
    path: '/', element: <Layout />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/overview', element: <Overview /> },
      { path: '/contact', element: <Contact /> },
      { path: '/help', element: <Help /> }
    ]
  },

])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
