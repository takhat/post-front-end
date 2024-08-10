import axios from "axios";

export interface WorkHistory {
  id: number;
  startDate: string | null;
  separationDate: string | null;
  separationReason: string;
  agencyName?: string;
}

export interface PeaceOfficer {
  id: number;
  UID: string;
  firstName: string;
  lastName: string;
  workHistory: WorkHistory[];
}

export interface Agency {
  id: number;
  agencyName: string;
  peaceOfficerList: PeaceOfficer[];
}

const apiUrl =
  "https://police-officer-data-web-app-backend.onrender.com/filter";

// Flatten all officers from all agencies into a single list and add agency name to each work history
const flattenOfficers = (data: Agency[]): PeaceOfficer[] => {
  const officerMap = new Map<string, PeaceOfficer>();

  data.forEach((agency) => {
    agency.peaceOfficerList.forEach((officer) => {
      if (!officerMap.has(officer.UID)) {
        officerMap.set(officer.UID, {
          ...officer,
          workHistory: officer.workHistory.map((history) => ({
            ...history,
            agencyName: agency.agencyName,
          })),
        });
      } else {
        const existingOfficer = officerMap.get(officer.UID)!;
        existingOfficer.workHistory.push(
          ...officer.workHistory.map((history) => ({
            ...history,
            agencyName: agency.agencyName,
          }))
        );
      }
    });
  });

  return Array.from(officerMap.values());
};

// Fetch data from API and flatten it
export const fetchOfficersData = async (state: string): Promise<Agency[]> => {
  try {
    const response = await axios.get<Agency[]>(`${apiUrl}?stateCode=${state}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data");
  }
};
export const getOfficersByAgency = async (
  state: string,
  agencyName: string,
  page: number,
  perPage: number,
  sortBy: string
): Promise<{ officers: PeaceOfficer[]; totalItems: number }> => {
  try {
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
            // Both UIDs are numeric
            return uidA - uidB;
          } else {
            // Treat UIDs as strings if they are not purely numeric
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
  } catch (error) {
    console.error("Error getting officers by agency:", error);
    throw new Error("Failed to get officers by agency");
  }
};
