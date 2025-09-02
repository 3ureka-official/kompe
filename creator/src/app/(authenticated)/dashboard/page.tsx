import { auth } from "@/auth";

export default async function Dashboard() {
  const session = await auth();
  if (!session) {
    return <div>Please sign in to access the dashboard.</div>;
  }
  return (
    <div className="w-full grid gap-8 p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <pre className="max-w-md overflow-auto">
        {JSON.stringify(session, null, 2)}
      </pre>
    </div>
  );
}
