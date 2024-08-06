"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { getOfficersByStateAndAgency } from "../../../data/officersData";
import { Officer } from "../../../types";
import OfficerList from "../../components/OfficerList";

const StatePage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [agency, setAgency] = useState("all");
  const [officers, setOfficers] = useState<Officer[]>([]);
  const state = pathname.split("/")[2];

  useEffect(() => {
    const filteredOfficers = getOfficersByStateAndAgency(state, agency);
    setOfficers(filteredOfficers);
  }, [state, agency]);

  const handleAgencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAgency(event.target.value);
    router.push(`/states/${state}?agency=${event.target.value}`);
  };

  return (
    <div>
      <h1 className="title">Peace Officer Employment History</h1>
      <div className="stats options-label">
        <div>
          <label className="options-label" htmlFor="state">
            State:{" "}
          </label>
          <select name="state" id="state">
            <option value="all">All</option>
            <option value="wa">WA</option>
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
            <option value="all">All</option>
            <option value="last-name">Last Name</option>
            <option value="first-name">First Name</option>
            <option value="uid">Uid</option>
            <option value="start-date">Start Date</option>
            <option value="end-date">End Date</option>
            <option value="reason">Separation Reason</option>
          </select>
        </div>
      </div>

      <div className="cards">
        <OfficerList officers={officers} />
      </div>
    </div>
  );
};

export default StatePage;
