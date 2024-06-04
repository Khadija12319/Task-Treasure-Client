import { GiTwoCoins } from "react-icons/gi";
import { Link, NavLink, Outlet } from "react-router-dom";
import Footer from "../Shared/Footer/Footer"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/Context";
import useAxiosCoins from "../Hooks/useAxiosCoins";

const TaskCreatorDashboard=() =>{
    const {user} =useContext(AuthContext);
    const [coins,refetch]= useAxiosCoins();
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
    return(
        <>
        <div className="flex h-full">
                <div className="w-64 min-h-[100%] bg-blue-600">
                    <div className="flex items-center justify-center my-5">
                    <Link to='/' className="btn btn-ghost text-2xl text-white"><GiTwoCoins className="text-yellow-500 text-3xl"/> TaskTreasure</Link>
                    </div>
                    <ul className="menu">
                        <li><NavLink to='/taskCreatordashboard/taskcreatorhome' className="text-center flex items-center justify-center text-lg my-2">Home</NavLink></li>
                    </ul>
                </div>
                <div className="flex-1">
                    <div className="flex justify-end my-2">
                    <ul className="menu gap-10 lg:menu-horizontal rounded-box">
  <li className="hover:bg-blue-400 hover:text-white hover:rounded-lg">
    <a className="text-lg">
      Available Coins
      <span className="text-lg">({coin})</span>
    </a>
  </li>
  <li>
    <a>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      Updates
      <span className="badge badge-sm badge-warning">NEW</span>
    </a>
  </li>
  <li>
    <a>
      Stats
      <span className="badge badge-xs badge-info"></span>
    </a>
  </li>
  <li>
    <a>
      Notification
      <span className="badge badge-xs badge-info"></span>
    </a>
  </li>
</ul>
                    </div>
                    <Outlet></Outlet>
                    <Footer></Footer>
                </div>
            </div>
        </>
    )
}
export default TaskCreatorDashboard;