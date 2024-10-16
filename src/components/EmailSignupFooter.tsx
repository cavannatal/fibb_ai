import React, { useState } from 'react';
import { ArrowRight, Mail } from 'lucide-react';

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => (
  <button
    className="inline-flex items-center justify-center h-10 rounded-r-md bg-[#f79302] px-4 text-sm font-medium text-[#084248] hover:bg-[#084248] hover:text-[#efedea] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#f79302] focus:ring-offset-2"
    {...props}
  >
    {children}
  </button>
);

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input
    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-l-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-[#f79302] focus:border-[#f79302] sm:text-sm"
    {...props}
  />
);

const EmailSignupFooter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    try {
      const response = await fetch('https://wu9j4g3ps5.execute-api.us-east-2.amazonaws.com/prod/email-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMessage(data.message || 'Subscribed successfully!');
      setEmail('');
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error subscribing. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto text-center bg-[#f7f7f5] p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-3 text-[#084248]"
        style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
      >Stay Connected</h2>
      <p className="text-sm text-[#084248]/80 mb-5">Join our community for exclusive updates and offers.</p>
      <form onSubmit={handleSubmit}>
        <div className="flex mb-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Mail className="h-5 w-5 text-[#084248]/60" />
            </div>
            <Input
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={isLoading}
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Subscribing...' : (
              <>
                Subscribe <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </form>
      {message && <p className="text-sm text-[#084248] mt-2">{message}</p>}
      <p className="text-xs text-[#084248]/70 mt-4">
        By subscribing, you agree to our <a href="/terms-of-service" className="underline hover:text-[#f79302]">Terms of Service</a> and <a href="/privacy-policy" className="underline hover:text-[#f79302]">Privacy Policy</a>.
      </p>
    </div>
  );
};

export default EmailSignupFooter;