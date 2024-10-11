import React, { useContext, useState, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CognitoContext } from '../../auth/CognitoProviderWithNavigate';
import awsconfig from '../../aws-exports';
import fibbLogo from '../../components/images/FibbLogoWhite.svg';
import { fetchTokenData } from '../Marketplace/TokenSystem/TokenCounter'; 

Amplify.configure(awsconfig);

const CreatePage: React.FC = () => {
  const { isAuthenticated } = useContext(CognitoContext);
  const navigate = useNavigate();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [fibbCount, setFibbCount] = useState(0); 
  
  useEffect(() => {
    setIsButtonDisabled(fibbCount <= 0);
  }, [fibbCount]);
  useEffect(() => {
    fetchTokenData().then(data => setFibbCount(data.fibbs));
  }, [fibbCount]);  
  console.log(fibbCount, "fibcount is",fibbCount);
  const handleButtonClick1 = () => {
    if (!isButtonDisabled) {
      navigate("/cam");
    }
  };

  const handleButtonClick2 = () => {
    navigate("/image-gen");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-[#093f48] to-[#004948] text-white">
      <header className="flex justify-center p-4">
        <img src={fibbLogo} alt="fibb.ai" className="h-8 sm:h-12 mt-4 sm:mt-6 mb-2 sm:mb-4" />
      </header>
      <main className="flex flex-col items-center flex-grow p-4 mt-16 sm:mt-64">
      <div className="flex flex-col md:flex-row gap-6 sm:gap-8 w-full max-w-3xl">
      <motion.button
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 10 }}
        transition={{ duration: 0.1, delay: 0.2 }}
        className={`flex-1 p-6 sm:p-8 rounded-lg transition-all duration-300 transform hover:scale-105 h-auto sm:h-80 flex flex-col justify-between ${
          isButtonDisabled 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-[#144a53] hover:bg-[#285a62]'
        }`}
        onClick={handleButtonClick1}
        disabled={isButtonDisabled}
      >
        <div>
          <h2 
            className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-16"
            style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
          >
            Create Your <span className='text-[#cbf59a]'>fibb</span>
          </h2>
              <p className="text-base sm:text-lg"
              style={{ fontFamily: '"Font1", sans-serif' }}
              >
               {isButtonDisabled 
              ? "You need more Fibbs to create. Please purchase more to continue."
              : "Go through our guided photo experience so we can learn what you look like. After the training is finished, you'll be able to bring your fibb to life."}
          </p>
            </div>
          </motion.button>
          <motion.button
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 10 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex-1 bg-[#144a53] p-6 sm:p-8 rounded-lg hover:bg-[#285a62] transition-all duration-300 transform hover:scale-105 h-auto sm:h-80 flex flex-col justify-between"
            onClick={handleButtonClick2}
          >
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-8"
              style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
              >Bring Your <span className='text-[#cbf59a]'>fibb</span> to Life</h2>
              <p className="text-base sm:text-lg"
              style={{ fontFamily: '"Font1", sans-serif' }}
              >
                When your fibb is finished, generate yourself wherever you want to be. If you can think it, we'll help you build it.
              </p>
            </div>
          </motion.button>
        </div>
      </main>
    </div>
  );
};

export default CreatePage;