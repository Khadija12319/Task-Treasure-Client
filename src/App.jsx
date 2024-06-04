import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import NavBar from './components/Shared/NavBar/NavBar'
import Footer from './components/Shared/Footer/Footer'

function App() {
  const location = useLocation();

  const noHeaderFooter = location.pathname.includes('login')||location.pathname.includes('register');
  
  return (
    <>
     {noHeaderFooter || <NavBar></NavBar>}
     <Outlet></Outlet>
     {noHeaderFooter || <Footer></Footer>}
    </>
  )
}

export default App
