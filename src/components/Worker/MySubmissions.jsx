import { useContext, useEffect, useState } from "react";
import useAxiosCoins from "../Hooks/useAxiosCoins";
import HomeTitle from "../Shared/HomeTitle/HomeTitle";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { AuthContext } from "../../Context/Context";


const MySubmissions = () =>{
    const { user, loading: userLoading } = useContext(AuthContext);
    const [useremail,setUserEmail]=useState(null);
    const axiosSecure = useAxiosSecure();
    const [tasks,setTasks]=useState([]);
    const [coins,refetch]=useAxiosCoins();

    const fetchData = async () => {
        try {
            if (!user || userLoading) return;
            refetch();
            const coin = coins[0];
            const userEmail = coin.email;
            setUserEmail(userEmail);

            if (coin._id) {
                const tasksResponse = await axiosSecure.get(`/submissions/${useremail}`);
                setTasks(tasksResponse.data);
            }
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        fetchData(); // Call the async function
    
    }, [axiosSecure, user, userLoading,refetch()]); // Include dependencies axiosSecure and user.email
    
    
    return(
        <>
            <div>
            <div className="mx-20">
                <div className="overflow-x-auto">
                    <HomeTitle title="My Submitted Tasks" para="Here is all represented my submitted work i have completed"></HomeTitle>
                    <table className="table table-zebra mb-20">
                        {/* head */}
                        <thead>
                            <tr>
                                <th className="text-lg text-primary text-center">Serial</th>
                                <th className="text-lg text-primary text-center">Task Title</th>
                                <th className="text-lg text-primary text-center">Task Image URL</th>
                                <th className="text-lg text-primary text-center">Payable Amount</th>
                                <th className="text-lg text-primary text-center">Submission Details</th>
                                <th className="text-lg text-primary text-center">Creator Email</th>
                                <th className="text-lg text-primary text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                    tasks.map((task, index) => (
                                        <tr key={task._id}>
                                            <td className="text-center">{index + 1}</td>
                                            <td className="text-center">{task.task_title}</td>
                                            <td className="text-center">{task.task_img_url}</td>
                                            <td className="text-center">{task.payable_amount}</td>
                                            <td className="space-x-5 text-center">{task.submission_details}</td>
                                            <td className="text-center">{task.creator_email}</td>
                                            <td className="text-center">{task.status}</td>
                                        </tr>
                                    ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        </>
    );
};

export default MySubmissions;