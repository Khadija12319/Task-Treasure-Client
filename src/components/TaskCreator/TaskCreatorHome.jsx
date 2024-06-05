import { useContext, useEffect, useState } from "react";
import HomeTitle from "../Shared/HomeTitle/HomeTitle"
import { AuthContext } from "../../Context/Context";
import useAxiosCoins from "../Hooks/useAxiosCoins";
import { PiCoinBold } from "react-icons/pi";
import { MdPendingActions } from "react-icons/md";
import { FaDollarSign } from "react-icons/fa";
const TaskCreatorHome=() =>{
    const {user} =useContext(AuthContext);
    const [coins,refetch]= useAxiosCoins();
    const [coin,setCoin]=useState(0);
        useEffect(() => {
            if (user) {
              refetch();
              coins.map(co=>{
                setCoin(co.coins);
              }) // Fetch coins data when user is logged in
            }
          }, [user, refetch,coins]);
    return(

        <>
            <div>
                <HomeTitle title="states" para="Available coins,pending tasks and total payment that is paid by user is presented in this section."></HomeTitle>
            </div>

            <div>
            <div className="stats w-full justify-evenly mb-10">
  
  <div className="stat">
    <div className="stat-figure text-primary">
      <PiCoinBold className="inline-block w-8 h-8 stroke-current"/>
    </div>
    <div className="stat-title">Total Coins</div>
    <div className="stat-value text-primary">{coin}</div>
    <div className="stat-desc">Available Now</div>
  </div>
  
  <div className="stat">
    <div className="stat-figure text-secondary">
      <MdPendingActions className="inline-block w-8 h-8 stroke-current"/>
    </div>
    <div className="stat-title">Pending Task</div>
    <div className="stat-value text-secondary">2.6M</div>
    <div className="stat-desc">Submitted by Workers</div>
  </div>
  
  <div className="stat">
    <div className="stat-figure text-secondary">
        <FaDollarSign className="inline-block w-8 h-8 stroke-current"/>
      
    </div>
    <div className="stat-value">86%</div>
    <div className="stat-title">Total Payment</div>
    <div className="stat-desc text-secondary">Paid by User</div>
  </div>
  
</div>
            </div>

            <div>
                <HomeTitle title="Task To Review" para="The tasks that are submitted by the workers will be reviewed by the Task Creator. Task Creator will review those task and give them the points achieved by the workers."></HomeTitle>
            </div>
        <div className="mx-20">
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th className="text-lg text-primary">Worker Name</th>
                <th className="text-lg text-primary">Worker Email</th>
                <th className="text-lg text-primary">Task Title</th>
                <th className="text-lg text-primary">Payable Amount</th>
                <th className="text-lg text-primary">View Submission</th>
                <th  className="text-lg text-primary">Take Actions</th>
              </tr>
            </thead>
            <tbody>
              
            </tbody>
          </table>
        </div>
            </div>
        </>
    )
}
export default TaskCreatorHome;