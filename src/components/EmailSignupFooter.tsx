import React, { useState } from 'react';
import { API } from 'aws-amplify';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const EmailSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('idle');

    try {
      const response = await API.post('yourApiName', '/subscribe', {
        body: {
          email,
          listId: 'CavinOrCesarFILLMEIN',
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
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full max-w-md">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="flex-grow"
        />
        <Button type="submit" className="w-full sm:w-auto">
          Subscribe
        </Button>
      </form>
      {status === 'success' && (
        <Alert variant="default" className="mt-4 w-full max-w-md">
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>
            You've been successfully subscribed to our updates!
          </AlertDescription>
        </Alert>
      )}
      {status === 'error' && (
        <Alert variant="destructive" className="mt-4 w-full max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            There was a problem subscribing you. Please try again later.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default EmailSignup;