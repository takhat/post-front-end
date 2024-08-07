import { Officer } from "../types";
// import { getConnection } from 'typeorm';

const officersData: Officer[] = [
  {
    name: "John Doe",
    id: "123",
    state: "WA",
    agencyName: "Seattle Police Department",
    startDate: "2015-01-15",
    endDate: "2020-05-30",
    separationReason: "Retirement",
  },
  {
    name: "Jane Smith",
    id: "456",
    state: "WA",
    agencyName: "Bellevue Police Department",
    startDate: "2018-03-22",
    endDate: "2022-07-18",
    separationReason: "Resignation",
  },
  {
    name: "Alice Johnson",
    id: "789",
    state: "WA",
    agencyName: "Tacoma Police Department",
    startDate: "2019-11-01",
    endDate: "2023-02-28",
    separationReason: "Termination",
  },
  {
    name: "Bob Johnson",
    id: "987",
    state: "WA",
    agencyName: "Spokane Police Department",
    startDate: "2020-08-10",
    endDate: "2024-12-31",
    separationReason: "Transfer",
  },
  {
    name: "Sarah Davis",
    id: "654",
    state: "WA",
    agencyName: "Vancouver Police Department",
    startDate: "2017-06-05",
    endDate: "2021-09-15",
    separationReason: "Promotion",
  },
  {
    name: "Josh Doe",
    id: "223",
    state: "WA",
    agencyName: "Seattle Police Department",
    startDate: "2015-01-15",
    endDate: "2020-05-30",
    separationReason: "Retirement",
  },
  {
    name: "Jane Doe",
    id: "124",
    state: "WA",
    agencyName: "Seattle Police Department",
    startDate: "2015-01-15",
    endDate: "2020-05-30",
    separationReason: "Retirement",
  },
  {
    name: "Emily Johnson",
    id: "345",
    state: "WA",
    agencyName: "Bellevue Police Department",
    startDate: "2020-02-12",
    endDate: "2024-06-30",
    separationReason: "Resignation",
  },
  {
    name: "Michael Smith",
    id: "567",
    state: "WA",
    agencyName: "Tacoma Police Department",
    startDate: "2016-09-18",
    endDate: "2020-12-31",
    separationReason: "Termination",
  },
  {
    name: "Olivia Davis",
    id: "890",
    state: "WA",
    agencyName: "Spokane Police Department",
    startDate: "2017-12-01",
    endDate: "2022-03-31",
    separationReason: "Transfer",
  },
  {
    name: "William Johnson",
    id: "432",
    state: "WA",
    agencyName: "Vancouver Police Department",
    startDate: "2019-03-10",
    endDate: "2023-08-15",
    separationReason: "Promotion",
  },
  {
    name: "Alex Brown",
    id: "111",
    state: "WA",
    agencyName: "Seattle Police Department",
    startDate: "2014-02-28",
    endDate: "2019-06-15",
    separationReason: "Retirement",
  },
  {
    name: "Emma Johnson",
    id: "222",
    state: "WA",
    agencyName: "Bellevue Police Department",
    startDate: "2017-09-10",
    endDate: "2021-12-31",
    separationReason: "Resignation",
  },
  {
    name: "Daniel Smith",
    id: "333",
    state: "WA",
    agencyName: "Tacoma Police Department",
    startDate: "2018-05-15",
    endDate: "2022-08-30",
    separationReason: "Termination",
  },
  {
    name: "Sophia Davis",
    id: "444",
    state: "WA",
    agencyName: "Spokane Police Department",
    startDate: "2019-10-01",
    endDate: "2023-01-31",
    separationReason: "Transfer",
  },
  {
    name: "Ethan Johnson",
    id: "555",
    state: "WA",
    agencyName: "Vancouver Police Department",
    startDate: "2016-03-10",
    endDate: "2020-08-15",
    separationReason: "Promotion",
  },
  {
    name: "Mia Smith",
    id: "666",
    state: "WA",
    agencyName: "Seattle Police Department",
    startDate: "2015-07-20",
    endDate: "2020-11-30",
    separationReason: "Retirement",
  },
  {
    name: "Noah Davis",
    id: "777",
    state: "WA",
    agencyName: "Bellevue Police Department",
    startDate: "2018-10-05",
    endDate: "2023-01-15",
    separationReason: "Resignation",
  },
  {
    name: "Ava Johnson",
    id: "888",
    state: "WA",
    agencyName: "Tacoma Police Department",
    startDate: "2019-12-20",
    endDate: "2024-04-30",
    separationReason: "Termination",
  },
  {
    name: "Liam Smith",
    id: "999",
    state: "WA",
    agencyName: "Spokane Police Department",
    startDate: "2020-06-01",
    endDate: "2024-09-30",
    separationReason: "Transfer",
  },
  {
    name: "Isabella Davis",
    id: "000",
    state: "WA",
    agencyName: "Vancouver Police Department",
    startDate: "2017-01-10",
    endDate: "2021-04-15",
    separationReason: "Promotion",
  },
];
// export const getOfficersByStateAndAgency = async (state: string, agency: string): Promise<Officer[]> => {
//   const connection = await getConnection(); // Assuming you have already set up a database connection using TypeORM

//   const officerRepository = connection.getRepository(Officer); // Assuming you have defined an Officer entity in TypeORM

//   let query = officerRepository.createQueryBuilder('officer');

//   if (state !== 'all') {
//     query = query.where('officer.state = :state', { state });
//   }

//   if (agency !== 'all') {
//     query = query.andWhere('officer.agencyName = :agency', { agency });
//   }

//   return query.getMany();
// };
export const getOfficersByStateAndAgency = (
  state: string,
  agency: string,
  page: number,
  perPage: number
): { officers: Officer[]; totalItems: number } => {
  // Filter the data based on state and agency
  const filteredOfficers = officersData.filter(
    (officer) =>
      (state === "all" || officer.state === state) &&
      (agency === "all" || officer.agencyName === agency)
  );

  //calculate total items after filtering
  const totalItems = filteredOfficers.length;

  //calculate the range of items after filtering
  const startIndex = (page - 1) * perPage;
  const endIndex = Math.min(startIndex + perPage, totalItems);
  const paginatedOfficers = filteredOfficers.slice(startIndex, endIndex);

  return {
    officers: paginatedOfficers,
    totalItems,
  };
};
