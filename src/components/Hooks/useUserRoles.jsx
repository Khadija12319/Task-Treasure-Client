import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../Context/Context";


const useUserRoles = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: users, isPending: isUsersLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const isAdmin = users?.some(u => u.email === user.email && u.role === 'Admin');
    const isTaskCreator = users?.some(u => u.email === user.email && u.role === 'taskCreator');
    const isWorker = users?.some(u => u.email === user.email && u.role === 'worker');

    return { isAdmin, isTaskCreator, isWorker, isUsersLoading };
};

export default useUserRoles;
