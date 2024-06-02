import { Wrapper } from "./wrapper";
import { Toggle, ToggleSketeton } from "./toggle";
import { Recommended, RecommendedSkeleton } from "./recommended";
import { getRecommended } from "@/lib/recommended-service";

export const Sidebar = async () => {
  const recommended = await getRecommended();
  return (
    <Wrapper>
      <Toggle />
      <div className="space-y-4 pt-4">
        <Recommended data={recommended} />
      </div>
    </Wrapper>
  );
};

export const SidebarSkeleton = () => {
  return (
    <aside className="fixed left-0 flex flex-col w-16 md:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
      <ToggleSketeton />
      <RecommendedSkeleton />
    </aside>
  );
};
