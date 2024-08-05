// import Link from "next/link";

// export default function States({ params }: { params: any }) {
//   return (
//     <div>
//       <h1>{params.state}</h1>
//       <Link href="/"> Home</Link>

//     </div>
//   );
// }

/// app/states/[state]/page.tsx
"use client"; 

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const StatePage = () => {
  const router = useRouter();
  const [agency, setAgency] = useState('all');

  const handleAgencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAgency(event.target.value);
    router.push(`/states/${event.target.value}`);
  };

  return (
    <div>
      <h1 className="title">Peace Officer Employment History</h1>

      <div className="stats options-label">
        <div>
          <label className="options-label" htmlFor="state">State: </label>
          <select name="state" id="state">
            <option value="all">All</option>
            <option value="wa">WA</option>
            <option value="vt">VT</option>
          </select>
        </div>

        <div>
          <label className="options-label" htmlFor="agency">Agency: </label>
          <select name="agency" id="agency" value={agency} onChange={handleAgencyChange}>
            <option value="all">All</option>
            <option value="agency 1">Seattle PD</option>
            <option value="agency 2">Burlington PD</option>
          </select>
        </div>

        <div>
          <label className="options-label" htmlFor="sort-by">Sort by: </label>
          <select name="sort-by" id="sort-by">
            <option value="all">All</option>
            <option value="last-name">Last Name</option>
            <option value="first-name">First Name</option>
            <option value="uid">Uid</option>
            <option value="start-date">Start Date</option>
            <option value="end-date">End Date</option>
            <option value="reason">Separation Reason</option>
          </select>
        </div>
      </div>

      <div className="cards">
        {/* Replace this with dynamic data */}
        <div className="officer-card">
          <h2>Adam A.</h2>
          <p>id: 1</p>
          <p>Start Date: </p>
          <p>End Date: </p>
          <p>Sep. Reason: </p>
        </div>
        <div className="officer-card">
          <h2>Tim B.</h2>
          <p>id: 2</p>
          <p>Start Date: 2022</p>
          <p>End Date: 2023</p>
          <p>Sep. Reason: Certified</p>
        </div>
        <div className="officer-card">
          <h2>Ryan C.</h2>
          <p>id: 3</p>
          <p>Start Date: 2022</p>
          <p>End Date: 2023</p>
          <p>Sep. Reason: Certified</p>
        </div>
        <div className="officer-card">
          <h2>Tom D.</h2>
          <p>id: 4</p>
          <p>Start Date: 2022</p>
          <p>End Date: 2023</p>
          <p>Sep. Reason: Certified</p>
        </div>
        <div className="officer-card">
          <h2>Jake G.</h2>
          <p>id: 5</p>
          <p>Start Date: 2022</p>
          <p>End Date: 2023</p>
          <p>Sep. Reason: Certified</p>
        </div>
        <div className="officer-card">
          <h2>Dave H.</h2>
          <p>id: 6</p>
          <p>Start Date: 2022</p>
          <p>End Date: 2023</p>
          <p>Sep. Reason: Certified</p>
        </div>
        <div className="officer-card">
          <h2>Sam H.</h2>
          <p>id: 7</p>
          <p>Start Date: 2022</p>
          <p>End Date: 2023</p>
          <p>Sep. Reason: Certified</p>
        </div>
        <div className="officer-card">
          <h2>Aaron H.</h2>
          <p>id: 8</p>
          <p>Start Date: 2022</p>
          <p>End Date: 2023</p>
          <p>Sep. Reason: Certified</p>
        </div>
        <div className="officer-card">
          <h2>Chris I.</h2>
          <p>id: 9</p>
          <p>Start Date: 2022</p>
          <p>End Date: 2023</p>
          <p>Sep. Reason: Certified</p>
        </div>
        <div className="officer-card">
          <h2>Matt J.</h2>
          <p>id: 10</p>
          <p>Start Date: 2022</p>
          <p>End Date: 2023</p>
          <p>Sep. Reason: Certified</p>
        </div>
        <div className="officer-card">
          <h2>Tom K.</h2>
          <p>id: 11</p>
          <p>Start Date: 2022</p>
          <p>End Date: 2023</p>
          <p>Sep. Reason: Certified</p>
        </div>
        <div className="officer-card">
          <h2>Jake L.</h2>
          <p>id: 12</p>
          <p>Start Date: 2022</p>
          <p>End Date: 2023</p>
          <p>Sep. Reason: Certified</p>
        </div>
        <div className="officer-card">
          <h2>Jean L.</h2>
          <p>id: 13</p>
          <p>Start Date: 2022</p>
          <p>End Date: 2023</p>
          <p>Sep. Reason: Certified</p>
        </div>
        <div className="officer-card">
          <h2>Joy L.</h2>
          <p>id: 14</p>
          <p>Start Date: 2022</p>
          <p>End Date: 2023</p>
          <p>Sep. Reason: Certified</p>
        </div>
        <div className="officer-card">
          <h2>Dave M.</h2>
          <p>id: 15</p>
          <p>Start Date: 2022</p>
          <p>End Date: 2023</p>
          <p>Sep. Reason: Certified</p>
        </div>
        <div className="officer-card">
          <h2>Chris M.</h2>
          <p>id: 16</p>
          <p>Start Date: 2022</p>
          <p>End Date: 2023</p>
          <p>Sep. Reason: Certified</p>
        </div>
        <div className="officer-card">
          <h2>Bob M.</h2>
          <p>id: 17</p>
          <p>Start Date: 2022</p>
          <p>End Date: 2023</p>
          <p>Sep. Reason: Certified</p>
        </div>
        <div className="officer-card">
          <h2>Teresa N.</h2>
          <p>id: 18</p>
          <p>Start Date: 2022</p>
          <p>End Date: 2023</p>
          <p>Sep. Reason: Certified</p>
        </div>
        <div className="officer-card">
          <h2>Jane P.</h2>
          <p>id: 19</p>
          <p>Start Date: 2022</p>
          <p>End Date: 2023</p>
          <p>Sep. Reason: Certified</p>
        </div>
        <div className="officer-card">
          <h2>Bob M.</h2>
          <p>id: 20</p>
          <p>Start Date: 2022</p>
          <p>End Date: 2023</p>
          <p>Sep. Reason: Certified</p>
        </div>
        <div className="officer-card">
          <h2>Teresa N.</h2>
          <p>id: 21</p>
          <p>Start Date: 2022</p>
          <p>End Date: 2023</p>
          <p>Sep. Reason: Certified</p>
        </div>
        <div className="officer-card">
          <h2>Jane P.</h2>
          <p>id: 22</p>
          <p>Start Date: 2022</p>
          <p>End Date: 2023</p>
          <p>Sep. Reason: Certified</p>
        </div>
        <div className="officer-card">
          <h2>Jane P.</h2>
          <p>id: 23</p>
          <p>Start Date: 2022</p>
          <p>End Date: 2023</p>
          <p>Sep. Reason: Certified</p>
        </div>
      </div>
    </div>
  );
};

export default StatePage;
