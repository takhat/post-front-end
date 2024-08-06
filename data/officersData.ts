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
  agency: string
): Officer[] => {
  return officersData.filter(
    (officer) =>
      (state === "all" || officer.state === state) &&
      (agency === "all" || officer.agencyName === agency)
  );
};

// export default officersData;
