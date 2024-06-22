import { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import HomeTitle from "../Shared/HomeTitle/HomeTitle";
import Swal from "sweetalert2";

const AdminManageUsers = () =>{
    const axiosSecure=useAxiosSecure();
    const [users,setUsers]=useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [newRole, setNewRole] = useState(""); 

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const res = await axiosSecure.get('/users');
            setUsers(res.data);

          } catch (error) {
            console.error("Error fetching users:", error);
          }
        };
    
        fetchUsers();
      }, [axiosSecure]);

      const handleRemoveUser = async (userId) => {
    try {
      await axiosSecure.delete(`/users/${userId}`);
      Swal.fire({
        icon: 'success',
        title: 'User Deleted!',
        text: 'Admin removed the user successfully',
        showConfirmButton: false,
        timer: 1500
    });
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error("Error removing user:", error);
    }
  };
  const openRoleUpdateModal = (user) => {
    setSelectedUser(user);
    setNewRole(user.role); // Set the current role as the default value in the dropdown
    setIsModalOpen(true);
};

const handleRoleUpdate = async () => {
    try {
        await axiosSecure.put(`/users/${selectedUser._id}`, { role: newRole });
        setUsers(users.map(user => user._id === selectedUser._id ? { ...user, role: newRole } : user));
        setIsModalOpen(false);
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User role has been updated",
            showConfirmButton: false,
            timer: 1500
        });
    } catch (err) {
        console.error('Error updating user role:', err);
    }
};
    return(
        <>
        <div>
        <div>
                <HomeTitle title="Manage Users" para="In userCollection there are users with role admin,taskCreator and workers. In this admin manage user admin can delete user and can update the users role."></HomeTitle>
            </div>
        <div className="mx-20 mb-20">
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th className="text-lg  text-center text-primary">Display Name</th>
                <th className="text-lg  text-center text-primary">User Email</th>
                <th className="text-lg  text-center text-primary">Photo URL</th>
                <th className="text-lg  text-center text-primary">Role</th>
                <th className="text-lg  text-center text-primary">Coin</th>
                <th  className="text-lg text-center  text-primary">
                    buttons
                </th>
              </tr>
            </thead>
            <tbody>
            {
                 users.map((user, index) => (
                     <tr key={user._id}>
                         <td className="text-center mx-auto">{index + 1}</td>
                         <td className="text-center">{user.name}</td>
                         <td className="text-center">{user.email}</td>
                         <td className="text-center px-5"  style={{ maxWidth: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}><div>{user.photo}</div></td>
                         <td className="text-center">{user.role}</td>
                         <td className="text-center">{user.coins}</td>
                         <td className="text-center justify-center items-center space-x-4 flex">
                           <button className="btn btn-primary" onClick={() => handleRemoveUser(user._id)}>Remove User</button>
                           <button className="btn btn-primary" onClick={() => openRoleUpdateModal(user)}>Update Role</button>
                         </td>
                     </tr>
                 ))
            } 
            </tbody>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Update User Role</h2>
                        <form>
                            <div className="mb-4">
                                <label htmlFor="role" className="block text-gray-700">Role</label>
                                <select
                                    name="role"
                                    value={newRole}
                                    onChange={(e) => setNewRole(e.target.value)}
                                    className="w-full px-3 py-2 border rounded"
                                >
                                    <option value="Admin">Admin</option>
                                    <option value="taskCreator">Task-Creator</option>
                                    <option value="worker">Worker</option>
                                </select>
                            </div>
                        </form>
                        <div className="flex justify-end">
                            <button className="btn bg-gray-500 text-white px-4 py-2 rounded mr-2" onClick={() => setIsModalOpen(false)}>Close</button>
                            <button className="btn bg-blue-500 text-white px-4 py-2 rounded" onClick={handleRoleUpdate}>Save Changes</button>
                        </div>
                    </div>
                </div>
            )}
          </table>
        </div>
            </div>
        </div>
        </>
    )
};
export default AdminManageUsers;