export default function Page({ params: { id } }: { params: { id: number } }) {
  return (
    <main>
      <h1>Position n°{id} Page</h1>
    </main>
  );
}
