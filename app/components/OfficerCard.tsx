import React from "react";
import { Officer } from "../../types";

interface OfficerCardProps {
  officer: Officer;
}

const OfficerCard: React.FC<OfficerCardProps> = ({ officer }) => {
  return (
    <div className="officer-card">
      <h3>{officer.name}</h3>
      <p> ID: {officer.id}</p>
      <p>Start Date: {new Date(officer.startDate).toLocaleDateString()}</p>
      <p>End Date: {new Date(officer.endDate).toLocaleDateString()}</p>
      <p>Separation Reason: {officer.separationReason}</p>
    </div>
  );
};

export default OfficerCard;
