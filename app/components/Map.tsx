import Link from "next/link";

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

export default function Map() {
  return (
    <div>
      {states.map((state) => (
        <Link href={`/states/${state}`} key={state}>
          {state} <br />
        </Link>
      ))}
    </div>
  );
}
