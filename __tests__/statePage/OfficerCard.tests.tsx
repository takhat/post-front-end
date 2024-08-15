// OfficerCard.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import OfficerCard from "../../app/components/OfficerCard";
import { PeaceOfficer, WorkHistory } from "../../data/officersData";

describe("OfficerCard", () => {
  const mockOfficer: PeaceOfficer = {
    id: 1,
    UID: "123456",
    firstName: "John",
    lastName: "Doe",
    workHistory: [
      {
        id: 1,
        startDate: "2021-12-30",
        separationDate: "2022-01-30",
        separationReason: "Resigned",
        agencyName: "Example Agency",
      },
    ],
  };

  it("should render officer details correctly", () => {
    render(<OfficerCard officer={mockOfficer} />);

    // Check if the officer's name is rendered
    expect(screen.getByText("John Doe")).toBeInTheDocument();

    // Check if the UID is rendered
    expect(screen.getByText("UID: 123456")).toBeInTheDocument();

    // Check if the work history is rendered correctly
    expect(screen.getByText("Example Agency")).toBeInTheDocument();

    // Flexible date check
    const startDateText = screen.getByText(/Start Date:/).textContent!;
    const endDateText = screen.getByText(/End Date:/).textContent!;

    // Ensure that the start and end dates are in some recognizable format
    expect(startDateText).toMatch(/Start Date: \d{1,2}\/\d{1,2}\/\d{4}/);
    expect(endDateText).toMatch(/End Date: \d{1,2}\/\d{1,2}\/\d{4}/);

    // Check for separation reason
    expect(screen.getByText("Separation Reason: Resigned")).toBeInTheDocument();
  });

  it('should display "No work history available" when work history is empty', () => {
    const emptyWorkHistoryOfficer: PeaceOfficer = {
      id: 2,
      UID: "789012",
      firstName: "Jane",
      lastName: "Smith",
      workHistory: [],
    };

    render(<OfficerCard officer={emptyWorkHistoryOfficer} />);

    // Check if the no work history message is displayed
    expect(screen.getByText("No work history available")).toBeInTheDocument();
  });

  it('should display "Unknown Agency" if agencyName is undefined or null', () => {
    const officerWithUndefinedAgency: PeaceOfficer = {
      id: 3,
      UID: "345678",
      firstName: "Emily",
      lastName: "Johnson",
      workHistory: [
        {
          id: 3,
          startDate: "2019-05-01",
          separationDate: "2021-05-01",
          separationReason: "Transferred",
          agencyName: undefined, // or null
        },
      ],
    };

    render(<OfficerCard officer={officerWithUndefinedAgency} />);

    // Check if "Unknown Agency" is displayed
    expect(screen.getByText("Unknown Agency")).toBeInTheDocument();
  });

  it("should match the snapshot", () => {
    const { asFragment } = render(<OfficerCard officer={mockOfficer} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
