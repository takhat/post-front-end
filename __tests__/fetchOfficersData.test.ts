import axios from "axios";
import { fetchOfficersData } from "../data/officersData";
import { Agency } from "../data/officersData";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("fetchOfficersData", () => {
  it("should fetch and return data from API", async () => {
    const mockData: Agency[] = [
      {
        id: 1,
        agencyName: "Agency A",
        peaceOfficerList: [
          {
            id: 1,
            UID: "123",
            firstName: "John",
            lastName: "Doe",
            workHistory: [],
          },
        ],
      },
    ];

    mockedAxios.get.mockResolvedValue({ data: mockData });

    const state = "CA";
    const result = await fetchOfficersData(state);

    expect(result).toEqual(mockData);
  });

  it("should handle API errors gracefully", async () => {
    mockedAxios.get.mockRejectedValue(new Error("Network Error"));

    await expect(fetchOfficersData("CA")).rejects.toThrow(
      "Failed to fetch data"
    );
  });
});
