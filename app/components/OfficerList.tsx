import React from "react";
import OfficerCard from "./OfficerCard";
import { Officer } from "../../types";

interface OfficerListProps {
  officers: Officer[];
}

const OfficerList: React.FC<OfficerListProps> = ({ officers }) => {
  return (
    <div className="cards">
      {officers.map((officer) => (
        <OfficerCard key={officer.id} officer={officer} />
      ))}
    </div>
  );
};

export default OfficerList;
