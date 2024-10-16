import React, { useState } from 'react';
import { ArrowRight, Mail } from 'lucide-react';

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => (
  <button
    className="inline-flex items-center justify-center h-10 rounded-r-md bg-[#f79302] px-4 text-sm font-medium text-[#084248] hover:bg-[#084248] hover:text-[#efedea] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#f79302] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
    {...props}
  >
    {children}
  </button>
);

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input
    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-l-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-[#f79302] focus:border-[#f79302] sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
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
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred while subscribing');
      }

      // Use the presigned URL to upload the email to S3
      const uploadResponse = await fetch(data.uploadUrl, {
        method: 'PUT',
        body: email,
        headers: { 'Content-Type': 'text/plain' },
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to complete subscription process');
      }

      setMessage('Subscribed successfully!');
      setEmail('');
    } catch (error) {
      console.error('Subscription error:', error);
      setMessage(`Error: ${error instanceof Error ? error.message : 'An unexpected error occurred'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="w-full max-w-md mx-auto text-center bg-[#f7f7f5] p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-3 text-[#084248] font-['Sofia_Pro_Bold',sans-serif]">
        Stay Connected
      </h2>
      <p className="text-sm text-[#084248]/80 mb-5">
        Join our community for exclusive updates and offers.
      </p>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex">
          <div className="relative flex-grow">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#084248]/60 pointer-events-none" />
            <Input
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={isLoading}
              aria-label="Email address"
            />
          </div>
          <Button type="submit" disabled={isLoading} aria-label="Subscribe">
            {isLoading ? 'Subscribing...' : (
              <>
                Subscribe <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </>
            )}
          </Button>
        </div>
      </form>
      {message && (
        <p className="text-sm text-[#084248] mt-2" role="alert">
          {message}
        </p>
      )}
      <p className="text-xs text-[#084248]/70 mt-4">
        By subscribing, you agree to our{' '}
        <a href="/terms-of-service" className="underline hover:text-[#f79302]">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="/privacy-policy" className="underline hover:text-[#f79302]">
          Privacy Policy
        </a>
        .
      </p>
    </footer>
  );
};

export default EmailSignupFooter;