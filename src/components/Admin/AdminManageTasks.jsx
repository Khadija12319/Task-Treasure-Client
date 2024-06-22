import { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import HomeTitle from "../Shared/HomeTitle/HomeTitle";
import Swal from "sweetalert2";

const AdminManageTasks = () =>{
    const axiosSecure=useAxiosSecure();
    const [tasks,setTasks]=useState([]); 
    const [selectedTask, setSelectedTask] = useState(null);
    const [showModal, setShowModal] = useState(false);
    

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const res = await axiosSecure.get('/tasks');
            setTasks(res.data);

          } catch (error) {
            console.error("Error fetching Tasks:", error);
          }
        };
    
        fetchUsers();
      }, [axiosSecure]);

      const handleDeleteTask = async (taskId) => {
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
                await axiosSecure.delete(`/tasks/${taskId}`);
                setTasks(tasks.filter(task => task._id !== taskId));
                swalWithBootstrapButtons.fire({
                    title: "Deleted!",
                    text: "Your task has been deleted.",
                    icon: "success"
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Your task is safe :)",
                    icon: "error"
                });
            }
        } catch (error) {
            console.error('Error deleting task:', error);
            Swal.fire({
                title: "Error!",
                text: "There was an issue deleting the task.",
                icon: "error"
            });
        }
    };

    const openModal = (task) => {
      setSelectedTask(task);
      setShowModal(true);
  };

  const closeModal = () => {
      setShowModal(false);
  };

    return(
        <>
        <div>
        <div>
                <HomeTitle title="Manage Tasks" para="The tasks that are created by the task creators will be managed by the Admin. Admin will review those task and can view and delete the tasks."></HomeTitle>
            </div>
        <div className="mx-20 mb-20">
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th className="text-lg  text-center text-primary">Task Title</th>
                <th className="text-lg  text-center text-primary">TaskCreator Name</th>
                <th className="text-lg  text-center text-primary">Task Quantity</th>
                <th className="text-lg  text-center text-primary">Coins Needed</th>
                <th className="text-lg  text-center text-primary">Availability</th>
                <th  className="text-lg text-center  text-primary">
                    View button
                </th>
                <th  className="text-lg text-center  text-primary">
                    Delete button
                </th>
              </tr>
            </thead>
            <tbody>
            {
                 tasks.map((task, index) => (
                     <tr key={task._id}>
                         <td className="text-center mx-auto">{index + 1}</td>
                         <td className="text-center">{task.task_title}</td>
                         <td className="text-center">{task.creator_name}</td>
                         <td className="text-center" >{task.task_count}</td>
                         <td className="text-center">{task.payable_amount}</td>
                         <td className="text-center">{task.task_count}</td>
                         <td className="text-center">
                           <button className="btn btn-primary" onClick={() => openModal(task)}>View Task</button>
                         </td>
                         <td className="text-center">
                           <button className="btn btn-primary" onClick={() => handleDeleteTask(task._id)}>Delete Task</button>
                         </td>
                     </tr>
                 ))
            } 
            </tbody>
          </table>
        </div>
            </div>
        </div>
        {showModal && selectedTask && (
                <TaskModal task={selectedTask} closeModal={closeModal} />
            )}
        </>
    )
};

const TaskModal = ({ task, closeModal }) => {
  return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-[400px]">
              
              <h2 className="text-2xl font-bold text-center">Task Details</h2>
              <p className="pb-1"><strong>Task Title:</strong> {task.task_title}</p>
              <p className="pb-1"><strong>Creator Name:</strong> {task.creator_name}</p>
              <p className="pb-1"><strong>Task Quantity:</strong> {task.task_count}</p>
              <p className="pb-1"><strong>Coins Needed:</strong> {task.payable_amount}</p>
              <p className="pb-1 w-[350px]"><strong>Task Details:</strong> {task.task_details}</p>
              <span className="close btn btn-primary mt-4" onClick={closeModal}>Close</span>
              {/* Add more task details as needed */}
          </div>
      </div>
  );
};
export default AdminManageTasks;