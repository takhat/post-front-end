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
  name: string;
  workHistory: WorkHistory[];
}

interface Agency {
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

// Main function to get officers by agency
export const getOfficersByAgency = async (
  state: string,
  agencyName: string,
  page: number,
  perPage: number
): Promise<{ officers: PeaceOfficer[]; totalItems: number }> => {
  try {
    // Fetch data from API
    const data = await fetchOfficersData(state);

    // Flatten all officers from all agencies
    const allOfficers = flattenOfficers(data);

    // Filter by agency name if specified
    const filteredOfficers =
      agencyName === "all"
        ? allOfficers
        : allOfficers.filter((officer) =>
            officer.workHistory.some(
              (history) => history.agencyName === agencyName
            )
          );

    // Calculate total items after filtering
    const totalItems = filteredOfficers.length;

    // Calculate the range of items for pagination
    const startIndex = (page - 1) * perPage;
    const endIndex = Math.min(startIndex + perPage, totalItems);
    const paginatedOfficers = filteredOfficers.slice(startIndex, endIndex);

    return {
      officers: paginatedOfficers,
      totalItems,
    };
  } catch (error) {
    console.error("Error getting officers by agency:", error);
    throw new Error("Failed to get officers by agency");
  }
};
