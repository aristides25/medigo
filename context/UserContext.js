import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    name: 'José Daniel',
    email: 'jose.daniel@email.com',
    phone: '+507 6123-4567',
    bloodType: 'O+',
    weight: '75 kg',
    height: '175 cm',
  });

  const updateUserInfo = (newInfo) => {
    setUserInfo(prevInfo => ({
      ...prevInfo,
      ...newInfo
    }));
  };

  return (
    <UserContext.Provider value={{ userInfo, updateUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}; 