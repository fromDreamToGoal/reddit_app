import React, { createContext, useState, useContext } from 'react';

const SubredditContext = createContext();

export const SubredditProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(true);
  const toggleVisibility = () => setIsVisible((prev) => !prev);

  return (
    <SubredditContext.Provider value={{ isVisible, toggleVisibility }}>
      {children}
    </SubredditContext.Provider>
  );
};

export const useSubredditVisibility = () => useContext(SubredditContext);