import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { AuthContext } from "../../Context/Context";
import useAxiosCoins from "../Hooks/useAxiosCoins";
import useAxiosTasks from "../Hooks/useAxiosTasks";
import HomeTitle from "../Shared/HomeTitle/HomeTitle";
import Swal from "sweetalert2";

const MyTasks = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const [coins, refetch] = useAxiosCoins();
    const [tasks, refetchtask] = useAxiosTasks();
    const [creator_email, setCreatorEmail] = useState();
    const [userId, setUserId] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [task,setTasks]=useState();
    const [coin,setCoin]=useState();

    useEffect(() => {
        if (user) {
            refetch();
        }
    }, [user, refetch]);
    
    useEffect(() => {
        if (coins && coins.length > 0) {
            const coinData = coins[0]; // Access the first element of the coins array
            setCreatorEmail(coinData.email);
            setUserId(coinData._id);
            setCoin(coinData.coins);
        }
    }, [coins]);
    
    useEffect(() => {
        if (userId) {
            const fetchTasks = async () => {
                try {
                    const response = await axiosSecure.get(`/tasks/${creator_email}`);
                    setTasks(response.data);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchTasks();
        }
    }, [userId, axiosSecure,creator_email]);
    

    const [showModal, setShowModal] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [formData, setFormData] = useState({ task_title: '', task_details: '', submission_info: '' });

    const handleShowModal = (task) => {
        setCurrentTask(task);
        setFormData({ task_title: task.task_title, task_details: task.task_details, submission_info: task.submission_info });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentTask(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleUpdate = async () => {
        try {
            const updatedTask = {
                ...currentTask,
                task_title: formData.task_title,
                task_details: formData.task_details,
                submission_info: formData.submission_info
            };
            await axiosSecure.put(`/tasks/${currentTask._id}`, updatedTask);
            setTasks((prevTasks) => prevTasks.map(task => task._id === currentTask._id ? updatedTask : task));
            refetchtask();
            handleCloseModal();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Task has been saved",
                showConfirmButton: false,
                timer: 1500
              });
        } catch (err) {
            console.error('Error updating task:', err);
        }
    };

    const handleDelete = async (task) => {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
          },
          buttonsStyling: false
        });
        
        try {
          const result = await swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
          });
      
          if (result.isConfirmed) {
            const newCoins = parseInt(coin + (task.task_count * task.payable_amount));
            await axiosSecure.delete(`/tasks/${task._id}`);
            const point = { coins: newCoins };
            
            const response = await fetch(`https://assignment-12-server-ebon.vercel.app/users/${userId}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(point)
            });
            
            const data = await response.json();
            console.log(data);
            refetch();
            refetchtask();         
            swalWithBootstrapButtons.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire({
              title: "Cancelled",
              text: "Your imaginary file is safe :)",
              icon: "error"
            });
          }
        } catch (error) {
          console.error(error);
        }
      };
      

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
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
                                <th className="text-lg text-primary text-center">Take Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tasks.map((task, index) => (
                                    <tr key={task._id}>
                                        <td className="text-center">{index + 1}</td>
                                        <td className="text-center">{task.task_title}</td>
                                        <td className="text-center">{task.task_count}</td>
                                        <td className="text-center">{task.payable_amount}</td>
                                        <td className="space-x-5 text-center">
                                            <button className="btn btn-primary" onClick={() => handleShowModal(task)}>Update</button>
                                            <button className="btn btn-primary" onClick={() => handleDelete(task)}>Delete</button>
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
                        <h2 className="text-xl font-bold mb-4">Update Task</h2>
                        <form>
                            <div className="mb-4">
                                <label htmlFor="task_title" className="block text-gray-700">Title</label>
                                <input
                                    type="text"
                                    name="task_title"
                                    value={formData.task_title}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="task_details" className="block text-gray-700">Details</label>
                                <input
                                    type="text"
                                    name="task_details"
                                    value={formData.task_details}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="submission_info" className="block text-gray-700">Submission Info</label>
                                <input
                                    type="text"
                                    name="submission_info"
                                    value={formData.submission_info}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                        </form>
                        <div className="flex justify-end">
                            <button className="btn bg-gray-500 text-white px-4 py-2 rounded mr-2" onClick={handleCloseModal}>Close</button>
                            <button className="btn bg-blue-500 text-white px-4 py-2 rounded" onClick={handleUpdate}>Save Changes</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MyTasks;
