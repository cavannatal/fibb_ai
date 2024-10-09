import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onToggle }) => {
  return (
    <motion.div 
      className="border-b border-[#cbf59a] last:border-b-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <button
        className="w-full py-4 px-4 flex justify-between items-center text-left focus:outline-none"
        onClick={onToggle}
      >
        <span className="font-medium text-xl text-[#cbf59a]" style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}>{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-[#cbf59a]" />
        ) : (
          <ChevronDown className="w-5 h-5 text-[#cbf59a]" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 pb-4 text-xl text-white" style={{ fontFamily: '"Font1", sans-serif' }}>{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

interface FAQComponentProps {
  faqs: FAQ[];
}

const FAQComponent: React.FC<FAQComponentProps> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQComponent;