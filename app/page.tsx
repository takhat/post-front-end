import Link from "next/link";
import { Map } from "./components/Map";
import { fetchMapData } from "../lib/fetchMapData";
import Footer from "./components/Footer";
import Nav from "./components/Nav";

const availableStates: Record<string, string> = {
  Arizona: "AZ",
  California: "CA",
  Florida: "FL",
  Georgia: "GA",
  Illinois: "IL",
  Maryland: "MD",
  Ohio: "OH",
  Oregon: "OR",
  "South Carolina": "SC",
  Tennessee: "TN",
  Texas: "TX",
  Vermont: "VT",
  Washington: "WA",
};

export default async function Home() {
  const data = await fetchMapData();

  return (
    <main className="relative">
      <Nav />
      <section className="mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="flex-grow w-full max-w-7xl">
          <Map data={data} availableStates={availableStates} />
        </div>
        <div className="lg:flex-grow md:w-1/2 md:ml-24 pt-6 flex flex-col md:items-start md:text-left items-center text-center">
          <p className="mb-4 xl:w-3/4 text-gray-600 text-lg">
            The data presented here was obtained through public records requests
            from the Peace Officer Standards and Training (POST) database. The
            dataset contains information on police officer employment history,
            including the officers name, department, and employment dates.
          </p>
        </div>
      </section>
      <section className="mx-auto">
        <div className="container px-5 mx-auto lg:px-24 ">
          <div className="flex flex-col w-full mb-4 text-left lg:text-center">
            <h1 className="mb-8 text-xl font-semibold text-black">
              View data from any of the following states:
            </h1>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.entries(availableStates).map(([state, abbreviation]) => (
              <Link key={state} href={`/states/${abbreviation}`}>
                <button className="w-40 h-10 rounded-md bg-white border border-gray-800 text-gray-800 text-sm font-segoe-ui hover:bg-gray-100 hover:border-gray-600 hover:text-gray-600">
                  {state}
                </button>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

/* <section className="mx-auto flex flex-col md:flex-row px-5 py-24 items-center">
        <div className="flex-grow w-full max-w-7xl">
          <Map data={data} availableStates={availableStates} />
        </div>
        <div className="w-full ">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(availableStates).map(([state, abbreviation]) => (
              <Link key={state} href={`/states/${abbreviation}`}>
                <button className="w-40 h-10 rounded-md bg-white border border-gray-800 text-gray-800 text-sm font-segoe-ui hover:bg-gray-100 hover:border-gray-600 hover:text-gray-600">
                  {state}
                </button>
              </Link>
            ))}
          </div>
        </div>
      </section> */
