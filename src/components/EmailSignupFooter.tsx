import React, { useState } from 'react';
import { post } from 'aws-amplify/api';
import { AlertCircle, CheckCircle2, Mail, ArrowRight } from 'lucide-react';

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input
    className="flex h-12 w-full rounded-l-md border border-[#bddde2] bg-[#efedea] px-3 py-2 pl-10 text-sm text-[#084248] placeholder-[#084248]/60 focus:outline-none focus:ring-2 focus:ring-[#f79302] focus:border-transparent"
    {...props}
  />
);

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => (
  <button
    className="inline-flex items-center justify-center h-12 rounded-r-md border border-transparent bg-[#084248] px-4 py-2 text-sm font-medium text-[#efedea] hover:bg-[#f79302] hover:text-[#084248] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#f79302] focus:ring-offset-2"
    {...props}
  >
    {children}
  </button>
);

const Alert: React.FC<React.HTMLAttributes<HTMLDivElement> & { variant?: 'default' | 'destructive' }> = ({ 
  children, 
  variant = 'default', 
  className,
  ...props 
}) => (
  <div
    role="alert"
    className={`flex items-center p-4 mb-4 text-sm rounded-lg ${
      variant === 'destructive'
        ? 'text-[#ed3f2e] bg-[#efedea] border border-[#ed3f2e]'
        : 'text-[#084248] bg-[#cbf59a] border border-[#084248]'
    } ${className}`}
    {...props}
  >
    {children}
  </div>
);

const EmailSignupFooter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('idle');

    try {
      const response = await post({
        apiName: 'yourApiName',
        path: '/subscribe',
        options: {
          body: {
            email,
            listId: 'CavinOrCesarFILLMEIN',
          }
        }
      });

      console.log('Subscription successful:', response);
      setStatus('success');
      setEmail('');
    } catch (error) {
      console.error('Error during subscription:', error);
      setStatus('error');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto text-center">
      <h2 className="text-2xl font-bold mb-2 text-[#084248]">Stay Connected</h2>
      <p className="text-sm text-[#084248]/80 mb-4">Join our community for exclusive updates and offers.</p>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex">
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
            />
          </div>
          <Button type="submit">
            Subscribe <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
      {status === 'success' && (
        <Alert variant="default" className="text-left">
          <CheckCircle2 className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className="sr-only">Success</span>
          <div>
            <span className="font-medium">Success!</span> You're now part of our community.
          </div>
        </Alert>
      )}
      {status === 'error' && (
        <Alert variant="destructive" className="text-left">
          <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className="sr-only">Error</span>
          <div>
            <span className="font-medium">Oops!</span> Something went wrong. Please try again.
          </div>
        </Alert>
      )}
      <p className="text-xs text-[#084248]/70 mt-2">
        By subscribing, you agree to our <a href="/terms-of-service" className="underline hover:text-[#f79302]">Terms of Service</a> and <a href="/privacy-policy" className="underline hover:text-[#f79302]">Privacy Policy</a>.
      </p>
    </div>
  );
};

export default EmailSignupFooter;