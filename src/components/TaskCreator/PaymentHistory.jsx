import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/Context";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import HomeTitle from "../Shared/HomeTitle/HomeTitle";

const PaymentHistory = () =>{
    const {user} = useContext(AuthContext);
    const axiosSecure=useAxiosSecure();
    const [history,setHistory]=useState([]);
    useEffect(() => {
        const fetchtasks = async() =>{
            if (user) {
                const res = await axiosSecure.get(`/payments/${user.email}`);
                setHistory(res.data);
            }
        }
        fetchtasks();
    }, [axiosSecure,user]);
    return(
        <>
            <div>
                <HomeTitle title='Payment History' para='Here presenting the purchase history of coins of task creators.'></HomeTitle>
            </div>
            <div className="mx-20 mb-20">
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th className="text-lg  text-center text-primary">Name</th>
                <th className="text-lg  text-center text-primary">Email</th>
                <th className="text-lg  text-center text-primary">Payment Date</th>
                <th className="text-lg  text-center text-primary">Purchased Coin</th>
                <th className="text-lg  text-center text-primary">Amount payed</th>
              </tr>
            </thead>
            <tbody>
            {
                 history.map((task, index) => (
                     <tr key={task._id}>
                         <td className="text-center mx-auto">{index + 1}</td>
                         <td className="text-center">{task.name}</td>
                         <td className="text-center">{task.email}</td>
                         <td className="text-center">{task.current_date}</td>
                         <td className="text-center">{task.coin_purchase}</td>
                         <td className="text-center">{task.amount}</td>
                     </tr>
                 ))
            }
            </tbody>
            </table>
            </div>
            </div>
        </>
    )
}
export default PaymentHistory;