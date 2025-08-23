export default function ApplyPage({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div>
      <h1>Apply for Competition {id}</h1>
      {/* Application form goes here */}
    </div>
  );
}
