import { useContext, useEffect, useState } from "react";
import HomeTitle from "../Shared/HomeTitle/HomeTitle"
import { AuthContext } from "../../Context/Context";
import useAxiosCoins from "../Hooks/useAxiosCoins";
import { PiCoinBold } from "react-icons/pi";
import { FaDollarSign, FaTasks } from "react-icons/fa";
import useAxiosSecure from "../Hooks/useAxiosSecure";
const WorkerHome=() =>{
    const {user} =useContext(AuthContext);
    const [coins,refetch]= useAxiosCoins();
    const [coin,setCoin]=useState(0);
    const [email,setEmail]=useState();
    const axiosSecure = useAxiosSecure();
    const [tasks,setTasks]=useState([]);

        useEffect(() => {
            if (user) {
              refetch();
              coins.map(co=>{
                setCoin(co.coins);
                setEmail(co.email);
              }) // Fetch coins data when user is logged in
                const fetchData = async() =>{
                const tasksResponse = await axiosSecure.get(`/submissions/${email}`);
                setTasks(tasksResponse.data);
              }
              fetchData();
              refetch();
            }

          }, [user, refetch,coins,refetch()]);


    return(

        <>
            <div>
                <HomeTitle title="states" para="Available coins,total task submission and total earning of your's when your work is approved are available here and see this."></HomeTitle>
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
                  <FaTasks className="inline-block w-8 h-8 stroke-current"/>
                </div>
                <div className="stat-title">Total Task</div>
                <div className="stat-value text-secondary">{tasks.length}</div>
                <div className="stat-desc">Submitted by You</div>
              </div>

              <div className="stat">
                <div className="stat-figure text-secondary">
                    <FaDollarSign className="inline-block w-8 h-8 stroke-current"/>

                </div>
                <div className="stat-value">86%</div>
                <div className="stat-title">Total Earning</div>
                <div className="stat-desc text-secondary">Paid after task approved</div>
              </div>

            </div>
            </div>

            <div>
                <HomeTitle title="Approved Submission" para="The tasks that are submitted by you  reviewed by the Task Creator and status is available here. Task Creator reviewed those task and give you the points achieved by you."></HomeTitle>
            </div>

            <div className="mx-20 mb-20">
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th className="text-lg text-primary">Task Title</th>
                <th className="text-lg text-primary">Payable Amount</th>
                <th className="text-lg text-primary">Creator Name</th>
                <th  className="text-lg text-primary">Status</th>
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
export default WorkerHome;