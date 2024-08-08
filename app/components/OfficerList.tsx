import React from "react";
import OfficerCard from "./OfficerCard";
import { PeaceOfficer } from "../../data/officersData";

interface OfficerListProps {
  officers: PeaceOfficer[];
}

const OfficerList: React.FC<OfficerListProps> = ({ officers }) => {
  return (
    <div className="cards">
      {officers.length > 0 ? (
        officers.map((officer) => (
          <OfficerCard key={officer.UID} officer={officer} />
        ))
      ) : (
        <p>No officers found.</p>
      )}
    </div>
  );
};
export default OfficerList;
