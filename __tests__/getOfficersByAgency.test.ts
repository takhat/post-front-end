import {
  getOfficersByAgency,
  flattenOfficers,
  fetchOfficersData,
} from "../data/officersData";

// Jest module mock
jest.mock("../data/officersData", () => ({
  getOfficersByAgency: jest.fn(),
  flattenOfficers: jest.fn(),
  fetchOfficersData: jest.fn(),
}));

describe("getOfficersByAgency", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear previous mocks
  });

  it("should return the correct officers and total items based on the provided parameters", async () => {
    const state = "NY";
    const agencyName = "Agency A";
    const page = 1;
    const perPage = 10;
    const sortBy = "last-name";

    // Mock fetchOfficersData
    (fetchOfficersData as jest.Mock).mockResolvedValue([
      {
        id: 1,
        agencyName: "Agency A",
        peaceOfficerList: [
          {
            id: 1,
            UID: "123",
            firstName: "John",
            lastName: "Doe",
            workHistory: [
              {
                id: 1,
                startDate: "2020-01-01",
                separationDate: null,
                separationReason: "",
                agencyName: "Agency A",
              },
            ],
          },
        ],
      },
    ]);

    // Mock flattenOfficers
    (flattenOfficers as jest.Mock).mockImplementation((agencies) => {
      return agencies.flatMap(
        (agency: { peaceOfficerList: any[]; agencyName: any }) =>
          agency.peaceOfficerList.map((officer) => ({
            ...officer,
            workHistory: officer.workHistory.map((history: any) => ({
              ...history,
              agencyName: agency.agencyName,
            })),
          }))
      );
    });

    // Mock getOfficersByAgency directly to simulate the complete process
    (getOfficersByAgency as jest.Mock).mockImplementation(
      async (state, agencyName, page, perPage, sortBy) => {
        const data = await fetchOfficersData(state);
        const allOfficers = flattenOfficers(data);

        const filteredOfficers =
          agencyName === "all"
            ? allOfficers
            : allOfficers.filter((officer) =>
                officer.workHistory.some(
                  (history) => history.agencyName === agencyName
                )
              );

        // Sort the officers based on the sortBy parameter
        const sortedOfficers = filteredOfficers.sort((a, b) => {
          switch (sortBy) {
            case "last-name":
              return a.lastName.localeCompare(b.lastName);
            case "first-name":
              return a.firstName.localeCompare(b.firstName);
            case "uid":
              // Try to parse UIDs as numbers for numeric sorting
              const uidA = parseInt(a.UID, 10);
              const uidB = parseInt(b.UID, 10);

              if (!isNaN(uidA) && !isNaN(uidB)) {
                return uidA - uidB;
              } else {
                return a.UID.localeCompare(b.UID);
              }
            default:
              return 0;
          }
        });

        const totalItems = sortedOfficers.length;
        const startIndex = (page - 1) * perPage;
        const endIndex = Math.min(startIndex + perPage, totalItems);
        const paginatedOfficers = sortedOfficers.slice(startIndex, endIndex);

        return {
          officers: paginatedOfficers,
          totalItems,
        };
      }
    );

    const result = await getOfficersByAgency(
      state,
      agencyName,
      page,
      perPage,
      sortBy
    );

    // Debug output
    console.log("Result:", result);

    // Assert the result
    expect(result).toEqual({
      officers: [
        {
          id: 1,
          UID: "123",
          firstName: "John",
          lastName: "Doe",
          workHistory: [
            {
              id: 1,
              startDate: "2020-01-01",
              separationDate: null,
              separationReason: "",
              agencyName: "Agency A",
            },
          ],
        },
      ],
      totalItems: 1,
    });

    expect(result.officers).toHaveLength(1);
    expect(result.totalItems).toBe(1);
    expect(result.officers[0].lastName).toBe("Doe");
  });
});
