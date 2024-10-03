import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const EmailSignupFooter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('idle');

    try {
      // Replace this with your actual API call to subscribe the user
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
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
          <Alert variant="default" className="mt-4">
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
              You've been successfully subscribed to our updates!
            </AlertDescription>
          </Alert>
        )}
        {status === 'error' && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              There was a problem subscribing you. Please try again later.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </footer>
  );
};

export default EmailSignupFooter;