import { useContext, useEffect, useState } from "react";
import HomeTitle from "../Shared/HomeTitle/HomeTitle"
import { AuthContext } from "../../Context/Context";
import useAxiosCoins from "../Hooks/useAxiosCoins";
import { PiCoinBold } from "react-icons/pi";
import { MdPendingActions } from "react-icons/md";
import { FaDollarSign } from "react-icons/fa";
import useAxiosSecure from "../Hooks/useAxiosSecure";
const TaskCreatorHome=() =>{
    const {user} =useContext(AuthContext);
    const [coins,refetch]= useAxiosCoins();
    const [coin,setCoin]=useState(0);
    const [taskemail,setTaskEmail]=useState();
    const axiosSecure=useAxiosSecure();
    const [tasks,setTasks]=useState([]);
    const [pendingtasks,setPendingTasks]=useState([]);  
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
      // Update coin state when coins data changes
      if (coins && coins.length > 0) {
          const coinValue = coins[0].coins;
          setCoin(coinValue);
      }
  }, [coins]);

  useEffect(() => {
    if (tasks.length > 0) {
        const pendingTasksList = tasks.filter(task => task.status === 'pending');
        setPendingTasks(pendingTasksList);
    }
}, [tasks]);


const [showModal, setShowModal] = useState(false);
const [currentTask, setCurrentTask] = useState(null);
const [formData, setFormData] = useState({ task_title: '',  submission_details: '' });

  const handleShowModal = (task) => {
    setCurrentTask(task);
    setFormData({ task_title: task.task_title, task_details: task.task_details, submission_details: task.submission_details });
    setShowModal(true);
};
const handleCloseModal = () => {
  setShowModal(false);
  setCurrentTask(null);
};


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
    <div className="stat-value text-secondary">{pendingtasks.length}</div>
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
        <div className="mx-20 mb-20">
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th className="text-lg  text-center text-primary">Worker Name</th>
                <th className="text-lg  text-center text-primary">Worker Email</th>
                <th className="text-lg  text-center text-primary">Task Title</th>
                <th className="text-lg  text-center text-primary">Payable Amount</th>
                <th className="text-lg  text-center text-primary">View Submission</th>
                <th  className="text-lg text-center  text-primary">Take Actions</th>
              </tr>
            </thead>
            <tbody>
            {
                 pendingtasks.map((task, index) => (
                     <tr key={task._id}>
                         <td className="text-center mx-auto">{index + 1}</td>
                         <td className="text-center">{task.worker_name}</td>
                         <td className="text-center">{task.worker_email}</td>
                         <td className="text-center">{task.task_title}</td>
                         <td className="space-x-5 text-center">{task.payable_amount}</td>
                         <td className="text-center"><button className="btn btn-primary" onClick={() => handleShowModal(task)}>
                           View Submission
                           </button></td>
                         <td className="text-center space-x-4">
                           <button className="btn btn-primary">Approve</button>
                           <button className="btn btn-primary">Reject</button>
                         </td>
                     </tr>
                 ))
            }
            </tbody>
          </table>
        </div>
            </div>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">See Submission information</h2>
                        <form>
                            <div className="mb-4">
                                <label htmlFor="task_title" className="block text-gray-700">Title</label>
                               <h1>{formData.task_title}</h1>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="submission_info" className="block text-gray-700">Submission Details</label>
                                <h1>{formData.submission_details}</h1>
                            </div>
                        </form>
                        <div className="flex justify-end">
                            <button className="btn bg-gray-500 text-white px-4 py-2 rounded mr-2" onClick={handleCloseModal}>Close</button>
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}
export default TaskCreatorHome;