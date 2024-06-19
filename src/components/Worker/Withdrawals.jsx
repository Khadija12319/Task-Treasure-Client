import { useContext, useEffect, useState } from "react";
import HomeTitle from "../Shared/HomeTitle/HomeTitle";
import { AuthContext } from "../../Context/Context";
import useAxiosCoins from "../Hooks/useAxiosCoins";
import moment from "moment";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Withdrawals = () =>{
    const {user} =useContext(AuthContext);
    const [coins,refetch]= useAxiosCoins();
    const [coin,setCoin]=useState(0);
    const [coinwithdraw,setWithDraw]=useState(0);
    const [withdrawamount,setWithdrawAmount]=useState();
    const axiosSecure = useAxiosSecure();
    const [userId,setUserId]=useState();
    const [remaining,setRemaining]=useState(0);
    
    useEffect(() => {
        const fetchCoins = async () => {
          if (user) {
            await refetch();
            // Assuming coins is an array and you want to set coin based on some condition or logic
            if (coins && coins.length > 0) {
                const coinData = coins[0];
              // Example logic to set coin, you can adjust based on your requirements
                setCoin(coinData.coins);
                setUserId(coinData._id);
            }
          }
        };
    
        fetchCoins();
      }, [coins,refetch,user,coin]);

      useEffect(() => {
        if (coin) {
          const divide = (coin / 20).toFixed(0);
          setWithDraw(parseInt(divide));
        }
      }, [coin]);

      console.log(coin,coinwithdraw)
      
      const handleCoinChange = (e) => {
        const coin_withdraw = parseInt(e.target.value);
        if(coin>coin_withdraw){
            const maxWithdrawAmount = Math.floor(coin_withdraw / 20);
            const withdrawAmount = Math.min(coin_withdraw, maxWithdrawAmount);
            setWithdrawAmount(parseInt(withdrawAmount) || 0);
            setRemaining(coin-(withdrawAmount*20));
        }
        else{
            alert('you must give an amount from the coin you have');
        }
      };
      
    const handleSubmit = async(e) =>{
        e.preventDefault();
        const formData=new FormData(e.target);
        const coin_withdraw=formData.get('coin_withdraw');
        const withdraw_amount=formData.get('withdraw_amount');
        const withdraw_coin=parseInt(withdraw_amount*20);
        const payment_system=formData.get('payment_system');
        const account=formData.get('account');
        const worker_email=user.email;
        const worker_name=user?.displayName;
        const current_time=moment().format('LTS');

        const formdata=
        {worker_email:worker_email,
        worker_name:worker_name,
        withdraw_coin:withdraw_coin,
        withdraw_amount:parseInt(withdraw_amount),
        payment_system:payment_system,
        withdraw_time:current_time};

        if(coin<coin_withdraw){
            alert('you must give an amount from the coin you have');
        }else {
            const swalWithBootstrapButtons = Swal.mixin({
              customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
              },
              buttonsStyling: false
            });
            swalWithBootstrapButtons.fire({
              title: "Are you sure to add the withdraw data?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "Yes, Add it!",
              cancelButtonText: "No, cancel!",
              reverseButtons: true
            }).then(async (result) => { // Make the callback function async
              if (result.isConfirmed) {
                try {
                  const res = await axiosSecure.post('/withdraws', formdata);
                  if (res.data.insertedId) {
                    console.log('withdraw added to the database');
                    if (userId) {
                      const newCoins = parseInt(remaining); // Correct points calculation
                      const point = { coins: newCoins };
                      const updateRes = await fetch(`http://localhost:5000/users/${userId}`, {
                        method: 'PUT',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(point)
                      });
                      const data = await updateRes.json();
                      console.log(data);
                      refetch();
                    }
                  }
                  swalWithBootstrapButtons.fire({
                    title: "Added!",
                    text: "Your Withdraw history has been Added to the Server.",
                    icon: "success"
                  });
                } catch (error) {
                  console.error('Error:', error);
                  swalWithBootstrapButtons.fire({
                    title: "Error!",
                    text: "Something went wrong. Please try again later.",
                    icon: "error"
                  });
                }
              } else if (
                result.dismiss === Swal.DismissReason.cancel
              ) {
                swalWithBootstrapButtons.fire({
                  title: "Cancelled!",
                  text: "Your information is not added)",
                  icon: "error"
                });
              }
            });
          }

    }

    return(
        <>
        <div>
            <HomeTitle title="Withdrawals" para="Here worker can withdraw their money through Bkash, Rocket and Nagad. Withdraw the money that you achieved through the coins."></HomeTitle>
        </div>
        <div className="w-[80%] mx-auto my-10">
            <div><h1 className="text-3xl text-center text-primary font-bold mb-10">Maximum With DrawAmount: {coinwithdraw} $</h1></div>
            <form className="w-[100%]" onSubmit={handleSubmit}>
                <div className="flex gap-6 justify-between mb-4">
                    <div className="flex flex-col gap-3 w-full">
                        <label>Coin To WithDraw</label>
                        <input type="text" placeholder="Coin to Withdraw" name="coin_withdraw" className="input input-bordered w-full" onChange={handleCoinChange}/>
                    </div>
                    <div className="flex flex-col gap-3 w-full">
                        <label>Withdraw Amount</label>
                        <input type="text" defaultValue={withdrawamount} readOnly name="withdraw_amount" className="input input-bordered w-full" />
                    </div>
                </div>
                <div className="flex gap-6 justify-between">
                    <div className="flex flex-col gap-3 w-full">
                        <label>Select Payment System</label>
                        <select
                className="input select select-bordered w-full" name="payment_system"
                required
              >
                <option disabled selected>Payment system choose</option>
                <option value="Bkash">Bkash</option>
                <option value="Rocket">Rocket</option>
                <option value="Nagad">Nagad</option>
              </select>
                    </div>
                    <div className="flex flex-col gap-3 w-full">
                        <label>Account Number</label>
                        <input type="number" placeholder="Account Number" name="account" className="input input-bordered w-full" />
                    </div>
                </div>

                <div className="flex justify-center items-center">
                    <button className="btn btn-primary mt-10">Withdraw</button>
                </div>
            </form>
        </div>
        </>
    )
}
export default Withdrawals;