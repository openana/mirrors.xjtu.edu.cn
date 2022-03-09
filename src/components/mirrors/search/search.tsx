import * as React from 'react';

import { BsFilter } from 'react-icons/bs';

const Search = () => {
  return (
    <label className="relative block group">
      <span className="sr-only">Search</span>
      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        <BsFilter className="h-4 w-4 transition-colors duration-500 fill-slate-300 group-hover:fill-slate-500" />
      </span>
      <span className="absolute inset-y-0 right-0 flex items-center pr-3">
        <span className="font-semibold text-xs transition-colors duration-500 text-slate-300 group-hover:text-slate-500">
          ⌘F
        </span>
      </span>
      <input
        className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-1 pl-7 pr-10 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
        placeholder="过滤全部镜像..."
        type="text"
        name="filter"
      />
    </label>
  );
};

export default Search;
