import React, { createContext, useContext, useState, useEffect } from 'react';

const KeepsakeContext = createContext();

export const useKeepsakes = () => useContext(KeepsakeContext);

export const KeepsakeProvider = ({ children }) => {
  const [keepsakes, setKeepsakes] = useState(() => {
    const saved = localStorage.getItem('gunnn_keepsakes');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('gunnn_keepsakes', JSON.stringify(keepsakes));
  }, [keepsakes]);

  const addKeepsake = (id, name, icon) => {
    if (!keepsakes.find(k => k.id === id)) {
      setKeepsakes(prev => [...prev, { id, name, icon, dateUnlocked: Date.now() }]);
      return true; // Newly added
    }
    return false; // Already exists
  };

  const hasKeepsake = (id) => keepsakes.some(k => k.id === id);

  return (
    <KeepsakeContext.Provider value={{ keepsakes, addKeepsake, hasKeepsake }}>
      {children}
    </KeepsakeContext.Provider>
  );
};
