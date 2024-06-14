import axios from "axios";
import { useState } from "react";
import HomeTitle from "../Shared/HomeTitle/HomeTitle";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";


const Purchase = () =>{
    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [clientSecret, setClientSecret] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    const handlePurchase = (coins, price) => {
        setSelectedPackage({ coins, price });
        setModalOpen(true);
    };
    const handleCloseModal = ()=>{
        setModalOpen(false);
    }
  

    return(
        <>
        <div className="mx-20 mb-20">
            <HomeTitle title="Purchase Coin" para="Taskcreator can purchase coin from here if their coin is decreased because of task creation for worker. Choose your best deal."></HomeTitle>
            {/* <Elements stripe={stripePromise}>
              <CheckoutForm selectedPackage={selectedPackage} clientSecret={clientSecret} />
            </Elements> */}
      <div className="grid grid-cols-4 gap-5">
        <div className="bg-[#8697C4] p-6 space-y-4 flex flex-col items-center justify-center rounded-3xl">
          <p className="text-xl font-bold">10 Coins - $1</p>
           <button onClick={() => handlePurchase(10,1)} className="btn font-bold">Purchase</button>
          
          
        </div>
        <div className="bg-[#8697C4] p-6 space-y-4 flex flex-col items-center justify-center rounded-3xl">
          <p className="text-xl font-bold">100 Coins - $9</p>
        <button onClick={() => handlePurchase(100, 9 )} className="btn font-bold">Purchase</button>
        </div>
        <div className="bg-[#8697C4] p-6 space-y-4 flex flex-col items-center justify-center rounded-3xl">
          <p className="text-xl font-bold">500 Coins - $19</p>
          <button onClick={() => handlePurchase(500, 19 )} className="btn font-bold">Purchase</button>
          
        </div>
        <div className="bg-[#8697C4] p-6 space-y-4 flex flex-col items-center justify-center rounded-3xl">
          <p className="text-xl font-bold">1000 Coins - $39</p>
          <button onClick={() => handlePurchase(1000,39 )} className="btn font-bold">Purchase</button>
          
        </div>
      </div>
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-[50%]">
            <h2 className="text-xl font-bold mb-4">Payment Form</h2>
            <Elements stripe={stripePromise}>
              <CheckoutForm coin={selectedPackage.coins} price={selectedPackage.price} />
            </Elements>
            <button className="btn btn-primary mt-5" onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}

    </div>
        </>
    )
}

export default Purchase;