import './App.css'
import NavBar from './components/NavBar'
import { Outlet } from 'react-router-dom';
import useAuth from './Hooks/UseAuth';

function Layout() {
  useAuth();
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}

export default Layout
