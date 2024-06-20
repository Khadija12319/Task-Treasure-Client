import { useContext, useEffect, useState } from "react";
import HomeTitle from "../Shared/HomeTitle/HomeTitle"
import { AuthContext } from "../../Context/Context";
import useAxiosCoins from "../Hooks/useAxiosCoins";
import { PiCoinBold } from "react-icons/pi";
import { MdPendingActions } from "react-icons/md";
import { FaDollarSign } from "react-icons/fa";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AdminHome = () =>{
    const axiosSecure=useAxiosSecure();
    const [users,setUsers]=useState([]);
    const [oneuser,setOneUser]=useState();
    const [totalCoins, setTotalCoins] = useState(0);
    const [withdraws,setWithdraws]=useState([]);
    const [totalPayment, setTotalPayment] = useState(0); 

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const res = await axiosSecure.get('/users');
            setUsers(res.data);

            const payment = await axiosSecure.get('/payments');
            
            const withdraw= await axiosSecure.get('/withdraws');
            setWithdraws(withdraw.data);

        const coinsData = res.data.map(user => user.coins);
        const totalCoins = coinsData.reduce((acc, coins) => acc + coins, 0);
        setTotalCoins(totalCoins);

        const paymentsData = payment.data.map(payments => payments.amount);
        const totalpayment = paymentsData.reduce((acc, amount) => acc + amount, 0);
        setTotalPayment(totalpayment);
          } catch (error) {
            console.error("Error fetching users:", error);
          }
        };
    
        fetchUsers();
      }, [axiosSecure]);
      
      const handlePaymentSuccess = async (draw) => {
        try {
          // Delete the withdrawal request from the collection
         await axiosSecure.delete(`/withdraws/${draw._id}`);
          // Update submission status to "approve" in the submission collection
      const res=await axiosSecure.get(`/users/${draw.worker_email}`);
      setOneUser(res.data);

      const coinss=res.data[0].coins;
      const rescoin= parseInt(coinss-draw.withdraw_coin);
      console.log(rescoin);

    await axiosSecure.put(`/users/${draw.worker_email}`, { coins: rescoin });
      // Show success message
      Swal.fire({
          icon: 'success',
          title: 'Withdraw!',
          text: 'Withdraw is sucessful.',
          showConfirmButton: false,
          timer: 1500
      });
          // Update local state after successful deletion
        setWithdraws(withdraws.filter(request => request._id !== draw._id));

        } catch (error) {
          console.error("Error processing payment:", error);
        }
      };





    return(
        <>
             <div>
                <HomeTitle title="states" para="Available coins,pending tasks and total payment that is paid by user is presented in this section."></HomeTitle>
            </div>

            <div>
            <div className="stats w-full justify-evenly mb-10">
  
  <div className="stat">
    <div className="stat-figure text-primary">
      <PiCoinBold className="inline-block w-8 h-8 stroke-current"/>
    </div>
    <div className="stat-title">Total Users</div>
    <div className="stat-value text-primary">{users.length}</div>
    <div className="stat-desc">Available Now</div>
  </div>
  
  <div className="stat">
    <div className="stat-figure text-secondary">
      <MdPendingActions className="inline-block w-8 h-8 stroke-current"/>
    </div>
    <div className="stat-title">Total Coins</div>
    <div className="stat-value text-secondary">{totalCoins}</div>
    <div className="stat-desc">Available</div>
  </div>
  
  <div className="stat">
    <div className="stat-figure text-secondary">
        <FaDollarSign className="inline-block w-8 h-8 stroke-current"/>
      
    </div>
    <div className="stat-value">{totalPayment}</div>
    <div className="stat-title">Total Payment</div>
    <div className="stat-desc text-secondary">Paid</div>
  </div>
  
</div>
            </div>

            <div>
                <HomeTitle title="Task To Review" para="The tasks that are submitted by the workers will be reviewed by the Task Creator. Task Creator will review those task and give them the points achieved by the workers."></HomeTitle>
            </div>
        <div className="mx-20 mb-20">
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th className="text-lg  text-center text-primary">Worker Name</th>
                <th className="text-lg  text-center text-primary">Withdraw Coin</th>
                <th className="text-lg  text-center text-primary">Withdraw Amount</th>
                <th className="text-lg  text-center text-primary">Payment Number</th>
                <th className="text-lg  text-center text-primary">Payment System</th>
                <th  className="text-lg text-center  text-primary">Withdraw Time</th>
                <th  className="text-lg text-center  text-primary">
                    button
                </th>
              </tr>
            </thead>
            <tbody>
            {
                 withdraws.map((withdraw, index) => (
                     <tr key={withdraw._id}>
                         <td className="text-center mx-auto">{index + 1}</td>
                         <td className="text-center">{withdraw.worker_name}</td>
                         <td className="text-center">{withdraw.withdraw_coin}</td>
                         <td className="text-center">{withdraw.withdraw_amount}</td>
                         <td className="space-x-5 text-center">{withdraw.account_number}</td>
                         <td className="text-center">{withdraw.payment_system}</td>
                         <td className="text-center space-x-4">
                           {withdraw.withdraw_time}
                         </td>
                         <td className="text-center space-x-4">
                           <button className="btn btn-primary" onClick={() => handlePaymentSuccess(withdraw)}>Payment Success</button>
                         </td>
                     </tr>
                 ))
            } 
            </tbody>
          </table>
        </div>
            </div>
            
        </>
    )
};
export default AdminHome;