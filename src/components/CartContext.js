'use client';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CartContext = createContext(null);

const DELIVERY_FEE = 3.50;
const TAX_RATE = 0.0875; // 8.75% NYC tax

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('velvetbean_cart');
      if (saved) setItems(JSON.parse(saved));
    } catch (_) {}
  }, []);

  // Persist on every change
  useEffect(() => {
    try {
      localStorage.setItem('velvetbean_cart', JSON.stringify(items));
    } catch (_) {}
  }, [items]);

  const addItem = useCallback((product) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  }, []);

  const removeItem = useCallback((id) => {
    setItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const updateQty = useCallback((id, qty) => {
    if (qty < 1) return;
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + (subtotal > 0 ? DELIVERY_FEE : 0) + tax;
  const totalItems = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQty,
      clearCart,
      subtotal,
      tax,
      deliveryFee: DELIVERY_FEE,
      total,
      totalItems,
      isOpen,
      setIsOpen,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
