import React from 'react';
import { motion } from 'framer-motion';

interface SubscriptionSwitchProps {
  isYearly: boolean;
  onToggle: () => void;
}

const SubscriptionSwitch: React.FC<SubscriptionSwitchProps> = ({ isYearly, onToggle }) => {
  return (
    <motion.div
      className="w-64 h-12 bg-gray-700 rounded-full p-1 cursor-pointer flex items-center relative"
      onClick={onToggle}
    >
      <motion.div
        className="w-32 h-10 bg-gradient-to-r from-red-500 to-blue-600 rounded-full absolute"
        layout
        transition={{
          type: "spring",
          stiffness: 700,
          damping: 30
        }}
        style={{ left: isYearly ? 'calc(50% - 2px)' : '2px' }}
      />
      <div className="w-full h-full flex items-center justify-around relative z-10">
        <span 
          className={`text-sm font-medium transition-colors duration-300 ${
            isYearly ? 'text-white' : 'text-white hover:text-white'
          }`}
        >
          Monthly
        </span>
        <span 
          className={`text-sm font-medium transition-colors duration-300 ${
            isYearly ? 'text-white' : 'text-white hover:text-white'
          }`}
        >
          Annually
        </span>
      </div>
    </motion.div>
  );
};

export default SubscriptionSwitch;