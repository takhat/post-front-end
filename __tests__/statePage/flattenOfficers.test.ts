import {
  flattenOfficers,
  Agency,
  PeaceOfficer,
  WorkHistory,
} from "../../data/officersData";

describe("flattenOfficers", () => {
  it("should correctly flatten and aggregate officers from multiple agencies", () => {
    const agencies: Agency[] = [
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
      {
        id: 2,
        agencyName: "Agency B",
        peaceOfficerList: [
          {
            id: 1,
            UID: "123",
            firstName: "John",
            lastName: "Doe",
            workHistory: [
              {
                id: 2,
                startDate: "2021-01-01",
                separationDate: null,
                separationReason: "",
                agencyName: "Agency B",
              },
            ],
          },
        ],
      },
    ];

    const flattenedOfficers = flattenOfficers(agencies);

    expect(flattenedOfficers).toHaveLength(1);

    const officer = flattenedOfficers[0];
    expect(officer.UID).toBe("123");
    expect(officer.workHistory).toHaveLength(2);
    expect(officer.workHistory[0].agencyName).toBe("Agency A");
    expect(officer.workHistory[1].agencyName).toBe("Agency B");
  });
});
