import React from 'react';
import { FaUserPlus, FaTasks, FaGift, FaDollarSign } from 'react-icons/fa';// Import the CSS file

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUserPlus size={50} />,
      title: 'Register',
      description: 'Sign up for an account to get started and choose your role.',
    },
    {
      icon: <FaTasks size={50} />,
      title: 'Complete Tasks',
      description: 'Participate in various tasks and complete them successfully.',
    },
    {
      icon: <FaGift size={50} />,
      title: 'Earn Rewards',
      description: 'Receive rewards for your completed tasks and achievements.',
    },
    {
        icon:<FaDollarSign size={50} />,
        title:'Withdraw Money',
        description:'By selling reward workers can earn money through Bkash, Rocket and Nagad.'
    }
  ];

  return (
    <div className='pb-20'>
        <div className="bg-[#8697C4] py-10 px-10 rounded-xl">
      <div className="steps">
        {steps.map((step, index) => (
          <div key={index} className="step text-2xl">
            <div className="icon my-5">{step.icon}</div>
            <h3 className="step-title text-xl font-bold">{step.title}</h3>
            <p className="step-description px-8 text-lg">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default HowItWorks;
