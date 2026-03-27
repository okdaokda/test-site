import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SubscriptionContextType {
  isSubscribed: boolean;
  subscribe: () => Promise<void>;
  restorePurchase: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType>({
  isSubscribed: false,
  subscribe: async () => {},
  restorePurchase: async () => {},
});

const STORAGE_KEY = 'zenpulse_subscribed';

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((value) => {
      if (value === 'true') setIsSubscribed(true);
    });
  }, []);

  const subscribe = async () => {
    await new Promise((r) => setTimeout(r, 1000));
    setIsSubscribed(true);
    await AsyncStorage.setItem(STORAGE_KEY, 'true');
  };

  const restorePurchase = async () => {
    const value = await AsyncStorage.getItem(STORAGE_KEY);
    if (value === 'true') {
      setIsSubscribed(true);
    }
  };

  return (
    <SubscriptionContext.Provider value={{ isSubscribed, subscribe, restorePurchase }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export const useSubscription = () => useContext(SubscriptionContext);
