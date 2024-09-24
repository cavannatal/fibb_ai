import React from 'react';
import { motion } from 'framer-motion';

interface SubscriptionSwitchProps {
  isYearly: boolean;
  onToggle: () => void;
}

const SubscriptionSwitch: React.FC<SubscriptionSwitchProps> = ({ isYearly, onToggle }) => {
  return (
    <motion.div
      className="w-64 h-12 bg-gray-700 rounded-full p-1 cursor-pointer flex items-center"
      onClick={onToggle}
      style={{ justifyContent: isYearly ? 'flex-end' : 'flex-start' }}
    >
      <motion.div
        className="w-32 h-10 bg-gradient-to-r from-red-500 to-blue-600 rounded-full flex items-center justify-center"
        layout
        transition={{
          type: "spring",
          stiffness: 700,
          damping: 30
        }}
      >
        <span className="text-sm font-medium text-white">
          {isYearly ? 'Yearly' : 'Monthly'}
        </span>
      </motion.div>
    
    </motion.div>
  );
};

export default SubscriptionSwitch;