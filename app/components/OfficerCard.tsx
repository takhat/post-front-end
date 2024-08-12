import React from "react";
import { PeaceOfficer, WorkHistory } from "../../data/officersData"; // Ensure correct import path

interface OfficerCardProps {
  officer: PeaceOfficer;
}

const OfficerCard: React.FC<OfficerCardProps> = ({ officer }) => {
  return (
    <div className="officer-card">
      <h3 className="standout officer-name">
        {officer.firstName} {officer.lastName}
      </h3>
      <p className="uid">UID: {officer.UID}</p>
      <div className="work-history">
        {officer.workHistory.length === 0 ? (
          <p>No work history available</p>
        ) : (
          officer.workHistory.map((history: WorkHistory) => (
            <div key={history.id} className="work-history-entry">
              <p className="agency-name">
                {history.agencyName || "Unknown Agency"}
              </p>
              <p>
                Start Date:{" "}
                {history.startDate
                  ? new Date(history.startDate).toLocaleDateString()
                  : ""}
              </p>
              <p>
                End Date:{" "}
                {history.separationDate
                  ? new Date(history.separationDate).toLocaleDateString()
                  : ""}
              </p>
              <p>Separation Reason: {history.separationReason}</p>
              <br></br>
              <br></br>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OfficerCard;
