import { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import HomeTitle from "../Shared/HomeTitle/HomeTitle";
import { FaTags } from "react-icons/fa";
import { Link } from "react-router-dom";

const MyList = () =>{
    const axiosSecure=useAxiosSecure();
    const [tasks,setTasks]=useState([]);
    useEffect(() => {
        const fetchtasks = async() =>{
            const res =await axiosSecure.get('/tasks');
            setTasks(res.data);
        }
        fetchtasks();
    }, [axiosSecure]);
    console.log(tasks);
    return(
        <>
        <div className="mb-20">
            <HomeTitle title="Task Lists" para="Workers can attempt to do a task from here and submit. Earn money by completing task and selling points."></HomeTitle>

            <div>
                <div className="mx-20 grid grid-cols-3 gap-5">
                {
                    tasks.map(task => (
                        <div className="card shadow-xl bg-[#EDE8F5]" key={task._id}>
                            <figure><img src={task.task_img_url} alt="task image" className="h-64 w-full"/></figure>
                            <div className="card-body">
                                <h2 className="card-title">{task.task_title}</h2>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <FaTags  className="text-3xl"/>
                                        <p className="text-xl">Vacancy Available</p>
                                    </div>
                                    <div><p  className="text-xl text-primary font-bold">{task.task_count}</p></div>
                                </div>
                                <hr className="border-blue-300"/>
                                <div>
                                    <p className="text-2xl font-medium">By:</p>
                                    <p className="text-xl">{task.creator_name}</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-medium">Complete Within:</p>
                                    <p className="text-xl">{task.completion_date}</p>
                                </div>
                                <hr className="border-blue-300"/>
                                <div className="card-actions justify-between items-center">
                                    <p className="text-2xl font-bold text-primary">Points: <span>{task.payable_amount}</span></p>
                                    <Link to={`/workerdashboard/mylist/${task._id}`}><button className="btn btn-primary">Apply</button></Link>
                                </div>
                            </div>
                        </div>
                    ))
                }


                </div>
            </div>
        </div>
        </>
    )
}
export default MyList;