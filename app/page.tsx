import Link from "next/link";
import { Map } from "./components/Map";

// List of states
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

export default function Home() {
  return (
    <main
      className={`flex flex-col items-center justify-center min-h-screen space-y-4`}
      style={{ paddingBottom: "4rem" }} // Additional padding to prevent cutoff
    >
      <h1>Peace Officer Employment History Database</h1>

      <div
        style={{
          width: "100%",
          maxWidth: "100vh",
          margin: "0 auto",
        }}
      >
        <Map availableStates={availableStates} />
      </div>

      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-8 mb-4"
        style={{
          width: "100%",
          padding: "0 1rem",
          paddingBottom: "2rem", // Ensure there's extra space at the bottom
        }}
      >
        {Object.entries(availableStates).map(([state, abbreviation]) => (
          <Link key={state} href={`/states/${abbreviation}`}>
            <button className={"stateButton"}>{state}</button>
          </Link>
        ))}
      </div>
    </main>
  );
}
