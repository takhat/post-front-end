import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import OfficerList from "../../app/components/OfficerList";
import { PeaceOfficer } from "../../data/officersData";

describe("OfficerList", () => {
  const mockOfficers: PeaceOfficer[] = [
    {
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
    },
    {
      id: 2,
      UID: "789012",
      firstName: "Jane",
      lastName: "Smith",
      workHistory: [
        {
          id: 2,
          startDate: "2020-06-15",
          separationDate: "2021-12-01",
          separationReason: "Transferred",
          agencyName: "Another Agency",
        },
      ],
    },
  ];

  it("should render a list of OfficerCard components when officers are provided", () => {
    render(<OfficerList officers={mockOfficers} />);

    // Check if both officers' names are rendered
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();

    // Check if the correct number of OfficerCard components is rendered
    const officerCards = screen.getAllByText(/UID:/);
    expect(officerCards).toHaveLength(mockOfficers.length);
  });

  it('should display "No officers found" when no officers are provided', () => {
    render(<OfficerList officers={[]} />);

    // Check if the "No officers found" message is displayed
    expect(screen.getByText("No officers found.")).toBeInTheDocument();
  });

  it("should match the snapshot", () => {
    const { asFragment } = render(<OfficerList officers={mockOfficers} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
