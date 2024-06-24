
import App from "./App";
import { Suspense } from "react";
export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <App /> 
    </Suspense>
  );
}
