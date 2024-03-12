import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

const SearchBar = () => {
  const onSearch = (value) => {
    console.log('Search value:', value);
    // Perform search logic here
  };

  return (
    <div className="flex justify-center">
      <Search
        placeholder="Search..."
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
        className="w-full max-w-md"
      />
    </div>
  );
};

export default SearchBar;
