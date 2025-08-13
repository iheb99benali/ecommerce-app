import React, { useState } from "react";
import CustomSelect from "./CustomSelect";
import { categoriesList, sortingOptions } from "../assets/constant/consts";
import { useSearchParams } from "react-router-dom";

const SearchFilterSort = () => {
  const sortOptions = sortingOptions;
  const categories = categoriesList;

  const [searchTerm, setSearchTerm] = useState();

  const [searchParams, setSearchParams] = useSearchParams();

  //TODO: fix search functionality
  function handleSearchInput(e) {
    const value = e.target.value;
    setSearchTerm(value);
  }
  function handleSearch(e) {
    e.preventDefault();
    setSearchParams((prevParams) => {
      const params = new URLSearchParams(prevParams);
      if (searchTerm === "") {
        params.delete("search");
      } else {
        params.delete("category");
        params.set("search", searchTerm);
      }
      return params;
    });
  }

  function handleFilterChange(filter) {
    setSearchParams((prevParams) => {
      const params = new URLSearchParams(prevParams);
      if (filter === "all") {
        params.delete("category"); // remove param if default
      } else {
        params.delete("search");
        params.set("category", filter);
      }
      return params;
    });
  }

  function handleSortChange(sort) {
    setSearchParams((prevParams) => {
      const params = new URLSearchParams(prevParams);
      if (sort === "default") {
        params.delete("sort"); // remove param if default
      } else {
        params.set("sort", sort);
      }
      return params;
    });
  }

  return (
    <div className="search-filter-sort">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          className="search-input"
          onChange={handleSearchInput}
        />
        <button className="search-btn" type="submit">
          🔍
        </button>
      </form>
      <div className="drop-downs">
        <CustomSelect
          options={categories}
          placeholder="Filter by Category"
          onChange={(option) => {
            handleFilterChange(option);
          }}
        />

        <CustomSelect
          options={sortOptions}
          placeholder="Sort by"
          onChange={(option) => {
            handleSortChange(option);
          }}
        />
      </div>
    </div>
  );
};

export default SearchFilterSort;
