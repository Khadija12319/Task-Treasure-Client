import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from 'react';
import { AuthContext } from '../../Context/Context';

const useAxiosCoins= () =>{
    const axiosSecure = useAxiosSecure();
    const {user} = useContext(AuthContext);
    const {refetch, data: coin=[] }=useQuery({
        queryKey:['coins',user?.email],
        queryFn: async() => {
            const res =await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    })
    
    return [coin,refetch]
};

export default useAxiosCoins;