import { GiTwoCoins } from "react-icons/gi";
import { Link, NavLink, Outlet } from "react-router-dom";
import Footer from "../Shared/Footer/Footer"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/Context";
import useAxiosCoins from "../Hooks/useAxiosCoins";

const WorkerDashboard=() =>{
    const {user} =useContext(AuthContext);
    const [coins,refetch]= useAxiosCoins();
    const [coin,setCoin]=useState(0);
  const [role,setRole]=useState(null);
  const [image,setImage]=useState();
  const [name,setName]=useState();
    useEffect(() => {
        if (user) {
          refetch();
          coins.map(co=>{
            setCoin(co.coins);
            setRole(co.role);
            setImage(co.photo);
            setName(co.name);
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
                        <li><NavLink to='' className="text-center flex items-center justify-center text-lg my-2 text-white">Home</NavLink></li>
                        <li><NavLink  className="text-center flex items-center justify-center text-lg my-2 text-white">Tasl List</NavLink></li>
                        <li><NavLink  className="text-center flex items-center justify-center text-lg my-2 text-white">My Submissions</NavLink></li>
                        <li><NavLink className="text-center flex items-center justify-center text-lg my-2 text-white">WithDrawals</NavLink></li>
                    </ul>
                </div>
                <div className="flex-1">
                    <div className="flex justify-end my-2">
                    <ul className="menu gap-10 lg:menu-horizontal rounded-box flex flex-col items-center">
  <li className="hover:bg-blue-400 hover:text-white hover:rounded-lg">
    <a className="text-lg">
      Available Coins
      <span className="text-lg">({coin})</span>
    </a>
  </li>
  <li>
    <a>
    <div className="avatar w-12 rounded-full hover:rounded-full">
    <div className="w-12 rounded-full">
      <img src={image} alt="user image" />
    </div>
  </div>
    </a>
  </li>
  <li className="hover:bg-blue-400 hover:text-white hover:rounded-lg">
    <a className="text-lg">
      {role}
    </a>
  </li>
  <li className="hover:bg-blue-400 hover:text-white hover:rounded-lg">
    <a className="text-lg">
      {name}
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
export default WorkerDashboard;