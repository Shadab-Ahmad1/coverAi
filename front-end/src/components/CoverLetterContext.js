import React, { createContext, useContext, useState } from 'react';

const CoverLetterContext = createContext();

export function useCoverLetterContext() {
  return useContext(CoverLetterContext);
}

export function CoverLetterProvider({ children }) {
  const [coverLetters, setCoverLetters] = useState([]);

  const addCoverLetter = (coverLetter) => {
    setCoverLetters([...coverLetters, coverLetter]);
  };

  return (
    <CoverLetterContext.Provider value={{ coverLetters, addCoverLetter }}>
      {children}
    </CoverLetterContext.Provider>
  );
}
