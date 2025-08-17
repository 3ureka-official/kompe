import { PrismaClient } from "@prisma/client";

export default function Dashboard() {
  const prisma = new PrismaClient();
  // Fetch data from the database
  const fetchData = async () => {
    const data = await prisma.brands.findMany();
    console.log(data);
  };
  fetchData();
  return <div>Dashboard</div>;
}
