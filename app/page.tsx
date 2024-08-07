import Link from "next/link";
import { Map } from "./components/Map";

// List of states
const states: string[] = [
  "AZ",
  "CA",
  "FL",
  "GA",
  "IL",
  "MD",
  "OH",
  "OR",
  "SC",
  "TN",
  "TX",
  "VT",
  "WA",
];

export default function Home() {
  return (
    <main>
      <h1>Police Officer Employment History</h1>
      <div style={{ width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
        <Map />
      </div>

      {/* State buttons */}
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {states.map((state) => (
          <Link key={state} href={`/states/${state}`}>
            <button style={{ padding: "10px 20px", cursor: "pointer" }}>
              {state}
            </button>
          </Link>
        ))}
      </div>

      <Link href="/about">About</Link>
    </main>
  );
}
