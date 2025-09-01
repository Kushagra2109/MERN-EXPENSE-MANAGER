import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Layout from './Layout.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import {createBrowserRouter , RouterProvider} from 'react-router-dom';
// import Layout from './Layout.jsx';
import Dashboard from './components/Dashboard.jsx';
import Overview from './components/Overview.jsx';
import Contact from './components/Contact.jsx';
import Help from './components/Help.jsx';

const router = createBrowserRouter([
    {
        path: '/', element : <Layout/> , 
        children : [
            {path : '/', element : <Dashboard/>},
            {path : '/overview', element : <Overview/>},
            {path : '/contact', element : <Contact/>},
            {path : '/help', element : <Help/>}
        ]
    },
    
])

createRoot(document.getElementById('root')).render(
  
    <RouterProvider router={router}/>
  
)
