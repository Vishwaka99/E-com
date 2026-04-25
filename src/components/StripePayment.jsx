import React, { useState, useEffect } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { Button } from '@heroui/react';
import { Shield, AlertCircle } from 'lucide-react';

export default function StripePayment({ amount, onSuccess, onCancel }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      onSuccess(paymentIntent.id);
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
        <PaymentElement id="payment-element" options={{ layout: 'tabs' }} />
      </div>
      
      {message && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/50 flex items-center gap-2 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {message}
        </div>
      )}

      <div className="flex gap-3">
        <Button 
          variant="bordered" 
          className="border-white/20 text-gray-400" 
          onPress={onCancel}
          isDisabled={isLoading}
        >
          Back
        </Button>
        <Button
          fullWidth
          size="lg"
          className="bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold"
          type="submit"
          isLoading={isLoading}
          id="submit-payment"
        >
          {isLoading ? "Processing..." : `Pay LKR ${amount.toLocaleString()}`}
        </Button>
      </div>

      <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
        <Shield className="w-3 h-3 text-green-400" />
        <span>Secured by Stripe</span>
      </div>
    </form>
  );
}
