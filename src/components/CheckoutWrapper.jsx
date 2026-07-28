'use client';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Checkout from './Checkout';
import OrderTracking from './OrderTracking';

export default function CheckoutWrapper() {
  const [stage, setStage] = useState('idle'); // 'idle' | 'checkout' | 'tracking'
  const [orderNum, setOrderNum] = useState(null);

  const handleCheckoutDone = (num) => {
    setOrderNum(num);
    setStage('tracking');
  };

  // Expose a global function for Cart to trigger checkout
  // Must be in useEffect to avoid SSR issues and Fast Refresh loops
  useEffect(() => {
    window.__showCheckout = () => setStage('checkout');
    return () => { delete window.__showCheckout; };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {stage === 'checkout' && (
        <motion.div key="checkout"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <Checkout onDone={handleCheckoutDone} />
        </motion.div>
      )}
      {stage === 'tracking' && (
        <motion.div key="tracking"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <OrderTracking orderNumber={orderNum} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
