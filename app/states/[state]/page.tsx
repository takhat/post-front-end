import Link from "next/link";

export default function States({ params }: { params: any }) {
  return (
    <div>
      <h1>{params.state}</h1>
      <Link href="/"> Home</Link>
    </div>
  );
}
