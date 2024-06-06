import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from 'react';
import { AuthContext } from '../../Context/Context';

const useAxiosTasks= () =>{
    const axiosSecure = useAxiosSecure();
    const {user} = useContext(AuthContext);
    const {refetch, data: task=[] }=useQuery({
        queryKey:['tasks',user?.email],
        queryFn: async() => {
            const res =await axiosSecure.get(`/tasks/${user.email}`);
            console.log(res.data);
            return res.data;
        },
        enabled: !!user?.email,
    })
    
    return [task,refetch]
};

export default useAxiosTasks;