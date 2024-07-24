import { ApolloError } from "@apollo/client";

export default function ErrorPage({ error }: { error: ApolloError }) {
  return (
    <main className="grid place-content-center place-items-center">
      <div className="flex flex-col gap-8 items-center justify-center">
        <h1 className="font-bold text-3xl">Something went wrong</h1>
        <span className="text-sm font-semibold">Please try again later</span>
      </div>
      <span>{error.message}</span>
    </main>
  );
}
