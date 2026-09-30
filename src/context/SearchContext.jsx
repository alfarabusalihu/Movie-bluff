import React, { createContext, useContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const SearchContext = createContext({
  searchInput: '',
  setSearchInput: () => {},
  clearSearch: () => {},
});

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const [lastSavedQuery, setLastSavedQuery] = useLocalStorage('lastSearchedMovie', '');
  const [searchInput, setSearchInput] = useState(lastSavedQuery || '');

  const clearSearch = () => {
    setSearchInput('');
    setLastSavedQuery('');
  };

  return (
    <SearchContext.Provider
      value={{
        searchInput,
        setSearchInput,
        clearSearch,
        setLastSavedQuery,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
