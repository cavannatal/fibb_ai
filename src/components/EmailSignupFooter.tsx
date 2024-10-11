import React from 'react';
import { ArrowRight, Camera } from 'lucide-react';

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => (
  <button
    className="inline-flex items-center justify-center h-12 w-full rounded-md border border-transparent bg-[#f79302] px-4 py-2 text-sm font-medium text-[#084248] hover:bg-[#084248] hover:text-[#efedea] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#f79302] focus:ring-offset-2"
    {...props}
  >
    {children}
  </button>
);

const EmailSignupFooter: React.FC = () => {
  return (
    <div className="w-full max-w-md mx-auto text-center bg-[#f7f7f5] p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-3 text-[#084248]"
        style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
      >Stay Connected</h2>
      <p className="text-sm text-[#084248]/80 mb-5">Join our community for exclusive updates and offers.</p>
      <div className="mb-4">
        {/* Email input and subscribe button are commented out
        <div className="relative mb-4">
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
        <Button type="submit" className="mb-4">
          Subscribe <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        */}
        <Button 
          onClick={() => window.open('https://zzei5gp6bbz.typeform.com/to/zpb2ae6s', '_blank')} 
          type="button"
        >
          <Camera className="mr-2 h-5 w-5" /> ACL Photos <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <p className="text-xs text-[#084248]/70 mt-4">
        By clicking, you agree to our <a href="/terms-of-service" className="underline hover:text-[#f79302]">Terms of Service</a> and <a href="/privacy-policy" className="underline hover:text-[#f79302]">Privacy Policy</a>.
      </p>
    </div>
  );
};

export default EmailSignupFooter;