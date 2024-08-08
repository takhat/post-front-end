"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { getOfficersByAgency } from "../../../data/officersData";
import { PeaceOfficer } from "../../../data/officersData";
import OfficerList from "../../components/OfficerList";

const StatePage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [agency, setAgency] = useState("all");
  const [officers, setOfficers] = useState<PeaceOfficer[]>([]);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0); 

  const state = pathname.split("/")[2];

  const handleAgencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAgency(event.target.value);
    setCurrentPage(1); //reset pagination
    router.push(`/states/${state}?agency=${event.target.value}`);
  };
  // Fetch officers data
  const fetchOfficers = (page: number, perPage: number) => {
    const { officers, totalItems } = getOfficersByAgency(agency, page, perPage);
    setOfficers(officers);
    setTotalItems(totalItems);
  };

  useEffect(() => {
    fetchOfficers(currentPage, itemsPerPage);
  }, [state, agency, currentPage]);

  // Pagination handlers
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return; // Ensure page is within valid range
    setCurrentPage(page);
    router.push(`/states/${state}?agency=${agency}&page=${page}`);
  };

  // Calculate pagination data
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div>
      <h1 className="title">Peace Officer Employment History</h1>
      <div className="stats options-label">
        <div>
          <label className="options-label" htmlFor="state">
            State:{" "}
          </label>
          <select name="state" id="state">
            <option value="wa" defaultValue={state}>
              {state}
            </option>
            <option value="vt">VT</option>
          </select>
        </div>

        <div>
          <label className="options-label" htmlFor="agency">
            Agency:{" "}
          </label>
          <select
            name="agency"
            id="agency"
            value={agency}
            onChange={handleAgencyChange}
          >
            <option value="all">All</option>
            <option value="agency 1">Seattle PD</option>
            <option value="agency 2">Burlington PD</option>
          </select>
        </div>

        <div>
          <label className="options-label" htmlFor="sort-by">
            Sort by:{" "}
          </label>
          <select name="sort-by" id="sort-by">
            <option value="last-name">Last Name</option>
            <option value="first-name">First Name</option>
            <option value="uid">Uid</option>
          </select>
        </div>
      </div>

      <div className="cards">
        <OfficerList officers={officers} agencyName={agency} />
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 ">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="p-2 border border-gray-300 rounded hover:bg-gray-300"
        >
          Previous
        </button>
        <span className="mx-4 text-lg">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="p-2 border border-gray-300 rounded hover:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StatePage;
