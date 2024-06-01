import { Outlet } from 'react-router-dom'
import './App.css'
import NavBar from './components/Shared/NavBar/NavBar'
import Footer from './components/Shared/Footer/Footer'

function App() {
  
  return (
    <>
     <NavBar></NavBar>
     <Outlet></Outlet>
     <Footer></Footer>
    </>
  )
}

export default App
