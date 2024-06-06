import { Actions } from "./actions";
import { Logo } from "./logo";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 bg-[#252731] w-full h-20 z-49 px-2 md:px-4 flex justify-between items-center shadow-sm gap-x-2">
      <Logo />
      <Actions />
    </nav>
  );
};
