import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { AuthContext } from "../../Context/Context";
import useAxiosCoins from "../Hooks/useAxiosCoins";

const CheckoutForm= ({ coin, price}) =>{
    const [error,setError]=useState('');
    const [clientSecret,setClientSecret]=useState('');
    const [coins,refetch]= useAxiosCoins();
    const stripe = useStripe();
  const elements = useElements();
  const axiosSecure=useAxiosSecure();
  const {user}=useContext(AuthContext);
  const [success,setSuccess]=useState('');
  const [reward,setReward]=useState();
  const [userId,setUserId]=useState();

  useEffect(() => {
    const fetchData = async () => {
      if (coins && coins.length > 0) {
        try {
          const coinData = coins[0]; // Access the first element of the coins array
          await setReward(coinData.coins);
          await setUserId(coinData._id);
        } catch (error) {
          // Handle error
          console.error("Error fetching data:", error);
        }
      }
    };
  
    fetchData();
  
  }, [coins]);
  

  
  useEffect(()=>{
    axiosSecure.post('/create-payment-intent',{price})
    .then(res=>{
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
    })
    .catch(error => {
        console.error('Error creating payment intent:', error);
    });
  },[axiosSecure,price]);

    const handleSubmit= async(event)=>{
        event.preventDefault();

        if (!stripe || !elements) {
    
            return;
          }

          const card = elements.getElement(CardElement);

          if (card == null) {
            return;
          }
          const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
          });
          if(error){
            console.log('payment error',error);
            setError(error.message);
          }
          else{
            console.log('payment method',paymentMethod);
            setError('');
          }
        //confirm payment
        const {paymentIntent,error:confirmError}=await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card: card,
                billing_details:{
                    email:user?.email,
                    name:user?.displayName
                }
            }
        })
        if(confirmError){
            console.log('confirm error')
        }
        else{
            console.log('PaymentIntent: ',paymentIntent);
            if(paymentIntent.status==='succeeded'){
                setSuccess('Payment Completed');

                //now save the payment in the database
                const payment={
                    email:user.email,
                    name:user.displayName,
                    current_date:new Date(),
                    coin_purchase:coin,
                    amount:price
                }
                const res=await axiosSecure.post('/payments',payment)
                if(userId){
                  const newCoins = parseInt(reward+coin); // Correct points calculation
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
        }
    }
    return(
    <>
        <form onSubmit={handleSubmit}>
        <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button type="submit" className="btn btn-primary my-2" disabled={!stripe || !clientSecret }>
        Pay
      </button>
      <p className="text-green-500 text-xl">{success}</p>
      <p className="text-red-600">{error}</p>
        </form>
    </>
    )
}
export default CheckoutForm;
