import React, { useEffect } from 'react';
import '../../styles/payment.css';


const loadScript = (src) =>{

    return new Promise( (resolve) =>{
      const script = document.createElement('script')
      script.src = src
      script.onload = () =>{
        resolve(true)
      }
      
      script.onerror = ()=>{
        resolve(false)
      }
      document.body.appendChild(script)
   
    } )
  }

const Payment = () => {
    const plans = [
        { title: '1 Post per Day', amount: 300 },
        { title: '3 Posts per Day', amount: 1000 },
        { title: '5 Posts per Day', amount: 1500 }
    ];



  const handleRazorpay = async( amount )=>{

    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
    if(!res)
    {
      alert("razorpay failed to load")
      return
    }

    const options = {
      key: "rzp_test_Y0GEFOcP1VvbJb",
      amount: amount.toString(),
      currency: 'INR',
      name: "Himangshu",
      description: "Test Transaction",
      order_id: "order_MPt1x1obZUhg4Z",
      handler: async function (response) {
        console.log(response.razorpay_payment_id)
        // console.log(response.razorpay_order_id)
        console.log(response.razorpay_signature)
      },
      prefill: {
          name: "Himangshu ",
          email: "baishyahimangshu@gmail.com",
          contact: "8638281845",
      }
  };

  const rzp = new window.Razorpay(options)
  rzp.open()
}


    return (
        <div className="payment-container">
            <div className="payment-details">
                <p>Get unlimited access to everything on Medium</p>
                <p>Plans starting at less than $1/day. Cancel anytime.</p>
                <ul>
                    <li><i class="bi bi-check"></i> No ads</li>
                    <li> <i class="bi bi-check"></i>Listen to any story</li>
                    <li><i class="bi bi-check"></i>Support quality writing</li>
                    <li><i class="bi bi-check"></i>Access on any device</li>
                    <li><i class="bi bi-check"></i>Read offline with the Medium app</li>
                    <li><i class="bi bi-check"></i>Create your own publications</li>
                    <li><i class="bi bi-check"></i>Mastodon account</li>
                </ul>
            </div>
            <div className='card-pay'>
            {plans.map((plan, index) => (
                <div className="payment-card" key={index}>
                    <h2 className="payment-card-title">{plan.title}</h2>
                    <p className="payment-amount font-bold">${plan.amount/100}/week</p>
                    <button className="pay-button bg-green-500" onClick={(e) => {handleRazorpay(plan.amount)}} >Pay Now</button>
                </div>
            ))}
            </div>
        </div>
    );
};

export default Payment;



