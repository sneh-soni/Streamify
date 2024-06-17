import { Suspense } from "react";
import { Results, ResultsSkeleton } from "./_components/resuts";

export default function Home() {
  return (
    <div className="h-full max-w-screen-2xl p-6 mx-auto">
      <Suspense fallback={<ResultsSkeleton />}>
        <Results />
      </Suspense>
    </div>
  );
}
