import { MdOutlineMenuOpen } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { GiTwoCoins } from "react-icons/gi";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Context/Context";
import { RiCoinsFill } from "react-icons/ri";
import useAxiosCoins from "../../Hooks/useAxiosCoins";
import WorkerDashboard from "../../Home/WorkerDashboard";

function NavBar() {
  const [coins,refetch]= useAxiosCoins();
  const {user,logOut} =useContext(AuthContext);
  const [coin,setCoin]=useState(0);
  const [role,setRole]=useState(null);


  useEffect(() => {
    if (user) {
      refetch();
      coins.map(co=>{
        setCoin(co.coins);
        setRole(co.role);
      }) // Fetch coins data when user is logged in
    }
  }, [user, refetch,coins]);

  const handleSignOut = () =>{
    logOut()
    .then()
    .catch()
  }


    return (
      <>
       <div className="">
       <div className="container mx-auto">
       <div className="navbar bg-base-100">
  <div className="navbar-start">
    {
      user? (
        <>
          {
            role==="worker" &&(
              <>
              <Link to='/workerdashboard'>
              <label htmlFor="my-drawer" className="btn btn-primary drawer-button"><MdOutlineMenuOpen className="text-2xl"/></label></Link>
              </>
            )
          }
          {
            role==="taskCreator" &&(
              <>
              <Link to='/taskCreatordashboard'>
              <label htmlFor="my-drawer" className="btn btn-primary drawer-button"><MdOutlineMenuOpen className="text-2xl"/></label></Link>
              </>
            )
          }
          {
            role==="Admin" &&(
              <>
              <Link to='/admindashboard'>
              <label htmlFor="my-drawer" className="btn btn-primary drawer-button"><MdOutlineMenuOpen className="text-2xl"/></label></Link>
              </>
            )
          }
        </>
      ):(
        <></>
      )
    }
  </div>
  <div className="navbar-center">
    <Link to='/' className="btn btn-ghost text-2xl"><GiTwoCoins className="text-yellow-500 text-3xl"/> TaskTreasure</Link>
  </div>
  <div className="navbar-end">
   {
    user? (
       <>
       <button className="btn btn-ghost"><RiCoinsFill className="text-2xl text-yellow-500"/> Available Coin <span>({coin})</span></button>
    <Link to='/user'><button className="btn btn-ghost">
      User Profile
    </button></Link>
    
    <Link>
    <button className="btn btn-ghost" onClick={handleSignOut}>
      Logout
    </button>
    </Link>
       </>):
       (
       <>
       <button className="btn btn-ghost">
       <a href="https://youtu.be/7uF05BuweRA?si=z9sTt3T3TnBXe8iJ" target="_blank">Watch Demo</a>
       </button>
       <Link to="/login"><button className="btn btn-ghost">
         Login
       </button></Link>
       <Link to="/register">
       <button className="btn btn-ghost">
         Register
       </button>
       </Link>
       </>
    )
   }
  </div>
</div>
       </div>
       </div>
      </>
    )
  }
  
  export default NavBar