import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { AuthContext } from "../../Context/Context";
import useAxiosCoins from "../Hooks/useAxiosCoins";
import useAxiosTasks from "../Hooks/useAxiosTasks";
import HomeTitle from "../Shared/HomeTitle/HomeTitle";

const MyTasks = () =>{
    const axiosSecure = useAxiosSecure();
    const {user}=useContext(AuthContext);
    const [coins,refetch]= useAxiosCoins();
    const [tasks,refetchtask]= useAxiosTasks();
    const [creator_email,setCreatorEmail]=useState();
    const [userId,setUserId]=useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [serial,setSerial]=useState(1);
    useEffect(() => {
        if (user) {
          refetch(); // Fetch coins data when user is logged in
        }
      }, [user, refetch]);
      useEffect(() => {
        if (coins && coins.length > 0) {
          const coinData = coins[0]; // Access the first element of the coins array
          setCreatorEmail(coinData.email);
          setUserId(coinData._id);
        }
      }, [coins]);

      console.log(tasks);

    return(
        <>
        <div>
        <div className="mx-20">
        <div className="overflow-x-auto">
            <HomeTitle title="My Added Tasks" para="Task creator can update and delete tasks from here."></HomeTitle>
          <table className="table table-zebra mb-20">
            {/* head */}
            <thead>
              <tr>
                <th className="text-lg text-primary text-center">Serial</th>
                <th className="text-lg text-primary text-center">Task Title</th>
                <th className="text-lg text-primary text-center">Task Count</th>
                <th className="text-lg text-primary text-center">Payable Amount</th>
                <th  className="text-lg text-primary text-center">Take Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                tasks.map((task, index)=> (
                    <tr key={task._id}>
                      <td className="text-center">{index + 1}</td>
                      <td className="text-center">{task.task_title}</td>
                      <td className="text-center">{task.task_count}</td>
                      <td className="text-center">{task.payable_amount}</td>
                      <td className="space-x-5 text-center">
                        <button className="btn btn-primary">Update</button>
                        <button className="btn btn-primary">Delete</button>
                      </td>
                    </tr>
                  ))
              }
            </tbody>
          </table>
        </div>
            </div>
        </div>
        </>
    )
};
export default MyTasks;