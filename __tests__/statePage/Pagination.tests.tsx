import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Pagination from "../../app/components/Pagination"; // Adjust the import path accordingly

describe("Pagination Component", () => {
  test("renders pagination with correct number of pages", () => {
    render(
      <Pagination currentPage={1} totalPages={3} onPageChange={() => {}} />
    );

    // Check for correct number of page buttons
    const pageButtons = screen.getAllByRole("button", { name: /[1-9]/ });
    expect(pageButtons).toHaveLength(3);
  });

  test("disables Previous button on the first page", () => {
    render(
      <Pagination currentPage={1} totalPages={3} onPageChange={() => {}} />
    );

    const previousButton = screen.getByRole("button", { name: /Previous/ });
    expect(previousButton).toBeDisabled();
  });

  test("disables Next button on the last page", () => {
    render(
      <Pagination currentPage={3} totalPages={3} onPageChange={() => {}} />
    );

    const nextButton = screen.getByRole("button", { name: /Next/ });
    expect(nextButton).toBeDisabled();
  });

  test("calls onPageChange with correct page number when page button is clicked", () => {
    const onPageChangeMock = jest.fn();
    render(
      <Pagination
        currentPage={1}
        totalPages={3}
        onPageChange={onPageChangeMock}
      />
    );

    fireEvent.click(screen.getByText("2"));
    expect(onPageChangeMock).toHaveBeenCalledWith(2);
  });

  test("calls onPageChange with correct page number when Previous button is clicked", () => {
    const onPageChangeMock = jest.fn();
    render(
      <Pagination
        currentPage={2}
        totalPages={3}
        onPageChange={onPageChangeMock}
      />
    );

    fireEvent.click(screen.getByText("Previous"));
    expect(onPageChangeMock).toHaveBeenCalledWith(1);
  });

  test("calls onPageChange with correct page number when Next button is clicked", () => {
    const onPageChangeMock = jest.fn();
    render(
      <Pagination
        currentPage={1}
        totalPages={3}
        onPageChange={onPageChangeMock}
      />
    );

    fireEvent.click(screen.getByText("Next"));
    expect(onPageChangeMock).toHaveBeenCalledWith(2);
  });
});
