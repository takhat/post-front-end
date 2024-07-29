import Link from "next/link";
import Map from "./components/Map";

export default function Home() {
  return (
    <main>
      <h1>Police Officer Employment History</h1>
      <Map />
      <Link href="/about">About</Link>
    </main>
  );
}
