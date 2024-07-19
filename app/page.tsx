
import { redirect } from "next/navigation";
import App from "./App";
import { Suspense } from "react";
export const dynamic = 'force-dynamic';

type Query = {
  searchParams: {
    xxx: string
  }
}

export default async function Home({ searchParams }: Query) {
  const secret = process.env.AUTH_SECRET;
  if(searchParams.xxx !== secret) {
    return redirect("/403")
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <App /> 
    </Suspense>
  );
}
