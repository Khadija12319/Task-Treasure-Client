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
    const [approvedtasks,setApprovedTasks]=useState([]); 
    const [approvedTasksCoinSum, setApprovedTasksCoinSum] = useState(0);
    useEffect(() => {
      const fetchData = async () => {
          try {
              if (user) {
                  refetch();
                  const res = await axiosSecure.get(`/submissions/${user.email}`);
                  setTasks(res.data);
              }
          } catch (error) {
              console.error(error);
          }
      };
  
      fetchData(); // Call fetchData when the component mounts
  
      // Cleanup function to avoid memory leaks
      return () => {
          // Add cleanup logic if needed
      };
  }, [user, refetch, axiosSecure]);

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

          }, [user, refetch,coins,refetch(),axiosSecure,email]);
          useEffect(() => {
            if (tasks.length > 0) {
                const pendingTasksList = tasks.filter(task => task.status === 'approved');
                setApprovedTasks(pendingTasksList);
                const coinSum = pendingTasksList.reduce((total, task) => {
                  return total + task.payable_amount;
              }, 0);
      
              setApprovedTasksCoinSum(coinSum);
            }
        }, [tasks]);


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
                <div className="stat-value">{approvedTasksCoinSum}</div>
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
                <th className="text-lg text-center text-primary">Task Title</th>
                <th className="text-lg text-center text-primary">Payable Amount</th>
                <th className="text-lg text-center text-primary">Creator Name</th>
                <th  className="text-lg text-center text-primary">Status</th>
              </tr>
            </thead>
            <tbody>
            {
                 approvedtasks.map((task, index) => (
                     <tr key={task._id}>
                         <td className="text-center mx-auto">{index + 1}</td>
                         <td className="text-center">{task.task_title}</td>
                         <td className="text-center">{task.payable_amount}</td>
                         <td className="text-center">{task.creator_name}</td>
                         <td className="text-center">{task.status}</td>
                        
                     </tr>
                 ))
            }
            </tbody>
          </table>
        </div>
            </div>
        </>
    )
}
export default WorkerHome;